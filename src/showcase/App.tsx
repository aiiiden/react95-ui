import * as React from "react"
import { slot, one, mixed, isBase } from "./lib"
import { setTheme as applyTheme, themeNames } from "@/lib/react95-theme"
import { DemoWindow, Spec } from "./parts"
import { Toaster } from "@/components/ui/sonner"
import { MoreSections } from "./more"
import { Anchor } from "@/components/ui/anchor"
import { AppBar } from "@/components/ui/app-bar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColorInput } from "@/components/ui/color-input"
import { Counter } from "@/components/ui/counter"
import { DatePicker } from "@/components/ui/date-picker"
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Frame } from "@/components/ui/frame"
import { GroupBox } from "@/components/ui/group-box"
import { Handle } from "@/components/ui/handle"
import { Hourglass } from "@/components/ui/hourglass"
import { Input, Textarea } from "@/components/ui/input"
import { MenuList, MenuListItem, MenuListSeparator } from "@/components/ui/menu-list"
import { Monitor } from "@/components/ui/monitor"
import { NumberInput } from "@/components/ui/number-input"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollView } from "@/components/ui/scroll-view"
import { Select, SelectContent, SelectItem, SelectLabel, SelectGroup, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from "@/components/ui/toolbar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TreeView } from "@/components/ui/tree-view"
import { Window, WindowButton, WindowContent, WindowControls, WindowHeader, WindowStatusBar, WindowTitle } from "@/components/ui/window"

type Mode = "light" | "dark" | "system"

function useTheme() {
  const [mode, setMode] = React.useState<Mode>(() => {
    try { return (localStorage.getItem("r95-mode") as Mode) || "system" } catch { return "system" }
  })
  const [theme, setTheme] = React.useState<string>(() => {
    try { return localStorage.getItem("r95-theme") || "" } catch { return "" }
  })
  React.useEffect(() => {
    const root = document.documentElement
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    // "system" follows the host page's data-theme (if any), then the OS setting
    const systemDark = () => {
      const host = root.getAttribute("data-theme")
      return host ? host === "dark" : mq.matches
    }
    const apply = () => root.classList.toggle("dark", !theme && (mode === "dark" || (mode === "system" && systemDark())))
    apply()
    mq.addEventListener("change", apply)
    const obs = new MutationObserver(apply)
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    applyTheme(theme || null)
    try { localStorage.setItem("r95-mode", mode); localStorage.setItem("r95-theme", theme) } catch { /* storage blocked */ }
    // browser chrome (address bar, in-app browser bars) takes the window color of the current theme
    const material = getComputedStyle(root).getPropertyValue("--material").trim()
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", material)
    return () => {
      mq.removeEventListener("change", apply)
      obs.disconnect()
    }
  }, [mode, theme])
  return { mode, setMode, theme, setTheme }
}

const files = [
  { name: "react95.css", type: "CSS Document", size: "14 KB" },
  { name: "button.tsx", type: "TSX File", size: "3 KB" },
  { name: "window.tsx", type: "TSX File", size: "4 KB" },
  { name: "UnifontExMono.woff2", type: "Font", size: "127 KB" },
  { name: "registry.json", type: "JSON File", size: "6 KB" },
]

const tree = [
  { id: "c", label: "Local Disk (C:)", items: [
    { id: "src", label: "src", items: [
      { id: "ui", label: "components/ui", items: [{ id: "btn", label: "button.tsx" }, { id: "win", label: "window.tsx" }] },
      { id: "styles", label: "styles", items: [{ id: "css", label: "react95.css" }] },
    ] },
    { id: "pkg", label: "package.json" },
  ] },
  { id: "a", label: "3½ Floppy (A:)", disabled: true },
]

export function App() {
  const { mode, setMode, theme, setTheme } = useTheme()
  const [startOpen, setStartOpen] = React.useState(false)
  const [progress, setProgress] = React.useState(64)
  const [count, setCount] = React.useState(42)
  const [color, setColor] = React.useState("#008080")
  const [sortAsc, setSortAsc] = React.useState(true)
  const [showStatus, setShowStatus] = React.useState(true)
  const [view, setView] = React.useState("list")
  const [clock, setClock] = React.useState(() => new Date())
  React.useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])
  const sorted = [...files].sort((a, b) => (sortAsc ? 1 : -1) * a.name.localeCompare(b.name))

  return (
    <TooltipProvider>
      <div className="min-h-dvh bg-desktop pb-16 type-16 text-material-text">
        <AppBar position="sticky-top" className="px-[max(4px,env(safe-area-inset-left,0px))]">
          <Toolbar className="flex-wrap justify-between">
            <div className="flex items-center gap-2">
              <Handle />
              <span className="font-pixel-bold">React95 UI</span>
              <span className="hidden type-12 md:inline">Tailwind v4 · shadcn registry</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={theme || "__default"} onValueChange={(v) => setTheme(v === "__default" ? "" : v)}>
                <SelectTrigger className="w-52" aria-label="Theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  <SelectGroup>
                    <SelectLabel>Default for this port (light/dark pair)</SelectLabel>
                    <SelectItem value="__default">default</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>{themeNames.length} React95 themes</SelectLabel>
                    {themeNames.map((name) => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ToolbarToggleGroup {...one({ value: mode, onValueChange: (v) => setMode(v as Mode) })} aria-label="Color mode" disabled={!!theme}>
                <ToolbarToggleItem value="light" aria-label="Light" className="w-auto px-2">Light</ToolbarToggleItem>
                <ToolbarToggleItem value="dark" aria-label="Dark" className="w-auto px-2">Dark</ToolbarToggleItem>
                <ToolbarToggleItem value="system" aria-label="System" className="w-auto px-2">System</ToolbarToggleItem>
              </ToolbarToggleGroup>
            </div>
          </Toolbar>
        </AppBar>

        <main className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-[max(16px,env(safe-area-inset-left,0px))] pt-6 lg:grid-cols-2">
          <DemoWindow title="React95 UI — Getting started" className="lg:col-span-2" status={<><span>63 components · {themeNames.length} themes</span><span>MIT</span></>}>
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div className="flex min-w-0 flex-col gap-3">
                <h1 className="type-32 font-pixel-bold">React95, rebuilt on Tailwind v4</h1>
                <p className="max-w-[80ch]">
                  <Anchor href="https://github.com/arturbien/React95" target="_blank" rel="noreferrer">React95</Anchor>'s Windows 95 components, ported the shadcn way.{" "}
                  CSS variables and Tailwind utilities replace styled-components, and {isBase ? "Base UI" : "Radix UI"} handles behavior. Copy the code into your project and make it yours.
                </p>
                <p className="type-12">
                  Every component comes in two versions. You are looking at the <span className="font-pixel-bold">{isBase ? "Base UI" : "Radix UI"}</span> build:{" "}
                  <Anchor href={isBase ? "https://aiiiden.github.io/react95-ui/" : "https://aiiiden.github.io/react95-ui/base/"}>switch to {isBase ? "Radix UI" : "Base UI"}</Anchor>.
                </p>
                <Frame variant="field" className="scrollbar-r95 overflow-x-auto p-3 type-12">
                  <pre>{`${isBase ? "npx shadcn@latest add https://aiiiden.github.io/react95-ui/r/base/button.json" : "npx shadcn@latest add aiiiden/react95-ui/button aiiiden/react95-ui/window"}

<Button primary>OK</Button>
<div className="bevel-window bg-material p-2">bevel utility</div>`}</pre>
                </Frame>
              </div>
              <Monitor width={200}>
                <div className="flex h-full flex-col items-center justify-center gap-2 text-header-text">
                  <Hourglass size={32} />
                  <span className="type-12 text-desktop-foreground">Please wait...</span>
                </div>
              </Monitor>
            </div>
          </DemoWindow>

          <DemoWindow title="Inputs (9)" status={<span>Button · Checkbox · Radio · Input · NumberInput · Select · Slider · ColorInput · DatePicker</span>}>
            <Spec name="Button">
              <Button primary>OK</Button>
              <Button>Cancel</Button>
              <Button active>Active</Button>
              <Button disabled>Disabled</Button>
              <Button variant="raised">raised</Button>
              <Button variant="thin">thin</Button>
              <Button variant="flat">flat</Button>
              <Button size="sm">sm</Button>
              <Button size="lg">lg</Button>
            </Spec>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <Spec name="Checkbox">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><Checkbox defaultChecked /> Show status bar</label>
                  <label className="flex items-center gap-2"><Checkbox {...mixed} /> Partially selected</label>
                  <label className="flex items-center gap-2 text-engraved"><Checkbox disabled /> Disabled</label>
                  <label className="flex items-center gap-2"><Checkbox variant="flat" defaultChecked /> flat</label>
                </div>
              </Spec>
              <Spec name="RadioGroup">
                <RadioGroup defaultValue="list" aria-label="View mode">
                  <label className="flex items-center gap-2"><RadioGroupItem value="icons" /> Large icons</label>
                  <label className="flex items-center gap-2"><RadioGroupItem value="list" /> List</label>
                  <label className="flex items-center gap-2"><RadioGroupItem value="detail" /> Details</label>
                  <label className="flex items-center gap-2 text-engraved"><RadioGroupItem value="x" disabled /> Disabled</label>
                </RadioGroup>
              </Spec>
            </div>
            <Spec name="Input · Textarea">
              <Input defaultValue="C:\WINDOWS\SYSTEM" aria-label="Path" className="max-w-xs" />
              <Input placeholder="File name" aria-label="File name" className="max-w-[12rem]" />
              <Input disabled value="Read only" aria-label="Disabled input" className="max-w-[10rem]" readOnly />
              <Textarea defaultValue={"Welcome to Notepad.\nEvery glyph sits on the pixel grid."} aria-label="Notes" />
            </Spec>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <Spec name="NumberInput">
                <NumberInput aria-label="Copies" defaultValue={3} min={1} max={99} />
                <NumberInput aria-label="Scale" defaultValue={1.5} step={0.5} />
              </Spec>
              <Spec name="ColorInput">
                <ColorInput value={color} onValueChange={setColor} aria-label="Desktop color" />
                <span className="type-12">{color}</span>
              </Spec>
            </div>
            <Spec name="Select">
              <Select defaultValue="win95">
                <SelectTrigger aria-label="Operating system"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="win95">Windows 95</SelectItem>
                  <SelectItem value="win98">Windows 98</SelectItem>
                  <SelectItem value="me">Windows ME</SelectItem>
                  <SelectItem value="nt" disabled>Windows NT 4.0</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="a">
                <SelectTrigger variant="flat" className="w-36" aria-label="Flat select"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">flat</SelectItem>
                  <SelectItem value="b">variant</SelectItem>
                </SelectContent>
              </Select>
            </Spec>
            <Spec name="Slider">
              <div className="flex w-full flex-col gap-4">
                <Slider defaultValue={[30]} max={100} step={10} marks aria-label="Volume" />
                <Slider defaultValue={[20, 70]} aria-label="Range" variant="flat" />
              </div>
            </Spec>
            <Spec name="DatePicker">
              <DatePicker defaultValue={new Date(1995, 7, 24)} title="Date" />
            </Spec>
          </DemoWindow>

          <DemoWindow title="Layout (9)" status={<span>Window · Frame · GroupBox · AppBar · Toolbar · Tabs · ScrollView · Separator · Handle</span>}>
              <Spec name="Window">
                <Window className="w-full max-w-sm" resizable>
                  <WindowHeader>
                    <WindowTitle>My Computer</WindowTitle>
                    <WindowControls>
                      <WindowButton glyph="help" aria-label="Help" />
                      <WindowButton glyph="close" aria-label="Close" />
                    </WindowControls>
                  </WindowHeader>
                  <Toolbar>
                    <ToolbarButton>File</ToolbarButton>
                    <ToolbarButton>Edit</ToolbarButton>
                    <ToolbarButton>View</ToolbarButton>
                  </Toolbar>
                  <WindowContent className="pt-1">
                    <Frame variant="field" className="p-2">A field frame inside a window</Frame>
                  </WindowContent>
                  <WindowStatusBar><span>3 object(s)</span><span>1.44MB</span></WindowStatusBar>
                </Window>
                <Window inactive className="w-full max-w-sm">
                  <WindowHeader>
                    <WindowTitle>Inactive window</WindowTitle>
                    <WindowControls><WindowButton glyph="close" aria-label="Close" /></WindowControls>
                  </WindowHeader>
                  <WindowContent>inactive</WindowContent>
                </Window>
              </Spec>
              <Spec name="Frame">
                {(["window", "button", "field", "status", "grouping", "well", "flat"] as const).map((v) => (
                  <Frame key={v} variant={v} className="px-3 py-2 type-12">{v}</Frame>
                ))}
              </Spec>
              <Spec name="GroupBox">
                <GroupBox label="Screen Saver" className="w-full">
                  <div className="flex flex-wrap items-center gap-3">
                    <span>Wait</span>
                    <NumberInput aria-label="Wait (minutes)" defaultValue={10} min={1} className="w-24" />
                    <span>min</span>
                  </div>
                </GroupBox>
              </Spec>
              <Spec name="Toolbar · Handle · Separator">
                <Frame variant="window" className="flex w-full items-center">
                  <Handle />
                  <Toolbar noPadding className="flex-wrap py-1">
                    <ToolbarButton>Back</ToolbarButton>
                    <ToolbarButton>Forward</ToolbarButton>
                    <ToolbarSeparator />
                    <ToolbarToggleGroup {...one({ value: view, onValueChange: setView })} aria-label="View">
                      <ToolbarToggleItem value="icons" aria-label="Large icons"><GridIcon /></ToolbarToggleItem>
                      <ToolbarToggleItem value="list" aria-label="List"><ListIcon /></ToolbarToggleItem>
                    </ToolbarToggleGroup>
                  </Toolbar>
                </Frame>
                <div className="flex h-8 w-full items-center gap-3">
                  <span>Left</span>
                  <Separator orientation="vertical" />
                  <span>Right</span>
                </div>
                <Separator />
              </Spec>
              <Spec name="Tabs">
                <Tabs defaultValue="bg" className="w-full">
                  <TabsList>
                    <TabsTrigger value="bg">Background</TabsTrigger>
                    <TabsTrigger value="saver">Screen Saver</TabsTrigger>
                    <TabsTrigger value="look">Appearance</TabsTrigger>
                  </TabsList>
                  <TabsContent value="bg" className="flex flex-col gap-3">
                    <p>Pick a desktop color.</p>
                    <ColorInput value={color} onValueChange={setColor} aria-label="Background color" />
                  </TabsContent>
                  <TabsContent value="saver">
                    <label className="flex items-center gap-2"><Checkbox defaultChecked /> Password protected</label>
                  </TabsContent>
                  <TabsContent value="look">Font size: 16px</TabsContent>
                </Tabs>
              </Spec>
              <Spec name="Tabs · multiline">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList>
                    {["General", "Device Manager", "Hardware Profiles", "Performance", "Network", "Sharing", "Advanced"].map((n) => (
                      <TabsTrigger key={n} value={n.toLowerCase()}>{n}</TabsTrigger>
                    ))}
                  </TabsList>
                  {["General", "Device Manager", "Hardware Profiles", "Performance", "Network", "Sharing", "Advanced"].map((n) => (
                    <TabsContent key={n} value={n.toLowerCase()}>{n}: the row with the selected tab moves to the front.</TabsContent>
                  ))}
                </Tabs>
              </Spec>
              <Spec name="Tabs · scroll">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList overflow="scroll">
                    {["General", "Device Manager", "Hardware Profiles", "Performance", "Network", "Sharing", "Advanced"].map((n) => (
                      <TabsTrigger key={n} value={n.toLowerCase()}>{n}</TabsTrigger>
                    ))}
                  </TabsList>
                  {["General", "Device Manager", "Hardware Profiles", "Performance", "Network", "Sharing", "Advanced"].map((n) => (
                    <TabsContent key={n} value={n.toLowerCase()}>{n}: one row. Swipe the tabs, or use the arrows.</TabsContent>
                  ))}
                </Tabs>
              </Spec>
              <Spec name="ScrollView">
                <ScrollView className="h-40 w-full">
                  <div className="flex w-[640px] flex-col gap-2">
                    {Array.from({ length: 12 }, (_, i) => (
                      <p key={i}>README.TXT line {String(i + 1).padStart(2, "0")} · scrolls both ways with Windows 95 scrollbars.</p>
                    ))}
                  </div>
                </ScrollView>
              </Spec>
              <Spec name="AppBar">
                <p className="type-12">The bar at the top of this page is an AppBar (sticky-top).</p>
              </Spec>
          </DemoWindow>

          <DemoWindow title="Display · Feedback (10)" className="lg:col-span-2" status={<span>Table · TreeView · MenuList · ProgressBar · Hourglass · Counter · Monitor · Avatar · Tooltip · Anchor</span>}>
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
              <Spec name="Table">
                <Table containerClassName="h-64" className="min-w-[440px] table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => setSortAsc((s) => !s)} aria-sort={sortAsc ? "ascending" : "descending"}>Name {sortAsc ? "▲" : "▼"}</TableHead>
                      <TableHead className="w-32">Type</TableHead>
                      <TableHead className="w-24 text-right">Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sorted.map((f, i) => (
                      <TableRow key={f.name} data-state={i === 1 ? "selected" : undefined}>
                        <TableCell>{f.name}</TableCell>
                        <TableCell>{f.type}</TableCell>
                        <TableCell className="text-right tabular-nums">{f.size}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Spec>
              <Spec name="TreeView">
                <ScrollView className="h-64 w-full">
                  <TreeView tree={tree} defaultExpanded={["c", "src", "ui"]} defaultSelected="btn" />
                </ScrollView>
              </Spec>
              <Spec name="MenuList · DropdownMenu">
                <MenuList inline>
                  <MenuListItem>New Folder</MenuListItem>
                  <MenuListItem>Shortcut</MenuListItem>
                  <MenuListSeparator />
                  <MenuListItem disabled>Paste</MenuListItem>
                </MenuList>
                <DropdownMenu>
                  <DropdownMenuTrigger {...slot(<Button>Open View menu</Button>)} />
                  <DropdownMenuContent>
                    <DropdownMenuLabel>View</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>Status bar</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={view} onValueChange={setView}>
                      <DropdownMenuRadioItem value="icons">Large icons</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Arrange by</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Name</DropdownMenuItem>
                        <DropdownMenuItem>Size</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem>Refresh <DropdownMenuShortcut>F5</DropdownMenuShortcut></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Spec>
              <Spec name="Progress">
                <div className="flex w-full flex-col gap-3">
                  <Progress value={progress} aria-label="Copy progress" />
                  <Progress value={progress} variant="tile" aria-label="Install progress" />
                  <Slider value={[progress]} onValueChange={([v]) => setProgress(v)} aria-label="Adjust progress" />
                </div>
              </Spec>
              <Spec name="Counter · Hourglass">
                <Counter value={count} />
                <Counter value={-7} size="sm" />
                <Button size="sm" onClick={() => setCount((c) => c + 1)}>+1</Button>
                <Hourglass size={32} />
                <Hourglass size={16} />
                <Hourglass size={48} />
              </Spec>
              <Spec name="Avatar · Tooltip · Anchor">
                <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
                <Avatar square size={48}><AvatarFallback>95</AvatarFallback></Avatar>
                <Tooltip>
                  <TooltipTrigger {...slot(<Button>Hover me</Button>)} />
                  <TooltipContent>Empties the Recycle Bin</TooltipContent>
                </Tooltip>
                <Anchor href="https://github.com/arturbien/React95" target="_blank" rel="noreferrer">Original React95</Anchor>
              </Spec>
            </div>
          </DemoWindow>

          <MoreSections />
          <DemoWindow title="Typography · Bevel utilities" className="lg:col-span-2">
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
              <Spec name="type-*" className="md:col-span-2">
                <div className="flex min-w-0 flex-col gap-2">
                  <p className="type-48">Pixel 48</p>
                  <p className="type-32">My Computer · UnifontExMono 32px</p>
                  <p className="type-16">Body 16px — The quick brown fox jumps over the lazy dog 0123456789</p>
                  <p className="type-12">Fusion Pixel 12px — The quick brown fox jumps over the lazy dog</p>
                  <p className="type-10">Fusion Pixel 10px — The quick brown fox jumps over the lazy dog</p>
                </div>
              </Spec>
              <Spec name="bevel-*" className="md:col-span-2">
                <div className="grid w-full grid-cols-[repeat(auto-fill,150px)] gap-3">
                  {["bevel-button", "bevel-button-pressed", "bevel-thin", "bevel-thin-pressed", "bevel-field", "bevel-grouping", "bevel-status", "bevel-window", "bevel-flat"].map((c) => (
                    <div key={c} className={c + " flex h-12 items-center bg-material px-2 type-10"}>{c}</div>
                  ))}
                </div>
              </Spec>
            </div>
          </DemoWindow>
        </main>

        <AppBar position="fixed-bottom">
          <div className="flex items-center gap-1 p-1">
            <div className="relative">
              <Button active={startOpen} aria-expanded={startOpen} onClick={() => setStartOpen((o) => !o)} className="h-8 [--btn-px:8px] font-pixel-bold">
                <StartLogo /> Start
              </Button>
              {startOpen && (
                <MenuList className="absolute bottom-full left-0 z-50 mb-1 w-56">
                  <MenuListItem onClick={() => setStartOpen(false)}>Programs</MenuListItem>
                  <MenuListItem onClick={() => setStartOpen(false)}>Documents</MenuListItem>
                  <MenuListItem onClick={() => setStartOpen(false)}>Settings</MenuListItem>
                  <MenuListSeparator />
                  <MenuListItem disabled>Shut Down...</MenuListItem>
                </MenuList>
              )}
            </div>
            <Handle size={24} />
            <Button active className="h-8 w-40 min-w-0 justify-start [--btn-px:8px]">React95 UI</Button>
            <span className="ml-auto flex h-8 items-center bevel-status px-3 type-12 tabular-nums">
              {clock.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </span>
          </div>
        </AppBar>
      </div>
      {/* sits just above the taskbar, tail aimed at the clock */}
      <Toaster offset={{ bottom: 46, right: 8 }} mobileOffset={{ bottom: 46, right: 8, left: 8 }} toastOptions={{ closeButtonAriaLabel: "Close" }} />
    </TooltipProvider>
  )
}

function StartLogo() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M1 1h6v5H1z" fill="#e5332a" />
      <path d="M8 1h6v5H8z" fill="#2fa84f" />
      <path d="M1 7h6v5H1z" fill="#1a6fdc" />
      <path d="M8 7h6v5H8z" fill="#f7c600" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M1 1h5v5H1zM8 1h5v5H8zM1 8h5v5H1zM8 8h5v5H8z" fill="currentColor" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M1 2h2v2H1zM5 2h8v2H5zM1 6h2v2H1zM5 6h8v2H5zM1 10h2v2H1zM5 10h8v2H5z" fill="currentColor" />
    </svg>
  )
}
