import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const manifestPath = path.resolve(repoRoot, 'packages/design-elements/dist/custom-elements.json');
const docsDir = path.resolve(repoRoot, 'docs/llm/components');
const readmePath = path.resolve(docsDir, 'README.md');

const componentMeta = [
  {
    slug: 'badge',
    title: 'Badge',
    tags: ['vds-badge'],
    react: 'Badge',
    status: 'v0.2.0-alpha',
    pattern: 'none (decorative)',
    purpose: 'Inline non-interactive status or count indicator.',
    whenToUse: ['Short state labels, counts, and categorical markers.', 'A compact inline signal next to text or metadata.'],
    whenNotToUse: ['Primary actions or navigation.', 'Long-form status explanation that needs more than a chip.'],
    designRationale: 'Badge stays intentionally narrow: semantic tone, small size range, and slot-based icon support cover the common system cases without turning it into a generic pill button.',
    a11y: 'The host is decorative by default. If the badge conveys live status, the containing region should own the announcement contract with `role="status"` or `aria-live`.',
    examples: [
      '```html\n<vds-badge tone="success">Active</vds-badge>\n<vds-badge variant="outline" tone="primary">Beta</vds-badge>\n```',
      '```tsx\nimport { Badge } from \'@verobee/design-react\';\n\n<Badge tone="success">Active</Badge>\n```',
    ],
  },
  {
    slug: 'binary-pill-toggle',
    title: 'Binary Pill Toggle',
    tags: ['vds-binary-pill-toggle', 'vds-binary-pill-toggle-option'],
    react: 'BinaryPillToggle',
    status: 'canonical',
    pattern: 'Radio Group',
    purpose: 'Two-option segmented choice with form submission support.',
    whenToUse: ['A mutually exclusive binary choice such as Buy/Sell or On/Off.', 'Cases where both options should remain visible at once.'],
    whenNotToUse: ['Tabs-style panel navigation where the selection swaps visible panels; use Tabs when the control is for view navigation rather than form choice.', 'A delayed boolean form control where checkbox semantics fit better.'],
    designRationale: 'BinaryPillToggle is a form choice, not a navigation primitive. Tabs bind labels to panels and move users across views, while this control keeps both options visible as one submitted field value. The pill treatment preserves immediate comparison between two mutually exclusive outcomes without implying route or panel changes.',
    a11y: 'Implements the APG radio-group contract: the host exposes `radiogroup`, each option behaves as a radio, roving tabindex keeps one tabbable option, Arrow keys move selection, Home and End jump to the first and last enabled options, Space commits the focused option, and FACE submits the selected value with the owning form.',
    examples: [
      '```html\n<vds-binary-pill-toggle name="resolution" value="approve" emphasis="success" aria-label="Review decision">\n  <vds-binary-pill-toggle-option value="approve">Approve</vds-binary-pill-toggle-option>\n  <vds-binary-pill-toggle-option value="reject" emphasis="destructive">Reject</vds-binary-pill-toggle-option>\n</vds-binary-pill-toggle>\n```',
      '```tsx\nimport { BinaryPillToggle } from \'@verobee/design-react\';\n\n<BinaryPillToggle\n  name="resolution"\n  aria-label="Review decision"\n  value={resolution}\n  emphasis="success"\n  onVdsChange={(event) => setResolution(event.detail.value)}\n>\n  <button value="approve">Approve</button>\n  <button value="reject">Reject</button>\n</BinaryPillToggle>\n```',
    ],
  },
  {
    slug: 'box',
    title: 'Box',
    tags: ['vds-box'],
    react: 'Box',
    status: 'v0.2.0-alpha',
    pattern: 'none (layout primitive)',
    purpose: 'Generic spacing and width wrapper bound to tokenized props.',
    whenToUse: ['A light wrapper for padding, inline mode, or constrained width.', 'Replacing repeated utility bundles when a component wants an explicit layout primitive.'],
    whenNotToUse: ['Complex vertical or horizontal flow; use Stack, Cluster, or Grid.', 'Freeform brand styling that belongs in consumer composition.'],
    designRationale: 'Box exists to encode the most common container adjustments as bounded props, keeping layout token-safe without introducing a brand-specific component meaning.',
    a11y: 'The host is semantic-neutral. Consumers must still provide the right landmark or content semantics for the wrapped content.',
    examples: [
      '```html\n<vds-box p="4" max-width="lg">\n  <p>Constrained content</p>\n</vds-box>\n```',
      '```tsx\nimport { Box } from \'@verobee/design-react\';\n\n<Box p="4" maxWidth="lg">Constrained content</Box>\n```',
    ],
  },
  {
    slug: 'button',
    title: 'Button',
    tags: ['vds-button'],
    react: 'Button',
    status: 'v0.2.0-alpha',
    pattern: 'Button',
    purpose: 'Action trigger with FACE-backed submit and reset behavior.',
    whenToUse: ['Primary and secondary actions in forms, dialogs, and toolbars.', 'Cases where async/loading and semantic tone need to stay inside the system contract.'],
    whenNotToUse: ['Pure navigation that should remain an anchor.', 'Persistent selection state; use checkbox, switch, or tabs depending on the pattern.'],
    designRationale: 'Button keeps the API additive and token-driven: the public contract is size, tone, variant, and form semantics, not arbitrary visual knobs.',
    a11y: 'Uses APG button behavior with keyboard activation, disabled signaling, and coarse-pointer touch-target expansion without changing fine-pointer geometry.',
    examples: [
      '```html\n<vds-button>Save</vds-button>\n<vds-button tone="destructive" loading>Delete</vds-button>\n```',
      '```tsx\nimport { Button } from \'@verobee/design-react\';\n\n<Button variant="outline">Cancel</Button>\n```',
    ],
  },
  {
    slug: 'card',
    title: 'Card',
    tags: ['vds-card'],
    react: 'Card',
    status: 'v0.2.0-alpha',
    pattern: 'none (surface container)',
    purpose: 'Surface container with structured header, body, and footer slots.',
    whenToUse: ['Grouped content that needs consistent chrome.', 'Dashboard modules or list items with optional actions.'],
    whenNotToUse: ['A modal interruption; use Dialog.', 'Tabular relationships that need real table semantics.'],
    designRationale: 'Card is intentionally composition-first. The system exposes stable regions instead of opinionated internal subcomponents so consumers can structure content without forking chrome.',
    a11y: 'Card does not impose a role. Heading hierarchy, links, and actions must be authored by the consumer inside the slots.',
    examples: [
      '```html\n<vds-card>\n  <h3 slot="header">Title</h3>\n  <p>Body</p>\n</vds-card>\n```',
      '```tsx\nimport { Card } from \'@verobee/design-react\';\n\n<Card><p>Body</p></Card>\n```',
    ],
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    tags: ['vds-checkbox'],
    react: 'Checkbox',
    status: 'v0.2.0-alpha',
    pattern: 'Checkbox',
    purpose: 'Tri-state checkbox with FACE integration.',
    whenToUse: ['Boolean opt-in or list-row selection.', 'Parent selection that needs an indeterminate state.'],
    whenNotToUse: ['Immediate settings toggles; use Switch.', 'Mutually exclusive choices; use radio-group patterns.'],
    designRationale: 'Checkbox keeps form semantics central. The component owns true/false/mixed signaling and validation while keeping visual customization limited to token-backed size and tone.',
    a11y: 'Uses APG checkbox semantics with `aria-checked` including `mixed`, Space activation, and form-associated value submission.',
    examples: [
      '```html\n<vds-checkbox indeterminate>Select all</vds-checkbox>\n```',
      '```tsx\nimport { Checkbox } from \'@verobee/design-react\';\n\n<Checkbox checked={value}>Subscribe</Checkbox>\n```',
    ],
  },
  {
    slug: 'compact-row',
    title: 'Compact Row',
    tags: ['vds-compact-row'],
    react: 'CompactRow',
    status: 'v0.2.0-alpha',
    pattern: 'list row / action row',
    purpose: 'Single-row entity item that can render as button or anchor.',
    whenToUse: ['Dense lists where leading, body, and trailing affordances must align.', 'Clickable rows that still need a bounded token contract.'],
    whenNotToUse: ['Large editorial cards with multi-line layout.', 'Tabular data where column semantics matter.'],
    designRationale: 'Phase E2 promoted CompactRow into Lit so the canonical contract now lives at the custom-element layer. `as`, `href`, `tone`, and `show-chevron` cover the main navigation-row variants without splintering into app-specific row components.',
    a11y: 'The row keeps native button or anchor semantics depending on `as`. Disabled state and selected state remain host-level signals instead of custom roles.',
    examples: [
      '```html\n<vds-compact-row as="a" href="/accounts/1" show-chevron>\n  Account summary\n</vds-compact-row>\n```',
      '```tsx\nimport { CompactRow } from \'@verobee/design-react\';\n\n<CompactRow as="button" selected tone="primary">Portfolio</CompactRow>\n```',
    ],
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    tags: ['vds-dialog'],
    react: 'Dialog',
    status: 'v0.2.0-alpha',
    pattern: 'Dialog (Modal)',
    purpose: 'Modal dialog with focus trap, dismiss controls, and slot composition.',
    whenToUse: ['Interruptive confirmation or short-form editing.', 'Flows that must temporarily block background interaction.'],
    whenNotToUse: ['Passive guidance or hover help.', 'Long, page-scale tasks that deserve their own route.'],
    designRationale: 'Dialog owns the tricky platform behavior: trap, restore, and dismissal reasons. Content structure remains slot-driven so consumers do not fork modal chrome for every workflow.',
    a11y: 'Implements the APG modal dialog contract with `aria-modal`, focus containment, Escape dismissal when allowed, and trigger focus restoration.',
    examples: [
      '```html\n<vds-dialog open>\n  <h3 slot="header">Confirm delete</h3>\n  <p>This cannot be undone.</p>\n</vds-dialog>\n```',
      '```tsx\nimport { Dialog } from \'@verobee/design-react\';\n\n<Dialog open={open}>...</Dialog>\n```',
    ],
  },
  {
    slug: 'empty-state',
    title: 'Empty State',
    tags: ['vds-empty-state'],
    react: 'EmptyState',
    status: 'v0.2.0-alpha',
    pattern: 'none (feedback container)',
    purpose: 'Reusable no-data or first-run placeholder with structured slots.',
    whenToUse: ['An empty collection, no-results state, or onboarding gap.', 'A neutral placeholder that should stay consistent across screens.'],
    whenNotToUse: ['Transient success/error feedback; use Toast or inline validation.', 'Dense instructional content that deserves a full page.'],
    designRationale: 'EmptyState keeps the visual frame standardized while leaving copy and action composition to the consumer through slots.',
    a11y: 'Semantics come from the slotted heading, body, and action controls. The component does not override region or alert behavior.',
    examples: [
      '```html\n<vds-empty-state>\n  <span slot="title">No transactions yet</span>\n  <span slot="description">Create the first one to get started.</span>\n</vds-empty-state>\n```',
      '```tsx\nimport { EmptyState } from \'@verobee/design-react\';\n\n<EmptyState />\n```',
    ],
  },
  {
    slug: 'grid',
    title: 'Grid',
    tags: ['vds-grid'],
    react: 'Grid',
    status: 'v0.2.0-alpha',
    pattern: 'none (layout primitive)',
    purpose: 'Token-safe CSS grid layout primitive.',
    whenToUse: ['Simple two-dimensional layouts with repeated spacing and column props.', 'System-level composition where utility bundles would otherwise repeat.'],
    whenNotToUse: ['Single-axis spacing; use Stack or Cluster.', 'Complex responsive art direction that belongs in app-specific CSS.'],
    designRationale: 'Grid encodes a narrow set of common layout controls rather than exposing arbitrary CSS grid authoring at the component layer.',
    a11y: 'Grid is purely presentational here. Do not confuse it with ARIA grid semantics; interactive data grids remain out of scope.',
    examples: [
      '```html\n<vds-grid columns="2" gap="4">\n  <div>One</div>\n  <div>Two</div>\n</vds-grid>\n```',
      '```tsx\nimport { Grid } from \'@verobee/design-react\';\n\n<Grid columns="2" gap="4">...</Grid>\n```',
    ],
  },
  {
    slug: 'heading',
    title: 'Heading',
    tags: ['vds-heading'],
    react: 'Heading',
    status: 'v0.2.0-alpha',
    pattern: 'none (typography primitive)',
    purpose: 'Token-bound heading primitive for system typography hierarchy.',
    whenToUse: ['Reusable section and page headings inside system-authored UI.', 'Cases where heading level and visual size should stay coordinated.'],
    whenNotToUse: ['Body copy or metadata.', 'A consumer-specific display treatment that diverges from the canonical scale.'],
    designRationale: 'Heading avoids ad hoc type stacks. It centralizes typographic role choices while letting consumers pick semantic level intentionally.',
    a11y: 'The chosen level still matters to document outline and screen-reader navigation. Consumers should not skip heading levels without a structural reason.',
    examples: [
      '```html\n<vds-heading level="2">Portfolio</vds-heading>\n```',
      '```tsx\nimport { Heading } from \'@verobee/design-react\';\n\n<Heading level="2">Portfolio</Heading>\n```',
    ],
  },
  {
    slug: 'icon-button',
    title: 'Icon Button',
    tags: ['vds-icon-button'],
    react: 'IconButton',
    status: 'v0.2.0-alpha',
    pattern: 'Button',
    purpose: 'Square icon-only button with required accessible naming.',
    whenToUse: ['Toolbar actions and dense trailing actions.', 'A compact affordance where visible text would add noise.'],
    whenNotToUse: ['Primary CTA where text matters.', 'A toggle state that needs clearer two-state semantics.'],
    designRationale: 'IconButton intentionally reuses the system button contract but narrows the content model to icon-only interaction.',
    a11y: 'Requires an accessible name through `aria-label` or equivalent. Keyboard and disabled behavior match the base button pattern.',
    examples: [
      '```html\n<vds-icon-button aria-label="More actions">...</vds-icon-button>\n```',
      '```tsx\nimport { IconButton } from \'@verobee/design-react\';\n\n<IconButton aria-label="Delete">...</IconButton>\n```',
    ],
  },
  {
    slug: 'label',
    title: 'Label',
    tags: ['vds-label'],
    react: 'Label',
    status: 'v0.2.0-alpha',
    pattern: 'label/for',
    purpose: 'Accessible form-field label with required marker support.',
    whenToUse: ['Visible labels for text fields, text areas, selects, switches, and checkboxes.', 'Cases where click-to-focus binding should stay explicit.'],
    whenNotToUse: ['Decorative captions or helper copy.', 'Button text or heading content.'],
    designRationale: 'Label keeps the standard HTML association model rather than inventing a custom field wrapper API.',
    a11y: 'Preserves label-to-control focus activation. Required asterisk stays visual-only while the control itself owns semantic required state.',
    examples: [
      '```html\n<vds-label for="email" required>Email</vds-label>\n<vds-text-field id="email"></vds-text-field>\n```',
      '```tsx\nimport { Label } from \'@verobee/design-react\';\n\n<Label htmlFor="email">Email</Label>\n```',
    ],
  },
  {
    slug: 'menu',
    title: 'Menu',
    tags: ['vds-menu', 'vds-menu-item'],
    react: 'Menu + MenuItem',
    status: 'v0.2.0-alpha',
    pattern: 'Menu Button',
    purpose: 'Action menu revealed from a trigger element.',
    whenToUse: ['Overflow or row-level secondary actions.', 'Command groups that do not fit inline.'],
    whenNotToUse: ['Value selection; use Select.', 'Single critical action; keep it directly visible as a Button.'],
    designRationale: 'Menu separates trigger composition from item semantics so any trigger can open a consistent action list.',
    a11y: 'Implements APG menu-button behavior: `aria-haspopup`, `aria-expanded`, menuitem roles, arrow navigation, Home/End, Escape, and type-ahead.',
    examples: [
      '```html\n<vds-menu>\n  <vds-button slot="trigger">Actions</vds-button>\n  <vds-menu-item value="rename">Rename</vds-menu-item>\n</vds-menu>\n```',
      '```tsx\nimport { Menu, MenuItem } from \'@verobee/design-react\';\n\n<Menu><MenuItem value="rename">Rename</MenuItem></Menu>\n```',
    ],
  },
  {
    slug: 'page-header',
    title: 'Page Header',
    tags: ['vds-page-header'],
    react: 'PageHeader',
    status: 'v0.2.0-alpha',
    pattern: 'none (page chrome)',
    purpose: 'Page-level title row with optional leading and action regions.',
    whenToUse: ['Screen headers that need stable title and action alignment.', 'Reusable app-shell page chrome without ad hoc flex wrappers.'],
    whenNotToUse: ['Small card headers or inline section titles.', 'Complex hero layouts with bespoke media and marketing content.'],
    designRationale: 'PageHeader standardizes a frequent layout seam between navigation context, title hierarchy, and top-right actions.',
    a11y: 'The internal title should remain the primary page heading. Slotted actions keep their native semantics.',
    examples: [
      '```html\n<vds-page-header heading="Accounts" subtitle="Overview">\n  <vds-button slot="actions">New</vds-button>\n</vds-page-header>\n```',
      '```tsx\nimport { PageHeader } from \'@verobee/design-react\';\n\n<PageHeader heading="Accounts" />\n```',
    ],
  },
  {
    slug: 'select',
    title: 'Select',
    tags: ['vds-select', 'vds-option'],
    react: 'Select + Option',
    status: 'v0.2.0-alpha',
    pattern: 'Combobox + Listbox (select-only)',
    purpose: 'Select-only combobox with FACE submission and type-ahead.',
    whenToUse: ['Choosing one value from a bounded list.', 'Forms that need a custom-element select while preserving keyboard semantics.'],
    whenNotToUse: ['Free-text entry or async search.', 'Contextual command menus where actions, not values, are the goal.'],
    designRationale: 'Select keeps the interaction contract narrow: a select-only combobox rather than a generalized autocomplete.',
    a11y: 'Implements APG select-only combobox behavior with listbox options, active option management, type-ahead, and form-associated value submission.',
    examples: [
      '```html\n<vds-select name="country">\n  <vds-option value="kr">Korea</vds-option>\n  <vds-option value="us">United States</vds-option>\n</vds-select>\n```',
      '```tsx\nimport { Select, Option } from \'@verobee/design-react\';\n\n<Select><Option value="kr">Korea</Option></Select>\n```',
    ],
  },
  {
    slug: 'separator',
    title: 'Separator',
    tags: ['vds-separator'],
    react: 'Separator',
    status: 'v0.2.0-alpha',
    pattern: 'Separator',
    purpose: 'Visual divider with optional semantic exposure.',
    whenToUse: ['Section breaks and inline group dividers.', 'Menu grouping or simple horizontal rules within system surfaces.'],
    whenNotToUse: ['A layout crutch for spacing problems.', 'Interactive resize handles or custom splitter widgets.'],
    designRationale: 'Separator keeps the contract minimal: orientation plus decorative-vs-semantic choice.',
    a11y: 'Decorative separators stay out of the accessibility tree. Semantic separators expose orientation when the divider itself has meaning.',
    examples: [
      '```html\n<vds-separator></vds-separator>\n```',
      '```tsx\nimport { Separator } from \'@verobee/design-react\';\n\n<Separator orientation="vertical" />\n```',
    ],
  },
  {
    slug: 'skeleton',
    title: 'Skeleton',
    tags: ['vds-skeleton'],
    react: 'Skeleton',
    status: 'v0.2.0-alpha',
    pattern: 'none (loading placeholder)',
    purpose: 'Animated loading placeholder for shape-preserving skeleton states.',
    whenToUse: ['Known layouts where content is loading but chrome should remain stable.', 'Short-lived async boundaries inside cards, lists, and tiles.'],
    whenNotToUse: ['Unknown content shape.', 'Long waits where progress text or status messaging is more honest.'],
    designRationale: 'Skeleton keeps placeholders visually system-consistent and avoids each consumer inventing its own shimmer treatment.',
    a11y: 'Skeleton itself is presentational. Loading state announcements belong to the surrounding region or status messaging, not the placeholder blocks.',
    examples: [
      '```html\n<vds-skeleton width="100%" height="1rem"></vds-skeleton>\n```',
      '```tsx\nimport { Skeleton } from \'@verobee/design-react\';\n\n<Skeleton />\n```',
    ],
  },
  {
    slug: 'spacer',
    title: 'Spacer',
    tags: ['vds-spacer'],
    react: 'Spacer',
    status: 'v0.2.0-alpha',
    pattern: 'none (layout primitive)',
    purpose: 'Explicit empty space primitive bound to spacing tokens.',
    whenToUse: ['A deliberate structural gap in a composition.', 'Places where margin ownership is ambiguous and a neutral spacer is clearer.'],
    whenNotToUse: ['General layout flow where Stack or Cluster should own spacing.', 'Content separation that needs a visual rule; use Separator.'],
    designRationale: 'Spacer exists for the narrow cases where empty space itself is the clearest layout unit and token ownership should remain explicit.',
    a11y: 'Spacer is presentational only and should not carry content or interactive affordances.',
    examples: [
      '```html\n<vds-spacer size="4"></vds-spacer>\n```',
      '```tsx\nimport { Spacer } from \'@verobee/design-react\';\n\n<Spacer size="4" />\n```',
    ],
  },
  {
    slug: 'stack',
    title: 'Stack',
    tags: ['vds-stack'],
    react: 'Stack',
    status: 'v0.2.0-alpha',
    pattern: 'none (layout primitive)',
    purpose: 'Vertical flex layout primitive with tokenized spacing and alignment.',
    whenToUse: ['Column layouts and repeated vertical rhythm.', 'Replacing ad hoc `display:flex; flex-direction:column` wrappers.'],
    whenNotToUse: ['Two-dimensional layouts; use Grid.', 'Inline wrapping clusters of controls; use Cluster.'],
    designRationale: 'Stack captures the most repeated vertical layout pattern as a first-class primitive, reducing consumer-side layout drift.',
    a11y: 'Stack is semantic-neutral. Content semantics must come from the children it arranges.',
    examples: [
      '```html\n<vds-stack gap="3">\n  <div>One</div>\n  <div>Two</div>\n</vds-stack>\n```',
      '```tsx\nimport { Stack } from \'@verobee/design-react\';\n\n<Stack gap="3">...</Stack>\n```',
    ],
  },
  {
    slug: 'stat-tile',
    title: 'Stat Tile',
    tags: ['vds-stat-tile'],
    react: 'StatTile',
    status: 'v0.2.0-alpha',
    pattern: 'none (data summary)',
    purpose: 'Compact KPI tile with label, value, and optional delta.',
    whenToUse: ['Dashboard summaries and at-a-glance metrics.', 'Short metric cards that need consistent hierarchy.'],
    whenNotToUse: ['Rich analytical panels with tables or charts.', 'Long-form explanatory text.'],
    designRationale: 'StatTile packages a repeated dashboard pattern into a stable surface with controlled tone and density.',
    a11y: 'The value and label remain plain content. If the tile itself is interactive, that interaction should be authored around it rather than assumed by default.',
    examples: [
      '```html\n<vds-stat-tile label="Revenue" value="$12.4k"></vds-stat-tile>\n```',
      '```tsx\nimport { StatTile } from \'@verobee/design-react\';\n\n<StatTile label="Revenue" value="$12.4k" />\n```',
    ],
  },
  {
    slug: 'surface',
    title: 'Surface',
    tags: ['vds-surface'],
    react: 'Surface',
    status: 'v0.2.0-alpha',
    pattern: 'none (layout primitive)',
    purpose: 'Bordered container primitive for simple token-bound surfaces.',
    whenToUse: ['A lighter-weight container than Card when only surface treatment is needed.', 'Token-safe background and border composition.'],
    whenNotToUse: ['Structured card chrome with dedicated regions.', 'Complex app-specific wrappers that deserve their own component.'],
    designRationale: 'Surface offers the minimum surface contract without implying card anatomy.',
    a11y: 'Surface is semantic-neutral and should inherit meaning from its content.',
    examples: [
      '```html\n<vds-surface>Plain surface</vds-surface>\n```',
      '```tsx\nimport { Surface } from \'@verobee/design-react\';\n\n<Surface>Plain surface</Surface>\n```',
    ],
  },
  {
    slug: 'switch',
    title: 'Switch',
    tags: ['vds-switch'],
    react: 'Switch',
    status: 'v0.2.0-alpha',
    pattern: 'Switch',
    purpose: 'Immediate on/off control for settings and preferences.',
    whenToUse: ['A state change that takes effect immediately.', 'Binary preferences where “on/off” wording is clearer than checked/unchecked.'],
    whenNotToUse: ['Multi-select forms submitted later; use Checkbox.', 'Mutually exclusive choices; use radio-group patterns.'],
    designRationale: 'Switch separates immediate-setting semantics from checkbox form semantics while still preserving FACE and validation support.',
    a11y: 'Implements APG switch behavior with `aria-checked`, keyboard toggling, and form-associated value submission.',
    examples: [
      '```html\n<vds-switch checked>Dark mode</vds-switch>\n```',
      '```tsx\nimport { Switch } from \'@verobee/design-react\';\n\n<Switch checked={dark}>Dark mode</Switch>\n```',
    ],
  },
  {
    slug: 'table',
    title: 'Table',
    tags: ['vds-table'],
    react: 'Table',
    status: 'v0.2.0-alpha',
    pattern: 'native table wrapper',
    purpose: 'Semantic table wrapper that standardizes table chrome.',
    whenToUse: ['Real row/column relationships that benefit from native table semantics.', 'System tables that need token-consistent surface styling.'],
    whenNotToUse: ['Responsive card lists or key-value layouts.', 'Interactive data grids with spreadsheet-like behavior.'],
    designRationale: 'Table keeps the native HTML table model and limits system opinion to spacing, borders, and framing.',
    a11y: 'Uses actual table semantics. Header associations, captions, and sortable behavior still depend on the authored table content.',
    examples: [
      '```html\n<vds-table>\n  <table>\n    <thead><tr><th>Name</th></tr></thead>\n    <tbody><tr><td>Alpha</td></tr></tbody>\n  </table>\n</vds-table>\n```',
      '```tsx\nimport { Table } from \'@verobee/design-react\';\n\n<Table>...</Table>\n```',
    ],
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    tags: ['vds-tabs', 'vds-tab', 'vds-tab-panel'],
    react: 'Tabs + Tab + TabPanel',
    status: 'v0.2.0-alpha',
    pattern: 'Tabs',
    purpose: 'Single-surface view switching using the APG tabs model.',
    whenToUse: ['Peer views that share one container.', 'Short, mutually exclusive sections where persistent visibility is valuable.'],
    whenNotToUse: ['Linear multi-step flows.', 'Long content where all sections should remain visible.'],
    designRationale: 'Tabs owns roving focus and panel wiring while keeping labels and panel content fully consumer-authored.',
    a11y: 'Implements APG tabs semantics with `tablist`, `tab`, `tabpanel`, roving focus, Home/End, and managed selected state.',
    examples: [
      '```html\n<vds-tabs default-value="overview">\n  <vds-tab value="overview">Overview</vds-tab>\n  <vds-tab-panel value="overview">Overview content</vds-tab-panel>\n</vds-tabs>\n```',
      '```tsx\nimport { Tabs, Tab, TabPanel } from \'@verobee/design-react\';\n\n<Tabs defaultValue="overview"><Tab value="overview">Overview</Tab></Tabs>\n```',
    ],
  },
  {
    slug: 'text',
    title: 'Text',
    tags: ['vds-text'],
    react: 'Text',
    status: 'v0.2.0-alpha',
    pattern: 'none (typography primitive)',
    purpose: 'Token-bound text primitive for body copy, labels, and metadata.',
    whenToUse: ['System-authored text that should stay on the canonical type scale.', 'Simple tone, weight, and alignment changes without ad hoc classes.'],
    whenNotToUse: ['Semantic headings; use Heading.', 'Rich prose blocks where wrapper styles own the flow.'],
    designRationale: 'Text provides bounded typography controls at the component layer so consumers can stay inside the token system for small text decisions.',
    a11y: 'The chosen `as` value determines semantics. Tone and truncation should not hide critical information without alternate access.',
    examples: [
      '```html\n<vds-text tone="muted">Secondary copy</vds-text>\n```',
      '```tsx\nimport { Text } from \'@verobee/design-react\';\n\n<Text tone="muted">Secondary copy</Text>\n```',
    ],
  },
  {
    slug: 'text-area',
    title: 'Text Area',
    tags: ['vds-text-area'],
    react: 'TextArea',
    status: 'v0.2.0-alpha',
    pattern: 'native textarea',
    purpose: 'Multi-line FACE text input with helper and validation support.',
    whenToUse: ['Comments, descriptions, notes, and other free-form text.', 'Forms that need token-consistent multi-line fields.'],
    whenNotToUse: ['Single-line data; use Text Field.', 'Rich text editing.'],
    designRationale: 'Text Area keeps the native textarea mental model while aligning chrome and validation signaling with the rest of the field system.',
    a11y: 'Relies on the underlying textarea semantics, required state, and helper/error associations.',
    examples: [
      '```html\n<vds-text-area rows="6" placeholder="Your message"></vds-text-area>\n```',
      '```tsx\nimport { TextArea } from \'@verobee/design-react\';\n\n<TextArea rows={6} />\n```',
    ],
  },
  {
    slug: 'text-field',
    title: 'Text Field',
    tags: ['vds-text-field'],
    react: 'TextField',
    status: 'v0.2.0-alpha',
    pattern: 'textbox',
    purpose: 'Single-line FACE text input with helper and validation support.',
    whenToUse: ['Email, password, search, number, and standard short text inputs.', 'Forms that need a consistent field shell.'],
    whenNotToUse: ['Multi-line or rich content.', 'Strict value lists that should use Select.'],
    designRationale: 'Text Field centralizes the common single-line field contract, including validation, helper copy, and icon slot composition.',
    a11y: 'Uses native input semantics, propagates required and invalid state, and keeps helper/error messaging associated with the control.',
    examples: [
      '```html\n<vds-text-field type="email" placeholder="you@example.com"></vds-text-field>\n```',
      '```tsx\nimport { TextField } from \'@verobee/design-react\';\n\n<TextField type="email" />\n```',
    ],
  },
  {
    slug: 'th',
    title: 'Th',
    tags: ['vds-th'],
    react: 'Th',
    status: 'v0.2.0-alpha',
    pattern: 'native table header cell',
    purpose: 'Token-bound table header cell wrapper that preserves real `<th>` semantics.',
    whenToUse: ['Within `vds-table` or any semantic table needing consistent header styling.', 'Table headers that need alignment and compact variants without custom CSS.'],
    whenNotToUse: ['Body cells or non-table layouts.', 'Spreadsheet-grade interactions.'],
    designRationale: 'Th uses light DOM intentionally so header cells participate in native table layout while still exposing a token-safe API.',
    a11y: 'Because it renders a real `<th>`, screen-reader header associations and native table semantics remain intact.',
    examples: [
      '```html\n<tr>\n  <vds-th align="left">Name</vds-th>\n</tr>\n```',
      '```tsx\nimport { Th } from \'@verobee/design-react\';\n\n<Th dim>Name</Th>\n```',
    ],
  },
  {
    slug: 'toast',
    title: 'Toast',
    tags: ['vds-toast', 'vds-toast-group'],
    react: 'Toast + ToastGroup',
    status: 'v0.2.0-alpha',
    pattern: 'Alert / Status',
    purpose: 'Transient notification system with grouped live-region delivery.',
    whenToUse: ['Non-blocking success, warning, info, or error feedback.', 'Queued notifications anchored to a predictable viewport region.'],
    whenNotToUse: ['Blocking confirmation or destructive review.', 'Persistent form validation that should stay inline.'],
    designRationale: 'Toast keeps notification chrome and queue behavior centralized. The group owns placement while individual toasts own tone and dismissal behavior.',
    a11y: 'ToastGroup establishes the live region. Error tone escalates to alert semantics while other tones remain polite status messages.',
    examples: [
      '```html\n<vds-toast-group>\n  <vds-toast tone="success">Saved</vds-toast>\n</vds-toast-group>\n```',
      '```tsx\nimport { Toast, ToastGroup } from \'@verobee/design-react\';\n\n<ToastGroup><Toast tone="success">Saved</Toast></ToastGroup>\n```',
    ],
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    tags: ['vds-tooltip'],
    react: 'Tooltip',
    status: 'v0.2.0-alpha',
    pattern: 'Tooltip',
    purpose: 'Non-interactive descriptive tip shown on hover or focus.',
    whenToUse: ['Short clarifications and icon-only labels.', 'Supplemental help that does not block the primary task.'],
    whenNotToUse: ['Interactive content or long explanations.', 'Critical information that must always be visible.'],
    designRationale: 'Tooltip is intentionally passive. It handles the wiring between trigger and tip while staying out of richer popover territory.',
    a11y: 'Implements APG tooltip behavior with `aria-describedby`, focus and hover triggers, and Escape dismissal.',
    examples: [
      '```html\n<vds-tooltip>\n  <vds-button slot="trigger">Info</vds-button>\n  Helpful context\n</vds-tooltip>\n```',
      '```tsx\nimport { Tooltip } from \'@verobee/design-react\';\n\n<Tooltip>Helpful context</Tooltip>\n```',
    ],
  },
  {
    slug: 'cluster',
    title: 'Cluster',
    tags: ['vds-cluster'],
    react: 'Cluster',
    status: 'v0.2.0-alpha',
    pattern: 'none (layout primitive)',
    purpose: 'Horizontal wrapping layout primitive for controls, chips, and inline groups.',
    whenToUse: ['Toolbars, tag rows, and compact action groups.', 'Layouts that should wrap naturally across widths.'],
    whenNotToUse: ['Strict vertical rhythm or grid alignment.', 'Page-level navigation structures that need bespoke semantics.'],
    designRationale: 'Cluster exposes the most common inline-wrap behavior as a bounded primitive instead of repeated flex-wrap utility bundles.',
    a11y: 'Cluster is semantic-neutral; child controls keep their native roles and order.',
    examples: [
      '```html\n<vds-cluster gap="2">\n  <vds-badge>One</vds-badge>\n  <vds-badge>Two</vds-badge>\n</vds-cluster>\n```',
      '```tsx\nimport { Cluster } from \'@verobee/design-react\';\n\n<Cluster gap="2">...</Cluster>\n```',
    ],
  },
];

