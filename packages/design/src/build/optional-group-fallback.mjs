export const OPTIONAL_GROUP_FALLBACKS = {
  status: {
    '--vds-theme-status-success': 'var(--vds-theme-primary)',
    '--vds-theme-status-success-foreground': 'var(--vds-theme-primary-foreground)',
    '--vds-theme-status-error': 'var(--vds-theme-primary)',
    '--vds-theme-status-error-foreground': 'var(--vds-theme-primary-foreground)',
    '--vds-theme-status-warning': 'var(--vds-theme-primary)',
    '--vds-theme-status-warning-foreground': 'var(--vds-theme-primary-foreground)',
    '--vds-theme-status-info': 'var(--vds-theme-primary)',
    '--vds-theme-status-info-foreground': 'var(--vds-theme-primary-foreground)',
    '--vds-theme-status-neutral': 'var(--vds-theme-text-secondary)',
    '--vds-theme-status-neutral-foreground': 'var(--vds-theme-bg-page)',
    '--vds-theme-destructive': 'var(--vds-theme-primary)',
    '--vds-theme-destructive-foreground': 'var(--vds-theme-primary-foreground)',
  },
};

export function emitOptionalGroupFallbacks(implementsList = []) {
  const rules = [];

  for (const [group, vars] of Object.entries(OPTIONAL_GROUP_FALLBACKS)) {
    if (implementsList.includes(group)) continue;
    for (const [name, value] of Object.entries(vars)) {
      rules.push({ name, value });
    }
  }

  return rules;
}
