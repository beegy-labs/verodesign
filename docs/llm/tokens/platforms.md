# Cross-Platform Strategy

> CDD Layer 2 — Platform extensibility | **Last Updated**: 2026-04-30

## Principle

Token source is platform-agnostic. Output layer is platform-specific. Adding a new platform = new Style Dictionary formatter, no token changes.

```
tokens/*.json (platform-agnostic DTCG)
    │
    ├─▶ Web        → CSS variables, utility CSS, TS types       active
    ├─▶ Tauri      → uses web output (webview)                   active
    ├─▶ iOS        → Swift UIColor extensions, CGFloat constants reserved
    ├─▶ Android    → XML resources, Kotlin extensions            reserved
    └─▶ Flutter    → Dart constants, ThemeData                   reserved
```

## Current targets (v0.1.0)

| Target | Render env | verodesign output | Status |
| ------ | ---------- | ----------------- | ------ |
| Web (Next.js, Vite, Astro, ...) | Browser | CSS + utilities + TS types | active |
| Tauri Desktop (any frontend) | webview (system) | CSS (same as web) | active |
| Tauri Mobile (iOS/Android) | webview (system) | CSS (same as web) | active |
| Electron / Capacitor / PWA | webview | CSS (same as web) | active |

## Reserved targets (formatter add-on, currently unbuilt)

| Target | Output format | Slot group expansion |
| ------ | ------------- | -------------------- |
| Native iOS (Swift) | `VerobeeColors.swift` (UIColor extension), `VerobeeSpacing.swift` (CGFloat) | `ios` slot group |
| Native Android (Kotlin) | `colors.xml`, `dimens.xml`, `VerobeeTheme.kt` (Compose) | `android` slot group |
| Flutter (Dart) | `verobee_tokens.dart` (Color, double constants) | (no specific group) |

Adoption decision: only when use case requires. Tauri covers desktop+mobile via webview, so native formatters may never ship.

## Platform-specific slot groups (reserved)

| Group | Platform | Example slots |
| ----- | -------- | ------------- |
| app-shell | Tauri/PWA desktop | titlebar, window-controls, drag-region, frameless-edge |
| mobile-shell | Tauri/PWA mobile | safe-area-top/bottom/left/right, touch-target-min |
| ios | Native iOS only | haptic, blur-effect, dynamic-island, system-link-color |
| android | Native Android only | ripple, material-motion, navigation-bar |

## Theme implements declaration

Theme declares which slot groups (and platforms) it provides:

```json
{
  "$extensions": {
    "verobee": {
      "implements": ["core", "web", "app-shell"],
      "platform": ["web", "tauri-desktop"]
    }
  }
}
```

Build gates enforce parity per declared group only — themes targeting only web don't need `app-shell` slots.

## Tauri integration

Tauri webview consumes web CSS output identically to a browser. Tauri-specific UI elements (custom titlebar with `data-tauri-drag-region`) use slot group `app-shell` when populated.

```tsx
import "@verobee/design/css/reset.css"
import "@verobee/design/css/themes/veronex.css"
import "@verobee/design/utilities/full.css"

export function App() {
  return (
    <div data-theme="veronex" className="vds-bg-page vds-text-primary">
      <header data-tauri-drag-region className="vds-bg-elevated vds-h-9">
        {/* future: vds-titlebar-bg, vds-titlebar-controls when app-shell ships */}
      </header>
      <main>...</main>
    </div>
  )
}
```

## Future native formatter contract

If/when a native formatter is added:

| Requirement | Spec |
| ----------- | ---- |
| Source unchanged | tokens/*.json identical for web and native |
| New formatter only | `src/formats/{platform}.js` |
| Color conversion | OKLCH → platform color space (Display-P3 for iOS, sRGB for Android XML) |
| Dimension unit | px (web) / pt (iOS) / dp (Android) — 4px=4pt=4dp by definition |
| Naming | `vds_theme_bg_page` (Android XML) / `veroBgPage` (Swift) / `vdsThemeBgPage` (Dart) |
| Slot group filter | platform formatter emits only relevant groups |

## Industry references

| System | Platforms | Pattern |
| ------ | --------- | ------- |
| IBM Carbon | Web (React/Angular/Vue/Vanilla) + iOS + Android | Style Dictionary multi-output |
| Material 3 | Android (Compose) + Flutter + Web | Material Tokens |
| Adobe Spectrum | Web + native (varies) | Custom build |
| Salesforce Lightning | Web + iOS + Android | Theo |

All share: single SSOT, multiple platform outputs, semantic schema parity.

## Decision policy

| Trigger | Action |
| ------- | ------ |
| User stays in webview-based (Tauri/Electron/web) | Native formatters not built |
| User starts pure native iOS or Android project | SDD spec → native formatter add-on |
| Native formatter approved | Add slot group (e.g., `ios`) for native-only concepts |
