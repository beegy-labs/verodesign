#!/usr/bin/env node
import chokidar from 'chokidar';
import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const BUILD_SCRIPT = path.join(__dirname, 'build.mjs');
const WATCH_ROOTS = [
  path.join(PACKAGE_ROOT, 'src/patterns/girok'),
  path.join(PACKAGE_ROOT, 'tokens'),
];
const DEBOUNCE_MS = 200;

let timer = null;
let isRunning = false;
let rerunRequested = false;

function log(message) {
  console.log(`[dev] ${message}`);
}

function parseSyncTargets(raw) {
  if (!raw) return [];
  return raw
    .split(path.delimiter)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => path.resolve(value));
}

async function pathExists(target) {
  try {
    await access(target, constants.F_OK);
    return true;
  }
  catch {
    return false;
  }
}

function shouldRebuild(changedPath) {
  const rel = path.relative(PACKAGE_ROOT, changedPath);
  if (rel.startsWith('..')) return false;
  if (rel.startsWith(`src${path.sep}patterns${path.sep}girok${path.sep}`) && rel.endsWith('.css')) return true;
  if (rel.startsWith(`tokens${path.sep}`) && rel.endsWith('.json')) return true;
  return false;
}

function runCommand(command, args, cwd, label) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      env: process.env,
    });

    child.on('exit', (code, signal) => {
      if (signal) {
        log(`${label} terminated by signal ${signal}`);
        resolve(false);
        return;
      }
      resolve(code === 0);
    });

    child.on('error', (error) => {
      log(`${label} failed to start: ${error.message}`);
      resolve(false);
    });
  });
}

async function syncTargets(targets) {
  for (const target of targets) {
    const ok = await pathExists(target);
    if (!ok) {
      log(`skip sync; target not found: ${target}`);
      continue;
    }

    log(`sync install → ${target}`);
    const success = await runCommand('pnpm', ['install', '--prefer-offline'], target, `sync install (${target})`);
    if (!success) {
      log(`sync install failed: ${target}`);
    }
  }
}

async function runBuild(reason, targets) {
  if (isRunning) {
    rerunRequested = true;
    log(`change queued while busy: ${reason}`);
    return;
  }

  isRunning = true;
  log(`build start: ${reason}`);
  const success = await runCommand('node', [BUILD_SCRIPT], PACKAGE_ROOT, 'build');
  if (success && targets.length) {
    await syncTargets(targets);
  }
  log(success ? 'build done' : 'build failed');
  isRunning = false;

  if (rerunRequested) {
    rerunRequested = false;
    await runBuild('queued changes', targets);
  }
}

function scheduleBuild(reason, targets) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    void runBuild(reason, targets);
  }, DEBOUNCE_MS);
}

async function main() {
  const syncTargetsList = parseSyncTargets(process.env.VERODESIGN_AUTO_SYNC_TARGETS);

  log('watching src/patterns/girok/**/*.css, tokens/**/*.json');
  if (syncTargetsList.length) {
    log(`auto sync enabled for ${syncTargetsList.length} target(s)`);
  }

  const watcher = chokidar.watch(WATCH_ROOTS, {
    ignoreInitial: true,
    usePolling: true,
    interval: 250,
    binaryInterval: 500,
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 50,
    },
  });

  watcher.on('all', (event, changedPath) => {
    if (!shouldRebuild(changedPath)) return;
    const rel = path.relative(PACKAGE_ROOT, changedPath);
    log(`${event}: ${rel}`);
    scheduleBuild(`${event} ${rel}`, syncTargetsList);
  });

  watcher.on('error', (error) => {
    log(`watch error: ${error.message}`);
  });

  const shutdown = async (signal) => {
    log(`stopping (${signal})`);
    if (timer) clearTimeout(timer);
    await watcher.close();
    process.exit(0);
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

await main();
