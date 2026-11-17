# Theme adjustments

The 59 themes come from React95. Some of them pair colors that are hard or impossible to read
(for example light gray text on a light gray window). `scripts/gen-css.py` keeps every original
value unless it fails one of these minimum contrast ratios, then moves that one color toward
black or white by the smallest step that passes.

| Kind | Minimum | Examples |
| --- | --- | --- |
| Text | 4.5:1 | window text, field text, title bar text, selected rows, links |
| Graphics | 3:1 | check marks, progress fill, focus ring |
| Inactive title bar text | 2.5:1 | |
| Dimmed text and outlines | 2:1 | disabled text, placeholders, flat outline |
| Selection highlight | 1.5:1 | against the field and the window |
| Bevel edges | 1.3:1 highlight, 1.6:1 inner shadow, 3:1 outer shadow | against the window, the values the original Windows 95 palette clears |

331 values in 56 of 59 themes were changed. The originals are in `scripts/react95-themes.json`.

### aiee

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text-disabled` | `rgb(211,214,217)` | `#a4a6a8` | disabled text on windows: 1.24:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(211,214,217)` | `#b3b6b8` | placeholder / disabled text in fields: 1.46:1 against canvas, needs 2.0:1 |
| `--progress` | `rgb(251,211,61)` | `#a98e29` | progress fill, switch on-state, chart bars: 1.45:1 against canvas, needs 3.0:1 |
| `--hover-background` | `rgb(251,211,61)` | `#e2be37` | selection highlight: 1.23:1 against canvas / material, needs 1.5:1 |
| `--flat-dark` | `rgb(211,214,217)` | `#b3b6b8` | flat variant outline: 1.46:1 against canvas, needs 2.0:1 |
| `--focus-secondary` | `rgb(250,254,255)` | `#646666` | focus ring on a selected item: 1.77:1 against hover-background, needs 3.0:1 |
| `--border-lightest` | `rgb(250,254,255)` | `#ffffff` | bevel highlight: 1.16:1 against material, needs 1.3:1 |
| `--border-dark` | `rgb(211,214,217)` | `#b9bbbe` | bevel inner shadow, engraved lines, skeleton: 1.24:1 against material, needs 1.6:1 |
| `--border-darkest` | `rgb(65,187,241)` | `#3291bb` | bevel shadow: 1.86:1 against material, needs 3.0:1 |
| `--material-dark` | `rgb(0,159,223)` | `#33b2e5` | calendar weekday row, avatar: 3.68:1 against material-text, needs 4.5:1 |
| `--header-background` | `linear-gradient(to right, rgb(4,118,180), rgb(251,211,61))` | `linear-gradient(to right, rgb(4,118,180), #a98e29)` | header text unreadable at the far end of the gradient |

### ash

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material` | `rgb(96, 96, 96)` | `#787878` | text on windows: 3.34:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--canvas` | `rgb(64, 64, 64)` | `#757575` | text in fields and lists: 2.03:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--checkmark-disabled` | `rgb(128, 128, 128)` | `#b0b0b0` | disabled checkbox mark: 1.12:1 against material, needs 2.0:1 |
| `--anchor` | `rgb(192, 192, 192)` | `#050505` | links: 2.43:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(192, 192, 192)` | `#050505` | visited links: 2.43:1 against material, needs 4.5:1 |
| `--tooltip` | `rgb(0, 0, 0)` | `#797979` | tooltip and balloon background: 1.00:1 against canvas-text, needs 4.5:1 |
| `--material-dark` | `rgb(63, 63, 63)` | `#797979` | calendar weekday row, avatar: 1.99:1 against material-text, needs 4.5:1 |

### azureOrange

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#0180ff` | `#5aacff` | inactive title bar text: 1.60:1 against header-not-active-background, needs 2.5:1 |
| `--hover-background` | `#F46036` | `#f68463` | selection highlight: 1.19:1 against canvas / material, needs 1.5:1 |
| `--anchor` | `#1034a6` | `#071647` | links: 2.68:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#2a0251` | visited links: 3.51:1 against material, needs 4.5:1 |

### bee

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#e5bd03` | `#e9c729` | inactive title bar text: 2.30:1 against header-not-active-background, needs 2.5:1 |
| `--material-dark` | `#7F7B82` | `#827e85` | calendar weekday row, avatar: 4.42:1 against material-text, needs 4.5:1 |

### blue

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--progress` | `rgb(51, 153, 255)` | `#3295f9` | progress fill, switch on-state, chart bars: 2.94:1 against canvas, needs 3.0:1 |
| `--canvas-text-invert` | `rgb(255, 255, 255)` | `#2d2d2d` | text on a selected row: 2.94:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `rgb(255, 255, 255)` | `#2d2d2d` | text on a highlighted menu item: 2.94:1 against hover-background, needs 4.5:1 |
| `--focus-secondary` | `rgb(211, 228, 248)` | `#454a51` | focus ring on a selected item: 2.27:1 against hover-background, needs 3.0:1 |

### brick

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#c2bfa3` | `#dad9c8` | inactive title bar text: 1.92:1 against header-not-active-background, needs 2.5:1 |

### candy

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#EBD2BE` | `#f0ded0` | inactive title bar text: 2.26:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `#d1579e` | `#c75396` | disabled text on windows: 1.89:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `#d1579e` | `#c75396` | disabled checkbox mark: 1.89:1 against material, needs 2.0:1 |
| `--canvas-text-invert` | `#EFF1F3` | `#060606` | text on a selected row: 3.90:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#EFF1F3` | `#060606` | text on a highlighted menu item: 3.90:1 against hover-background, needs 4.5:1 |

