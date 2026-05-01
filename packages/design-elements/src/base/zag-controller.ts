import type { ReactiveController, ReactiveControllerHost } from 'lit';

interface ZagService<TState = unknown> {
  state: { value: TState; matches: (value: TState | TState[]) => boolean; context: any };
  send: (event: any) => void;
  subscribe: (cb: (state: any) => void) => () => void;
  start: () => void;
  stop?: () => void;
  setContext?: (ctx: Record<string, unknown>) => void;
}

/**
 * Bridges a Zag.js machine service into a Lit element's reactive lifecycle.
 *
 * Usage:
 *   private machine = new ZagController(this, () => dialog.machine({ id: 'x' }));
 *   render() { const api = dialog.connect(this.machine.state, this.machine.send, normalizeProps); ... }
 */
export class ZagController<TService extends ZagService = ZagService> implements ReactiveController {
  private host: ReactiveControllerHost;
  private factory: () => TService;
  private service?: TService;
  private unsubscribe?: () => void;

  constructor(host: ReactiveControllerHost, factory: () => TService) {
    this.host = host;
    this.factory = factory;
    host.addController(this);
  }

  hostConnected(): void {
    this.service = this.factory();
    this.unsubscribe = this.service.subscribe(() => this.host.requestUpdate());
    this.service.start();
  }

  hostDisconnected(): void {
    this.unsubscribe?.();
    this.service?.stop?.();
  }

  get state() {
    if (!this.service) throw new Error('ZagController.state accessed before connection');
    return this.service.state;
  }

  get send() {
    if (!this.service) throw new Error('ZagController.send accessed before connection');
    return this.service.send.bind(this.service);
  }

  setContext(ctx: Record<string, unknown>) {
    this.service?.setContext?.(ctx);
  }
}
