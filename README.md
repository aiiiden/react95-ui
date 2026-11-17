# React95 UI

**[Live showcase](https://aiiiden.github.io/react95-ui/)**

A port of [React95](https://github.com/arturbien/React95) (Windows 95 components for React) to **Tailwind CSS v4 + shadcn/ui conventions**.

- No styled-components: styles are Tailwind utilities and CSS variables
- Behavior and accessibility from [Radix UI](https://www.radix-ui.com/) (`radix-ui` package)
- Variants with `class-variance-authority`, class merging with `cn()`
- Distributed as a shadcn registry: you copy the source into your project and own it
- Optional pixel fonts (UnifontExMono 16px, Fusion Pixel 12px / 10px) with an add-on for Hangul, kana and CJK ideographs, kept outside the registry: see [Fonts](#fonts) (setup adapted from [catarchy](https://github.com/catarchy-net/catarchy))

## Components (63)

**Ported from React95 (28)**

| Group | Components |
| --- | --- |
| Input | Button, Checkbox, RadioGroup, Input (+Textarea), NumberInput, Select, Slider, ColorInput, DatePicker |
| Layout | Window, Frame, GroupBox, AppBar, Toolbar, Tabs, ScrollView, Separator, Handle |
| Display | Table, TreeView, MenuList (+DropdownMenu), Progress, Hourglass, Counter, Monitor, Avatar, Tooltip, Anchor |

**The rest of shadcn/ui, in the same look (35)**

| Group | Components |
| --- | --- |
| Overlays | Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard |
| Menus and navigation | Menubar, ContextMenu, NavigationMenu, Breadcrumb, Pagination |
| Inputs | Label, Switch, Toggle, ToggleGroup, ButtonGroup, Combobox, Command, InputOTP, Form, Calendar, Kbd |
| Structure | Accordion, Collapsible, Card, Resizable, Sidebar, AspectRatio |
| Feedback and data | Alert, Badge, Skeleton, Toaster (sonner), Carousel, Chart, MessageIcon |

Notes on the shadcn set:

- Modals do not dim the page, as in Windows 95. The overlay only blocks clicks.
- Dialog, Sheet and Drawer put the title in a title bar (`DialogHeader`) and the text in `DialogBody`. AlertDialog is a message box: `AlertDialogBody icon="question"` picks one of four pixel icons.
- Calendar is written from scratch on `Date` and `Intl` (no react-day-picker). Sidebar is a compact version: it collapses to nothing or to an icon rail, and does not become a sheet on phones.
- Toaster borrows from one release later: toasts are Windows XP notification balloons redrawn in pixels (the `balloon` utility: pale yellow, stepped corners, a tail aimed at the taskbar). Set `offset` so the tail lands on your status area. `toast.info`, `toast.warning` and `toast.error` add the matching icon.
- Switch did not exist in Windows 95. It is built from a sunken track and a raised thumb.
- Extra npm packages, each used by one component: `cmdk` (Command), `vaul` (Drawer), `input-otp`, `embla-carousel-react` (Carousel), `react-resizable-panels` (Resizable), `sonner` (Toaster), `react-hook-form` (Form), `recharts` (Chart).

### Tabs that do not fit

`TabsList` follows the Win32 tab control. `overflow="multiline"` (default, what property sheets use) wraps tabs into rows, stretches every row to the full width and moves the row with the selected tab to the front. `overflow="scroll"` keeps one row that scrolls natively (swipe, trackpad, wheel) with snap, always brings the selected tab into view, and puts the up-down control beside the row rather than over it.

## Theme

`src/styles/react95.css` has three layers:

1. **Material tokens** with React95's original names (`--material`, `--border-dark`, `--header-background`, ...). `:root` is the Windows 95 palette and `.dark` is a night palette designed for this port.
2. **shadcn semantic tokens** (`--background`, `--primary`, `--border`, ...) mapped onto the material tokens, so stock shadcn components pick up the look.
3. **Bevel utilities**, one per React95 border recipe:

| Utility | Used for |
| --- | --- |
| `bevel-button` / `bevel-button-pressed` | buttons |
| `bevel-thin` / `bevel-thin-pressed` | toolbar and menu buttons |
| `bevel-field` | inputs, checkboxes, lists |
| `bevel-grouping` | GroupBox |
| `bevel-status` | status bar cells |
| `bevel-window` | windows |
| `bevel-flat` | flat variant |

Each recipe is a 2px `border` (outer ring) plus an inset `box-shadow` (inner ring), as in React95's `createBorderStyles`. No component has a drop shadow: depth comes from the bevel alone. There are also `hatched` (2px checkerboard; set `--r95-hatch` for its color), `text-engraved` (disabled text), `scrollbar-r95` and `font-pixel-bold` (pixel fonts have no bold weight, so the glyph is double-struck one font pixel to the right).

`src/styles/themes.css` contains all 59 React95 themes, generated from the npm package. Apply one with `<html data-r95-theme="vaporTeal">`.

### Type scale

Pixel fonts only look sharp at their native size or a whole multiple of it. Each `type-*` utility sets font family, size and line height together, so a face is never rendered at a size it was not drawn for. Do not combine them with `text-sm`, `text-[13px]` and the like.

| Class | Size / line height | Font |
| --- | --- | --- |
| `type-10` | 10 / 12 | Fusion Pixel 10 |
| `type-12` | 12 / 16 | Fusion Pixel 12 |
| `type-16` | 16 / 20 | UnifontExMono |
| `type-32`, `type-48` | 32 / 40, 48 / 56 | UnifontExMono ×2, ×3 |

## Install from the registry

Three ways, all served from this repository. Items pull in what they depend on (the theme, `cn()`, other components and npm packages).

**1. GitHub address** (no configuration):

```bash
npx shadcn@latest add aiiiden/react95-ui/theme aiiiden/react95-ui/button aiiiden/react95-ui/window
```

**2. URL** (no configuration):

```bash
npx shadcn@latest add https://aiiiden.github.io/react95-ui/r/button.json
```

**3. Namespace**. Add the registry to your app's `components.json` once:

```json
{
  "registries": {
    "@react95-ui": "https://aiiiden.github.io/react95-ui/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @react95-ui/theme @react95-ui/button @react95-ui/window
```

The full item list is in [`registry.json`](./registry.json).

Then import the theme once, for example in `src/index.css`:

```css
@import "./styles/react95.css";
@import "./styles/themes.css"; /* optional */
```

## Fonts

Fonts are deliberately not in the registry. The theme only names three font families (`--font-pixel`, `--font-pixel-sm`, `--font-pixel-xs`) and falls back to the system monospace font when they are not loaded: everything still works, it just is not pixel type.

The recommended set lives in `src/assets/fonts/`, a self-contained folder: 27 woff2 files (2.2 MB), two CSS files and two license files. Each face is split by `unicode-range`, so a browser downloads only the scripts a page uses.

- `fonts.css`: Latin, extended Latin and symbols. An English page fetches about 31 KB.
- `fonts-cjk.css`: optional add-on with Hangul, kana, CJK ideographs and CJK punctuation.

| Slot | Font | Drawn for |
| --- | --- | --- |
| `--font-pixel` | UnifontExMono | 16px (also 32px, 48px) |
| `--font-pixel-sm` | Fusion Pixel 12px | 12px |
| `--font-pixel-xs` | Fusion Pixel 10px | 10px |

Two ways to load it:

```css
/* 1. copy src/assets/fonts/ into your project, then */
@import "./assets/fonts/fonts.css";
@import "./assets/fonts/fonts-cjk.css"; /* only if you need Korean, Japanese or Chinese */
```

```html
<!-- 2. or link the hosted copy (or host the folder yourself) -->
<link rel="stylesheet" href="https://aiiiden.github.io/react95-ui/fonts/fonts.css" />
```

Both fonts are SIL OFL 1.1. Keep `LICENSE-*.txt` next to the font files.

**Bold.** Pixel fonts have no bold weight, so `font-pixel-bold` double-strikes each glyph one pixel to the right. Without pixel fonts it uses the fallback font's real bold instead. The switch is the CSS variable `--r95-pixel`, which the bundled `fonts.css` sets to `1`.

**Using other fonts.** Override the three variables, and set `:root { --r95-pixel: 1 }` if they are pixel fonts. A pixel font is only sharp at the size it was drawn for, so also change the matching `type-*` utility in `react95.css` to that size (for an 11px font, set `type-12` to `font-size: 11px`).

## Development

```bash
npm install
npm run dev              # showcase at http://localhost:5173
npm run build            # type-check + single-file build in dist/
npm run registry:build   # writes public/r/*.json
python3 scripts/gen-registry.py   # regenerate registry.json after adding a component
```

## Licenses

- Code: MIT. Ported from React95 by Artur Bień and contributors (MIT).
- UnifontExMono © stgiga and Fusion Pixel Font © TakWolf, both SIL Open Font License 1.1. See `src/assets/fonts/LICENSE-*.txt`.
- The MS Sans Serif font bundled with React95 is not included.