### cherry

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-background` | `linear-gradient(to right, rgb(106, 10, 36), rgb(240, 166, 202))` | `linear-gradient(to right, rgb(106, 10, 36), #ba819d)` | header text unreadable at the far end of the gradient |
| `--header-not-active-background` | `linear-gradient(to right, rgb(128, 128, 128), rgb(192, 192, 192))` | `linear-gradient(to right, rgb(128, 128, 128), #7d7d7d)` | header not active text unreadable at the far end of the gradient |

### coldGray

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-background` | `#3B3D64` | `#767792` | title bar text: 1.98:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-not-active-text` | `#a1a3ca` | `#adaed1` | inactive title bar text: 2.25:1 against header-not-active-background, needs 2.5:1 |
| `--progress` | `#8d88c2` | `#6d6996` | progress fill, switch on-state, chart bars: 1.97:1 against canvas, needs 3.0:1 |
| `--hover-background` | `#8d88c2` | `#827eb3` | selection highlight: 1.34:1 against canvas / material, needs 1.5:1 |
| `--canvas-text-invert` | `#ffffff` | `#1a1a1a` | text on a selected row: 3.76:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#c7c7df` | `#19191c` | text on a highlighted menu item: 2.27:1 against hover-background, needs 4.5:1 |
| `--anchor` | `#8d88c2` | `#38364e` | links: 1.34:1 against material, needs 4.5:1 |
| `--material-dark` | `#6063a5` | `#7073ae` | calendar weekday row, avatar: 3.72:1 against material-text, needs 4.5:1 |

### counterStrike

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#74806e` | `#90998b` | inactive title bar text: 1.82:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `#2c3125` | `#23271e` | disabled text on windows: 1.77:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `#2c3125` | `#71746c` | placeholder / disabled text in fields: 1.36:1 against canvas, needs 2.0:1 |
| `--checkmark-disabled` | `#2c3125` | `#23271e` | disabled checkbox mark: 1.77:1 against material, needs 2.0:1 |
| `--progress` | `#978830` | `#9f9140` | progress fill, switch on-state, chart bars: 2.75:1 against canvas, needs 3.0:1 |
| `--canvas-text-invert` | `#f6fbf5` | `#1f1f1f` | text on a selected row: 3.41:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#fefefe` | `#202020` | text on a highlighted menu item: 3.54:1 against hover-background, needs 4.5:1 |
| `--anchor` | `#1034a6` | `#c3cce9` | links: 1.35:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#d5c6e3` | visited links: 1.76:1 against material, needs 4.5:1 |
| `--border-darkest` | `#0a0a0a` | `#000000` | bevel shadow: 2.62:1 against material, needs 3.0:1 |
| `--tooltip` | `#fefbcc` | `#72715c` | tooltip and balloon background: 1.01:1 against canvas-text, needs 4.5:1 |

### darkTeal

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text-disabled` | `rgb(21, 43, 43)` | `#5b6b6b` | disabled text on windows: 1.32:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(21, 43, 43)` | `#4a5b5b` | placeholder / disabled text in fields: 1.04:1 against canvas, needs 2.0:1 |
| `--anchor` | `rgb(0, 132, 132)` | `#60b2b2` | links: 2.48:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(0, 132, 132)` | `#60b2b2` | visited links: 2.48:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(21, 43, 43)` | `#4a5b5b` | flat variant outline: 1.04:1 against canvas, needs 2.0:1 |
| `--focus-secondary` | `rgb(88, 139, 139)` | `#c0d4d4` | focus ring on a selected item: 1.25:1 against hover-background, needs 3.0:1 |
| `--border-dark` | `rgb(21, 43, 43)` | `#0c1919` | bevel inner shadow, engraved lines, skeleton: 1.32:1 against material, needs 1.6:1 |

### denim

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-dark` | `rgb(0, 0, 255)` | `#6060ff` | calendar weekday row, avatar: 2.44:1 against material-text, needs 4.5:1 |
| `--header-background` | `linear-gradient(to right, rgb(10, 36, 106), rgb(148, 190, 237))` | `linear-gradient(to right, rgb(10, 36, 106), #7393b8)` | header text unreadable at the far end of the gradient |
| `--header-not-active-background` | `linear-gradient(to right, rgb(0, 0, 255), rgb(180, 180, 180))` | `linear-gradient(to right, rgb(0, 0, 255), #757575)` | header not active text unreadable at the far end of the gradient |

### eggplant

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-background` | `#4b8178` | `#497e75` | title bar text: 4.46:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-not-active-text` | `#4b8178` | `#3e6a63` | inactive title bar text: 1.88:1 against header-not-active-background, needs 2.5:1 |
| `--canvas-text-invert` | `#cee8e3` | `#050606` | text on a selected row: 3.46:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#ffffff` | `#060606` | text on a highlighted menu item: 4.46:1 against hover-background, needs 4.5:1 |
| `--anchor` | `#1034a6` | `#0f319e` | links: 4.28:1 against material, needs 4.5:1 |

### fxDev

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text-disabled` | `rgb(27, 33, 39)` | `#6b6f73` | disabled text on windows: 1.59:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(27, 33, 39)` | `#494d52` | placeholder / disabled text in fields: 1.07:1 against canvas, needs 2.0:1 |
| `--progress` | `rgb(7, 77, 117)` | `#326c8d` | progress fill, switch on-state, chart bars: 1.92:1 against canvas, needs 3.0:1 |
| `--hover-background` | `rgb(7, 77, 117)` | `#266386` | selection highlight: 1.13:1 against canvas / material, needs 1.5:1 |
| `--anchor` | `rgb(47, 138, 202)` | `#78b3dd` | links: 2.72:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(47, 138, 202)` | `#78b3dd` | visited links: 2.72:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(27, 33, 39)` | `#494d52` | flat variant outline: 1.07:1 against canvas, needs 2.0:1 |
| `--focus-secondary` | `rgb(107, 113, 122)` | `#aeb1b6` | focus ring on a selected item: 1.33:1 against hover-background, needs 3.0:1 |
| `--border-dark` | `rgb(27, 33, 39)` | `#1a2026` | bevel inner shadow, engraved lines, skeleton: 1.59:1 against material, needs 1.6:1 |
| `--border-darkest` | `rgb(7, 9, 10)` | `#000000` | bevel shadow: 1.96:1 against material, needs 3.0:1 |
| `--tooltip` | `rgb(243, 242, 219)` | `#6d6d63` | tooltip and balloon background: 1.06:1 against canvas-text, needs 4.5:1 |

### highContrast

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--progress` | `#8e0284` | `#b861b2` | progress fill, switch on-state, chart bars: 1.46:1 against canvas, needs 3.0:1 |
| `--hover-background` | `#8e0284` | `#910887` | selection highlight: 1.46:1 against canvas / material, needs 1.5:1 |
| `--anchor` | `#1034a6` | `#5871c1` | links: 2.06:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#8f68b3` | visited links: 1.58:1 against material, needs 4.5:1 |
| `--tooltip` | `#fefbcc` | `#797761` | tooltip and balloon background: 1.06:1 against canvas-text, needs 4.5:1 |
| `--material-dark` | `#9a9e9c` | `#747675` | calendar weekday row, avatar: 2.71:1 against material-text, needs 4.5:1 |

### honey

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `rgb(170, 123, 0)` | `#9d7200` | inactive title bar text: 2.21:1 against header-not-active-background, needs 2.5:1 |
| `--progress` | `rgb(170, 123, 0)` | `#a27500` | progress fill, switch on-state, chart bars: 2.85:1 against canvas, needs 3.0:1 |
| `--canvas-text-invert` | `rgb(255, 255, 0)` | `#1a1a00` | text on a selected row: 3.53:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `rgb(255, 255, 0)` | `#1a1a00` | text on a highlighted menu item: 3.53:1 against hover-background, needs 4.5:1 |
| `--anchor` | `rgb(128, 128, 0)` | `#565600` | links: 2.45:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(128, 128, 0)` | `#565600` | visited links: 2.45:1 against material, needs 4.5:1 |
| `--focus-secondary` | `rgb(255, 220, 128)` | `#ffe399` | focus ring on a selected item: 2.85:1 against hover-background, needs 3.0:1 |
| `--border-lightest` | `rgb(255, 220, 128)` | `#ffde86` | bevel highlight: 1.29:1 against material, needs 1.3:1 |

### hotChocolate

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text-disabled` | `rgb(128, 96, 64)` | `#7d5e3e` | disabled text on windows: 1.94:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `rgb(128, 96, 64)` | `#7d5e3e` | disabled checkbox mark: 1.94:1 against material, needs 2.0:1 |
| `--anchor` | `rgb(128, 96, 64)` | `#3a2b1d` | links: 1.94:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(128, 96, 64)` | `#3a2b1d` | visited links: 1.94:1 against material, needs 4.5:1 |
| `--material-dark` | `rgb(128, 96, 64)` | `#a9947e` | calendar weekday row, avatar: 2.39:1 against material-text, needs 4.5:1 |
| `--header-background` | `linear-gradient(to right, rgb(128, 96, 64), rgb(208, 183, 157))` | `linear-gradient(to right, rgb(128, 96, 64), #a18e7a)` | header text unreadable at the far end of the gradient |

### hotdogStand

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material` | `rgb(255, 0, 0)` | `#ec0000` | text on windows: 4.00:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--canvas` | `rgb(255, 0, 0)` | `#ec0000` | text in fields and lists: 4.00:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--checkmark-disabled` | `rgb(128, 128, 128)` | `#acacac` | disabled checkbox mark: 1.16:1 against material, needs 2.0:1 |
| `--anchor` | `rgb(255, 255, 0)` | `#ffffd9` | links: 4.28:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(255, 255, 0)` | `#ffffd9` | visited links: 4.28:1 against material, needs 4.5:1 |
| `--focus-secondary` | `rgb(0, 0, 0)` | `#606060` | focus ring on a selected item: 1.00:1 against hover-background, needs 3.0:1 |
| `--tooltip` | `rgb(255, 255, 225)` | `#737365` | tooltip and balloon background: 1.02:1 against canvas-text, needs 4.5:1 |
| `--material-dark` | `rgb(255, 0, 0)` | `#ec0000` | calendar weekday row, avatar: 4.00:1 against material-text, needs 4.5:1 |

### lilacRoseDark

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-text` | `#010601` | `#8d8f8d` | title bar text: 1.31:1 against header-background, needs 4.5:1 |
| `--header-not-active-text` | `#b26496` | `#be7ba6` | inactive title bar text: 2.03:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `#82416d` | `#753a62` | disabled text on windows: 1.76:1 against material, needs 2.0:1 |
| `--anchor` | `#a65387` | `#1d0f18` | links: 1.23:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#20013d` | visited links: 3.27:1 against material, needs 4.5:1 |
| `--material-dark` | `#763a60` | `#956684` | calendar weekday row, avatar: 2.54:1 against material-text, needs 4.5:1 |

### maple

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#f5e2bb` | `#625a4b` | inactive title bar text: 2.04:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `#ab9042` | `#a78c40` | disabled text on windows: 1.97:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `#ab9042` | `#a78c40` | disabled checkbox mark: 1.97:1 against material, needs 2.0:1 |

### marine

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text-disabled` | `#3c8d88` | `#398681` | disabled text on windows: 1.88:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `#3c8d88` | `#398681` | disabled checkbox mark: 1.88:1 against material, needs 2.0:1 |
| `--flat-dark` | `#9e9e9e` | `#9a9a9a` | flat variant outline: 1.94:1 against canvas, needs 2.0:1 |

### matrix

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#535353` | `#424242` | inactive title bar text: 1.92:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `#282828` | `#242424` | disabled text on windows: 1.92:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `#282828` | `#242424` | disabled checkbox mark: 1.92:1 against material, needs 2.0:1 |
| `--anchor` | `#1034a6` | `#bdc7e7` | links: 1.32:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#d0c0e0` | visited links: 1.73:1 against material, needs 4.5:1 |
| `--flat-dark` | `#9e9e9e` | `#868686` | flat variant outline: 1.47:1 against canvas, needs 2.0:1 |

### millenium

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-background` | `linear-gradient(to right, #012470, #a5c7e7)` | `linear-gradient(to right, #012470, #7c95ad)` | header text unreadable at the far end of the gradient |

### modernDark

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--canvas` | `#4b4d58` | `#74757e` | text in fields and lists: 2.50:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-background` | `#4b4d58` | `#8a8b92` | title bar text: 1.91:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-not-active-text` | `#4b4d58` | `#5d5f69` | inactive title bar text: 1.91:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `#4b4d58` | `#50515c` | disabled text on windows: 1.91:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `#4b4d58` | `#454751` | placeholder / disabled text in fields: 1.83:1 against canvas, needs 2.0:1 |
| `--checkmark-disabled` | `#121317` | `#535457` | disabled checkbox mark: 1.16:1 against material, needs 2.0:1 |
| `--progress` | `#f88702` | `#fcc98d` | progress fill, switch on-state, chart bars: 1.84:1 against canvas, needs 3.0:1 |
| `--anchor` | `#1034a6` | `#7085ca` | links: 1.58:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#9d7bbd` | visited links: 1.20:1 against material, needs 4.5:1 |
| `--flat-dark` | `#9e9e9e` | `#adadad` | flat variant outline: 1.71:1 against canvas, needs 2.0:1 |
| `--focus-secondary` | `#fefe03` | `#535301` | focus ring on a selected item: 2.29:1 against hover-background, needs 3.0:1 |
| `--border-dark` | `#121317` | `#000001` | bevel inner shadow, engraved lines, skeleton: 1.16:1 against material, needs 1.6:1 |
| `--material-dark` | `#9a9e9c` | `#3a3b3a` | calendar weekday row, avatar: 1.09:1 against material-text, needs 4.5:1 |

### molecule

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#c2c1c2` | `#cdcccd` | inactive title bar text: 2.23:1 against header-not-active-background, needs 2.5:1 |
| `--hover-background` | `#70a3ce` | `#6d9fc9` | selection highlight: 1.50:1 against canvas / material, needs 1.5:1 |
| `--canvas-text-invert` | `#f1f5f6` | `#303131` | text on a selected row: 2.57:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#f1f5f6` | `#303131` | text on a highlighted menu item: 2.57:1 against hover-background, needs 4.5:1 |
| `--focus-secondary` | `#fefe03` | `#4c4c01` | focus ring on a selected item: 2.60:1 against hover-background, needs 3.0:1 |

### ninjaTurtles

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-background` | `#FF1D15` | `#e61a13` | title bar text: 3.86:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--material-text-disabled` | `#017401` | `#016e01` | disabled text on windows: 1.89:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `#017401` | `#016e01` | disabled checkbox mark: 1.89:1 against material, needs 2.0:1 |
| `--anchor` | `#1034a6` | `#0a226c` | links: 3.20:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#3d0374` | visited links: 4.19:1 against material, needs 4.5:1 |
| `--focus-secondary` | `#fefe03` | `#6c6c01` | focus ring on a selected item: 1.57:1 against hover-background, needs 3.0:1 |

### olive

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#807f00` | `#908f20` | inactive title bar text: 2.09:1 against header-not-active-background, needs 2.5:1 |
| `--progress` | `#F3DE2C` | `#a4961e` | progress fill, switch on-state, chart bars: 1.37:1 against canvas, needs 3.0:1 |
| `--hover-background` | `#F3DE2C` | `#e7d32a` | selection highlight: 1.37:1 against canvas / material, needs 1.5:1 |
| `--anchor` | `#1034a6` | `#040d2a` | links: 2.40:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#1b0134` | visited links: 3.14:1 against material, needs 4.5:1 |
| `--material-dark` | `#4f4c02` | `#7b7941` | calendar weekday row, avatar: 2.37:1 against material-text, needs 4.5:1 |

### pamelaAnderson

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#ff0080` | `#8c0046` | inactive title bar text: 1.04:1 against header-not-active-background, needs 2.5:1 |
| `--anchor` | `#1034a6` | `#07174b` | links: 2.70:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#2a0251` | visited links: 3.53:1 against material, needs 4.5:1 |
| `--flat-dark` | `#9e9e9e` | `#969696` | flat variant outline: 1.87:1 against canvas, needs 2.0:1 |

### peggysPastels

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-text` | `rgb(255, 255, 255)` | `#404040` | title bar text: 2.29:1 against header-background, needs 4.5:1 |
| `--progress` | `rgb(162, 219, 210)` | `#719993` | progress fill, switch on-state, chart bars: 1.51:1 against canvas, needs 3.0:1 |
| `--hover-background` | `rgb(162, 219, 210)` | `#82afa8` | selection highlight: 1.02:1 against canvas / material, needs 1.5:1 |
| `--anchor` | `rgb(0, 128, 128)` | `#006060` | links: 3.03:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(0, 128, 128)` | `#006060` | visited links: 3.03:1 against material, needs 4.5:1 |
| `--focus-secondary` | `rgb(250, 224, 228)` | `#5e5456` | focus ring on a selected item: 1.95:1 against hover-background, needs 3.0:1 |
| `--border-lightest` | `rgb(250, 224, 228)` | `#fbe4e7` | bevel highlight: 1.26:1 against material, needs 1.3:1 |

### plum

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--anchor` | `#1034a6` | `#0c2881` | links: 3.67:1 against material, needs 4.5:1 |
| `--flat-dark` | `#9e9e9e` | `#929292` | flat variant outline: 1.76:1 against canvas, needs 2.0:1 |

### polarized

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material` | `rgb(120, 120, 136)` | `#6f6f7e` | text on windows: 4.04:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-text` | `rgb(0, 0, 255)` | `#0000f9` | title bar text: 4.44:1 against header-background, needs 4.5:1 |
| `--material-text-disabled` | `rgb(60, 60, 194)` | `#3232a0` | disabled text on windows: 1.62:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(60, 60, 194)` | `#7272d3` | placeholder / disabled text in fields: 1.04:1 against canvas, needs 2.0:1 |
| `--checkmark-disabled` | `rgb(101, 101, 154)` | `#3f3f60` | disabled checkbox mark: 1.10:1 against material, needs 2.0:1 |
| `--canvas-text-invert` | `rgb(0, 0, 255)` | `#0000f9` | text on a selected row: 4.44:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `rgb(0, 0, 255)` | `#0000f9` | text on a highlighted menu item: 4.44:1 against hover-background, needs 4.5:1 |
| `--anchor` | `rgb(160, 160, 128)` | `#f6f6f2` | links: 1.84:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(160, 160, 128)` | `#f6f6f2` | visited links: 1.84:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(60, 60, 194)` | `#7272d3` | flat variant outline: 1.04:1 against canvas, needs 2.0:1 |
| `--border-darkest` | `rgb(60, 60, 194)` | `#1e1e61` | bevel shadow: 1.62:1 against material, needs 3.0:1 |
| `--header-not-active-background` | `linear-gradient(to right, rgb(64, 64, 192), rgb(170, 170, 84))` | `linear-gradient(to right, rgb(64, 64, 192), #77773b)` | header not active text unreadable at the far end of the gradient |

### powerShell

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--focus-secondary` | `rgb(128, 128, 128)` | `#cfcfcf` | focus ring on a selected item: 1.21:1 against hover-background, needs 3.0:1 |
| `--tooltip` | `rgb(255, 255, 225)` | `#6c6c60` | tooltip and balloon background: 1.15:1 against canvas-text, needs 4.5:1 |

### rainyDay

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--anchor` | `#1034a6` | `#0b2474` | links: 3.41:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#42037e` | visited links: 4.46:1 against material, needs 4.5:1 |

### raspberry

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-dark` | `rgb(92, 101, 107)` | `#70787e` | calendar weekday row, avatar: 3.53:1 against material-text, needs 4.5:1 |

### redWine

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text-disabled` | `rgb(67, 9, 5)` | `#805956` | disabled text on windows: 1.27:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(67, 9, 5)` | `#6d403d` | placeholder / disabled text in fields: 1.05:1 against canvas, needs 2.0:1 |
| `--progress` | `rgb(192, 0, 0)` | `#c82020` | progress fill, switch on-state, chart bars: 2.66:1 against canvas, needs 3.0:1 |
| `--anchor` | `rgb(255, 0, 0)` | `#ff6666` | links: 3.24:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(255, 0, 0)` | `#ff6666` | visited links: 3.24:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(67, 9, 5)` | `#6d403d` | flat variant outline: 1.05:1 against canvas, needs 2.0:1 |
| `--focus-secondary` | `rgb(192, 64, 56)` | `#e1a4a0` | focus ring on a selected item: 1.24:1 against hover-background, needs 3.0:1 |
| `--border-dark` | `rgb(67, 9, 5)` | `#070100` | bevel inner shadow, engraved lines, skeleton: 1.27:1 against material, needs 1.6:1 |
| `--border-darkest` | `rgb(64, 32, 32)` | `#000000` | bevel shadow: 1.12:1 against material, needs 3.0:1 |
| `--header-not-active-background` | `linear-gradient(to right, rgb(0, 0, 0), rgb(134, 4, 2))` | `linear-gradient(to right, rgb(0, 0, 0), #830402)` | header not active text unreadable at the far end of the gradient |

### rose

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `#615f68` | `#5c5a63` | inactive title bar text: 2.40:1 against header-not-active-background, needs 2.5:1 |

### seawater

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--canvas-text-disabled` | `rgb(167, 194, 224)` | `#9fb8d5` | placeholder / disabled text in fields: 1.84:1 against canvas, needs 2.0:1 |
| `--checkmark-disabled` | `rgb(47, 88, 134)` | `#2d547f` | disabled checkbox mark: 1.91:1 against material, needs 2.0:1 |
| `--hover-background` | `rgb(0, 128, 128)` | `#007070` | selection highlight: 1.24:1 against canvas / material, needs 1.5:1 |
| `--anchor` | `rgb(0, 0, 128)` | `#00006a` | links: 4.16:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(0, 0, 128)` | `#00006a` | visited links: 4.16:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(167, 194, 224)` | `#9fb8d5` | flat variant outline: 1.84:1 against canvas, needs 2.0:1 |
| `--border-darkest` | `rgb(167, 194, 224)` | `#2e353e` | bevel shadow: 2.10:1 against material, needs 3.0:1 |
| `--material-dark` | `rgb(0, 85, 170)` | `#397bbd` | calendar weekday row, avatar: 2.88:1 against material-text, needs 4.5:1 |

### shelbiTeal

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--anchor` | `rgb(0, 128, 128)` | `#005353` | links: 2.49:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(0, 128, 128)` | `#005353` | visited links: 2.49:1 against material, needs 4.5:1 |
| `--header-background` | `linear-gradient(to right, rgb(0, 128, 128), rgb(0, 204, 204))` | `linear-gradient(to right, rgb(0, 128, 128), #00a3a3)` | header text unreadable at the far end of the gradient |
| `--header-not-active-background` | `linear-gradient(to right, rgb(96, 128, 128), rgb(160, 192, 192))` | `linear-gradient(to right, rgb(96, 128, 128), #687d7d)` | header not active text unreadable at the far end of the gradient |

### slate

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-background` | `#448199` | `#417b91` | title bar text: 4.24:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-not-active-text` | `#c2c1c2` | `#cecdce` | inactive title bar text: 2.22:1 against header-not-active-background, needs 2.5:1 |
| `--canvas-text-invert` | `#f2ffff` | `#060606` | text on a selected row: 4.24:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#f2ffff` | `#060606` | text on a highlighted menu item: 4.24:1 against hover-background, needs 4.5:1 |

### solarizedDark

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text` | `rgb(131, 148, 150)` | `#8c9c9e` | text on windows: 4.11:1 against material, needs 4.5:1 |
| `--header-text` | `rgb(108, 113, 196)` | `#868ace` | title bar text: 3.43:1 against header-background, needs 4.5:1 |
| `--material-text-disabled` | `rgb(0, 43, 54)` | `#46656d` | disabled text on windows: 1.15:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(0, 43, 54)` | `#395b63` | placeholder / disabled text in fields: 1.00:1 against canvas, needs 2.0:1 |
| `--canvas-text-invert` | `rgb(238, 232, 213)` | `#fefefd` | text on a selected row: 3.71:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `rgb(238, 232, 213)` | `#fefefd` | text on a highlighted menu item: 3.71:1 against hover-background, needs 4.5:1 |
| `--anchor` | `rgb(38, 139, 210)` | `#4c9fda` | links: 3.53:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(38, 139, 210)` | `#4c9fda` | visited links: 3.53:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(0, 43, 54)` | `#395b63` | flat variant outline: 1.00:1 against canvas, needs 2.0:1 |
| `--border-lightest` | `rgb(0, 43, 54)` | `#264b54` | bevel highlight: 1.15:1 against material, needs 1.3:1 |
| `--border-dark` | `rgb(0, 43, 54)` | `#000203` | bevel inner shadow, engraved lines, skeleton: 1.15:1 against material, needs 1.6:1 |
| `--border-darkest` | `rgb(0, 43, 54)` | `#000000` | bevel shadow: 1.15:1 against material, needs 3.0:1 |
| `--tooltip` | `rgb(253, 246, 227)` | `#262522` | tooltip and balloon background: 2.93:1 against canvas-text, needs 4.5:1 |

### solarizedLight

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text` | `rgb(101, 123, 131)` | `#586c73` | text on windows: 3.64:1 against material, needs 4.5:1 |
| `--canvas-text` | `rgb(101, 123, 131)` | `#5d7279` | text in fields and lists: 4.13:1 against canvas, needs 4.5:1 |
| `--header-text` | `rgb(108, 113, 196)` | `#6469b5` | title bar text: 4.06:1 against header-background, needs 4.5:1 |
| `--material-text-disabled` | `rgb(253, 246, 227)` | `#a4a094` | disabled text on windows: 1.14:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(253, 246, 227)` | `#b1ac9f` | placeholder / disabled text in fields: 1.00:1 against canvas, needs 2.0:1 |
| `--canvas-text-invert` | `rgb(238, 232, 213)` | `#fefefd` | text on a selected row: 3.71:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `rgb(238, 232, 213)` | `#fefefd` | text on a highlighted menu item: 3.71:1 against hover-background, needs 4.5:1 |
| `--anchor` | `rgb(38, 139, 210)` | `#1d6ca3` | links: 3.00:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(38, 139, 210)` | `#1d6ca3` | visited links: 3.00:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(253, 246, 227)` | `#b1ac9f` | flat variant outline: 1.00:1 against canvas, needs 2.0:1 |
| `--border-lightest` | `rgb(253, 246, 227)` | `#fffffe` | bevel highlight: 1.14:1 against material, needs 1.3:1 |
| `--border-dark` | `rgb(253, 246, 227)` | `#beb8aa` | bevel inner shadow, engraved lines, skeleton: 1.14:1 against material, needs 1.6:1 |
| `--border-darkest` | `rgb(253, 246, 227)` | `#858177` | bevel shadow: 1.14:1 against material, needs 3.0:1 |

### spruce

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-background` | `#3d9961` | `#348252` | title bar text: 3.50:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--canvas-text-invert` | `#fcfff6` | `#20201f` | text on a selected row: 3.50:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#fcfff6` | `#20201f` | text on a highlighted menu item: 3.50:1 against hover-background, needs 4.5:1 |

### stormClouds

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text-disabled` | `rgb(47, 52, 53)` | `#7d8081` | disabled text on windows: 1.52:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(47, 52, 53)` | `#5e6262` | placeholder / disabled text in fields: 1.00:1 against canvas, needs 2.0:1 |
| `--canvas-text-invert` | `rgb(255, 255, 255)` | `#0d0d0d` | text on a selected row: 4.20:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `rgb(255, 255, 255)` | `#0d0d0d` | text on a highlighted menu item: 4.20:1 against hover-background, needs 4.5:1 |
| `--anchor` | `rgb(64, 64, 255)` | `#bcbcff` | links: 1.34:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(64, 64, 255)` | `#bcbcff` | visited links: 1.34:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(47, 52, 53)` | `#5e6262` | flat variant outline: 1.00:1 against canvas, needs 2.0:1 |
| `--focus-secondary` | `rgb(159, 171, 172)` | `#d6dbdc` | focus ring on a selected item: 1.78:1 against hover-background, needs 3.0:1 |
| `--border-dark` | `rgb(47, 52, 53)` | `#2b3031` | bevel inner shadow, engraved lines, skeleton: 1.52:1 against material, needs 1.6:1 |
| `--header-not-active-background` | `linear-gradient(to right, rgb(47, 52, 53), rgb(128, 128, 128))` | `linear-gradient(to right, rgb(47, 52, 53), #7a7a7a)` | header not active text unreadable at the far end of the gradient |

### theSixtiesUSA

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--progress` | `#0f0` | `#00ac00` | progress fill, switch on-state, chart bars: 1.37:1 against canvas, needs 3.0:1 |
| `--hover-background` | `#0f0` | `#00f200` | selection highlight: 1.37:1 against canvas / material, needs 1.5:1 |
| `--anchor` | `#1034a6` | `#0a226c` | links: 3.20:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#3d0374` | visited links: 4.19:1 against material, needs 4.5:1 |
| `--focus-secondary` | `#fefe03` | `#797901` | focus ring on a selected item: 1.42:1 against hover-background, needs 3.0:1 |

### tokyoDark

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text-disabled` | `#1f2223` | `#1b1e1f` | disabled text on windows: 1.93:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `#1f2223` | `#626465` | placeholder / disabled text in fields: 1.27:1 against canvas, needs 2.0:1 |
| `--checkmark-disabled` | `#1f2223` | `#1b1e1f` | disabled checkbox mark: 1.93:1 against material, needs 2.0:1 |
| `--canvas-text-invert` | `#ffffff` | `#131313` | text on a selected row: 4.05:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#ffffff` | `#131313` | text on a highlighted menu item: 4.05:1 against hover-background, needs 4.5:1 |
| `--anchor` | `#1034a6` | `#b7c2e4` | links: 1.22:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#ccbadc` | visited links: 1.60:1 against material, needs 4.5:1 |
| `--focus-secondary` | `#20FC8F` | `#3cfc9d` | focus ring on a selected item: 2.96:1 against hover-background, needs 3.0:1 |
| `--border-darkest` | `#070809` | `#000000` | bevel shadow: 2.41:1 against material, needs 3.0:1 |
| `--tooltip` | `#fefbcc` | `#6c6b57` | tooltip and balloon background: 1.05:1 against canvas-text, needs 4.5:1 |

### toner

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--canvas` | `rgb(128, 128, 128)` | `#767676` | text in fields and lists: 3.95:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--material-text-disabled` | `rgb(0, 0, 0)` | `#404040` | disabled text on windows: 1.00:1 against material, needs 2.0:1 |
| `--anchor` | `rgb(0, 0, 128)` | `#7373b9` | links: 1.31:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(0, 0, 128)` | `#7373b9` | visited links: 1.31:1 against material, needs 4.5:1 |
| `--tooltip` | `rgb(128, 128, 128)` | `#767676` | tooltip and balloon background: 3.95:1 against canvas-text, needs 4.5:1 |
| `--header-not-active-background` | `linear-gradient(to right, rgb(0, 0, 0), rgb(128, 128, 128))` | `linear-gradient(to right, rgb(0, 0, 0), #434343)` | header not active text unreadable at the far end of the gradient |

### tooSexy

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material` | `#B80100` | `#cc4746` | text on windows: 3.04:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-not-active-text` | `#B80100` | `#c32726` | inactive title bar text: 2.10:1 against header-not-active-background, needs 2.5:1 |
| `--anchor` | `#1034a6` | `#000104` | links: 2.21:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#05000a` | visited links: 2.89:1 against material, needs 4.5:1 |

### travel

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material` | `#908070` | `#988a7b` | text on windows: 4.01:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-not-active-text` | `#908070` | `#a6998d` | inactive title bar text: 1.84:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `#695f50` | `#645a4c` | disabled text on windows: 1.87:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `#695f50` | `#645a4c` | disabled checkbox mark: 1.87:1 against material, needs 2.0:1 |
| `--anchor` | `#1034a6` | `#091e5f` | links: 3.03:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#38026a` | visited links: 3.97:1 against material, needs 4.5:1 |

### vaporTeal

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--progress` | `#FF99C8` | `#9f607d` | progress fill, switch on-state, chart bars: 1.32:1 against canvas, needs 3.0:1 |
| `--hover-background` | `#FF99C8` | `#a66382` | selection highlight: 1.32:1 against canvas / material, needs 1.5:1 |
| `--anchor` | `#1034a6` | `#0c2678` | links: 3.47:1 against material, needs 4.5:1 |
| `--flat-dark` | `#9e9e9e` | `#929292` | flat variant outline: 1.80:1 against canvas, needs 2.0:1 |
| `--material-dark` | `#246A73` | `#458088` | calendar weekday row, avatar: 3.38:1 against material-text, needs 4.5:1 |

### vermillion

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material` | `#cf4545` | `#d04a4a` | text on windows: 4.38:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--anchor` | `#1034a6` | `#020819` | links: 2.31:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#130123` | visited links: 3.02:1 against material, needs 4.5:1 |
| `--material-dark` | `#7f2120` | `#a96968` | calendar weekday row, avatar: 2.04:1 against material-text, needs 4.5:1 |

### violetDark

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--material-text` | `#c57ece` | `#d49eda` | text on windows: 3.44:1 against material, needs 4.5:1 |
| `--header-background` | `#1034a6` | `#5e76c3` | title bar text: 2.01:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-not-active-text` | `#652a6d` | `#78457f` | inactive title bar text: 1.83:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `#3c1f3e` | `#806d82` | disabled text on windows: 1.44:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `#3c1f3e` | `#806d82` | disabled checkbox mark: 1.44:1 against material, needs 2.0:1 |
| `--hover-background` | `#512155` | `#78537b` | selection highlight: 1.24:1 against canvas / material, needs 1.5:1 |
| `--canvas-text-invert` | `#c57ece` | `#ebd2ee` | text on a selected row: 2.18:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#c47bcc` | `#ecd4ee` | text on a highlighted menu item: 2.12:1 against hover-background, needs 4.5:1 |
| `--anchor` | `#1034a6` | `#9faedb` | links: 1.02:1 against material, needs 4.5:1 |
| `--anchor-visited` | `#440381` | `#bea7d3` | visited links: 1.34:1 against material, needs 4.5:1 |
| `--border-dark` | `#3c1f3e` | `#301932` | bevel inner shadow, engraved lines, skeleton: 1.44:1 against material, needs 1.6:1 |
| `--border-darkest` | `#18051a` | `#000000` | bevel shadow: 1.96:1 against material, needs 3.0:1 |

### vistaesqueMidnight

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-text` | `rgb(255, 255, 255)` | `#131313` | title bar text: 3.91:1 against header-background, needs 4.5:1 |
| `--material-text-disabled` | `rgb(21, 21, 21)` | `#505050` | disabled text on windows: 1.12:1 against material, needs 2.0:1 |
| `--canvas-text-disabled` | `rgb(21, 21, 21)` | `#444444` | placeholder / disabled text in fields: 1.15:1 against canvas, needs 2.0:1 |
| `--checkmark-disabled` | `rgb(32, 32, 32)` | `#525252` | disabled checkbox mark: 1.00:1 against material, needs 2.0:1 |
| `--anchor` | `rgb(64, 64, 192)` | `#7e7ed4` | links: 2.10:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(64, 64, 192)` | `#7e7ed4` | visited links: 2.10:1 against material, needs 4.5:1 |
| `--flat-dark` | `rgb(21, 21, 21)` | `#444444` | flat variant outline: 1.15:1 against canvas, needs 2.0:1 |
| `--focus-secondary` | `rgb(128, 128, 128)` | `#c6c6c6` | focus ring on a selected item: 1.33:1 against hover-background, needs 3.0:1 |
| `--border-dark` | `rgb(21, 21, 21)` | `#000000` | bevel inner shadow, engraved lines, skeleton: 1.12:1 against material, needs 1.6:1 |

### water

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-background` | `#72b3b4` | `#507d7e` | title bar text: 2.38:1, needs 4.5:1 (the surface moved, so the text keeps its color) |
| `--header-not-active-text` | `#ced0cf` | `#585858` | inactive title bar text: 1.75:1 against header-not-active-background, needs 2.5:1 |
| `--progress` | `#72b3b4` | `#649d9e` | progress fill, switch on-state, chart bars: 2.38:1 against canvas, needs 3.0:1 |
| `--canvas-text-invert` | `#ffffff` | `#393939` | text on a selected row: 2.38:1 against hover-background, needs 4.5:1 |
| `--material-text-invert` | `#ffffff` | `#393939` | text on a highlighted menu item: 2.38:1 against hover-background, needs 4.5:1 |
| `--anchor` | `#72b3b4` | `#3c5e5e` | links: 1.54:1 against material, needs 4.5:1 |
| `--focus-secondary` | `#fefe03` | `#595901` | focus ring on a selected item: 2.20:1 against hover-background, needs 3.0:1 |

### white

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `rgb(192, 192, 192)` | `#cecece` | inactive title bar text: 2.17:1 against header-not-active-background, needs 2.5:1 |
| `--border-darkest` | `rgb(255, 255, 255)` | `#939393` | bevel shadow: 1.00:1 against material, needs 3.0:1 |

### windows1

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--border-darkest` | `rgb(255, 255, 255)` | `#939393` | bevel shadow: 1.00:1 against material, needs 3.0:1 |
| `--material-dark` | `rgb(0, 0, 0)` | `#797979` | calendar weekday row, avatar: 1.00:1 against material-text, needs 4.5:1 |

### wmii

| Token | React95 | Here | Why |
| --- | --- | --- | --- |
| `--header-not-active-text` | `rgb(193, 196, 139)` | `#e5e6ce` | inactive title bar text: 1.76:1 against header-not-active-background, needs 2.5:1 |
| `--material-text-disabled` | `rgb(145, 148, 75)` | `#868945` | disabled text on windows: 1.76:1 against material, needs 2.0:1 |
| `--checkmark-disabled` | `rgb(145, 148, 75)` | `#868945` | disabled checkbox mark: 1.76:1 against material, needs 2.0:1 |
| `--anchor` | `rgb(129, 101, 79)` | `#5e4939` | links: 2.95:1 against material, needs 4.5:1 |
| `--anchor-visited` | `rgb(129, 101, 79)` | `#5e4939` | visited links: 2.95:1 against material, needs 4.5:1 |