const metaBySlug = new Map(componentMeta.map((entry) => [entry.slug, entry]));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const declarations = (manifest.modules ?? []).flatMap((module) => module.declarations ?? []);
const declByTag = new Map(declarations.filter((decl) => decl.tagName).map((decl) => [decl.tagName, decl]));

function titleCaseFromTag(tag) {
  return tag.replace(/^vds-/, '').split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function formatDefault(value) {
  if (value == null || value === '') return '—';
  return `\`${String(value).replace(/^'|'$/g, '')}\``;
}

function formatType(type) {
  const text = type?.text ?? '—';
  return `\`${text.replace(/\n/g, ' ')}\``;
}

function publicFields(decl) {
  return (decl.members ?? []).filter((member) => {
    if (member.kind !== 'field') return false;
    if (member.static || member.privacy === 'private' || member.privacy === 'protected') return false;
    if (member.inheritedFrom) return false;
    if (!member.attribute && member.reflects !== true) return false;
    return true;
  });
}

function fieldAttribute(member) {
  if (!member.attribute) return '—';
  return `\`${member.attribute}\``;
}

function renderPropsTable(decl) {
  const fields = publicFields(decl);
  if (fields.length === 0) return 'None.\n';
  const lines = [
    '| Prop | Attribute | Type | Default |',
    '| ---- | --------- | ---- | ------- |',
  ];
  for (const field of fields) {
    lines.push(`| \`${field.name}\` | ${fieldAttribute(field)} | ${formatType(field.type)} | ${formatDefault(field.default)} |`);
  }
  return `${lines.join('\n')}\n`;
}

function renderSimpleTable(items, columns) {
  if (!items || items.length === 0) return 'None.\n';
  const head = `| ${columns.map((column) => column.label).join(' | ')} |`;
  const sep = `| ${columns.map((column) => '-'.repeat(column.label.length)).join(' | ')} |`;
  const rows = items.map((item) => `| ${columns.map((column) => column.render(item)).join(' | ')} |`);
  return `${[head, sep, ...rows].join('\n')}\n`;
}

function renderApiBlock(decl) {
  const sections = [`### \`<${decl.tagName}>\``];
  sections.push('', '#### Props', renderPropsTable(decl).trimEnd(), '', '#### Slots');
  sections.push(renderSimpleTable(decl.slots, [
    { label: 'Name', render: (slot) => slot.name ? `\`${slot.name}\`` : '(default)' },
    { label: 'Description', render: (slot) => slot.description ?? '—' },
  ]).trimEnd());
  sections.push('', '#### Events');
  sections.push(renderSimpleTable(decl.events, [
    { label: 'Name', render: (event) => `\`${event.name}\`` },
    { label: 'Description', render: (event) => event.description ?? '—' },
  ]).trimEnd());
  sections.push('', '#### CSS Variables');
  sections.push(renderSimpleTable(decl.cssProperties, [
    { label: 'Name', render: (prop) => `\`${prop.name}\`` },
    { label: 'Description', render: (prop) => prop.description ?? '—' },
  ]).trimEnd());
  sections.push('', '#### CSS Parts');
  sections.push(renderSimpleTable(decl.cssParts, [
    { label: 'Name', render: (part) => `\`${part.name}\`` },
    { label: 'Description', render: (part) => part.description ?? '—' },
  ]).trimEnd());
  return sections.join('\n');
}

function parseEnum(typeText) {
  if (!typeText || !typeText.includes('|')) return '—';
  const values = typeText.match(/'[^']+'/g);
  if (!values) return '—';
  return values.map((value) => value.replace(/'/g, '')).join('/');
}

function inferSizes(meta) {
  const sizeField = meta.tags
    .map((tag) => declByTag.get(tag))
    .filter(Boolean)
    .flatMap((decl) => publicFields(decl))
    .find((field) => field.name === 'size');
  return sizeField ? parseEnum(sizeField.type?.text) : '—';
}

function inferTones(meta) {
  const toneField = meta.tags
    .map((tag) => declByTag.get(tag))
    .filter(Boolean)
    .flatMap((decl) => publicFields(decl))
    .find((field) => field.name === 'tone' || field.name === 'emphasis');
  return toneField ? parseEnum(toneField.type?.text) : '—';
}

function isFormAssociated(meta) {
  return meta.tags.some((tag) => {
    const decl = declByTag.get(tag);
    const formField = (decl?.members ?? []).find((member) => member.name === 'formAssociated' && member.static);
    return formField?.default === 'true';
  });
}

function renderDoc(meta) {
  const tagLabel = meta.tags.map((tag) => `\`<${tag}>\``).join(', ');
  const apiBlocks = meta.tags
    .map((tag) => declByTag.get(tag))
    .filter(Boolean)
    .map((decl) => renderApiBlock(decl))
    .join('\n\n');
  const useRows = meta.whenToUse.map((item) => `| Use | ${item} |`).join('\n');
  const notUseRows = meta.whenNotToUse.map((item) => `| Do not use | ${item} |`).join('\n');
  return `# ${meta.title}

> Tag: ${tagLabel} · React: \`${meta.react}\` · Status: ${meta.status} · APG pattern: ${meta.pattern}

## Purpose
${meta.purpose}

## When to use / not to use
| Decision | Guidance |
| -------- | -------- |
${useRows}
${notUseRows}

## Design rationale
${meta.designRationale}

## A11y narrative
${meta.a11y}

## API
> Auto-generated from \`packages/design-elements/dist/custom-elements.json\`.

<!-- CEM:START -->
${apiBlocks}
<!-- CEM:END -->

## Examples
${meta.examples.join('\n\n')}
`;
}

function injectCapabilityMatrix(readme) {
  const rows = componentMeta
    .map((meta) => `| [\`<${meta.tags[0]}>\`](${meta.slug}.md) | ${meta.purpose} | ${meta.pattern} | ${isFormAssociated(meta) ? 'yes' : 'no'} | ${inferSizes(meta)} | ${inferTones(meta)} |`)
    .join('\n');
  const block = `<!-- CAPABILITY:START -->\n| Tag | Purpose | A11y Pattern | Form-associated | Sizes | Tones |\n| --- | ------- | ------------ | --------------- | ----- | ----- |\n${rows}\n<!-- CAPABILITY:END -->`;
  return readme.replace(/<!-- CAPABILITY:START -->[\s\S]*?<!-- CAPABILITY:END -->/, block);
}

for (const meta of componentMeta) {
  for (const tag of meta.tags) {
    if (!declByTag.has(tag)) {
      throw new Error(`Missing CEM declaration for ${tag}`);
    }
  }
  fs.writeFileSync(path.join(docsDir, `${meta.slug}.md`), `${renderDoc(meta)}\n`);
}

const updatedReadme = injectCapabilityMatrix(fs.readFileSync(readmePath, 'utf8'));
fs.writeFileSync(readmePath, updatedReadme);

const generated = componentMeta.map((meta) => meta.slug).sort();
console.log(`Generated component docs: ${generated.join(', ')}`);
