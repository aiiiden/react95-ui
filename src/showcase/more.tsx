import * as React from "react"
import { useForm } from "react-hook-form"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Tooltip as ChartTooltip, XAxis, YAxis } from "recharts"
import { DemoWindow, Spec } from "./parts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog, AlertDialogAction, AlertDialogBody, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ChartContainer, ChartDot, ChartHatch, ChartLegend, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Combobox } from "@/components/ui/combobox"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command"
import {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Frame } from "@/components/ui/frame"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarTrigger,
} from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/sonner"
import { Switch } from "@/components/ui/switch"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const quarters = [
  { q: "Q1", files: 24, folders: 6, shortcuts: 4 },
  { q: "Q2", files: 38, folders: 9, shortcuts: 7 },
  { q: "Q3", files: 31, folders: 14, shortcuts: 5 },
  { q: "Q4", files: 52, folders: 11, shortcuts: 9 },
]
const drives = [
  { drive: "A:", used: 1.2 },
  { drive: "C:", used: 412 },
  { drive: "D:", used: 268 },
  { drive: "E:", used: 95 },
]
const memory = [
  { t: "09:00", used: 9, cache: 3 },
  { t: "10:00", used: 12, cache: 4 },
  { t: "11:00", used: 11, cache: 6 },
  { t: "12:00", used: 15, cache: 5 },
  { t: "13:00", used: 13, cache: 7 },
  { t: "14:00", used: 18, cache: 6 },
  { t: "15:00", used: 16, cache: 8 },
]
const disk = [
  { name: "used", value: 412, fill: "var(--chart-1)" },
  { name: "system", value: 96, fill: "var(--chart-3)" },
  { name: "free", value: 516, fill: "var(--chart-2)" },
]
const seriesConfig: ChartConfig = {
  files: { label: "Files", color: "var(--chart-1)" },
  folders: { label: "Folders", color: "var(--chart-4)" },
  shortcuts: { label: "Shortcuts", color: "var(--chart-2)" },
}
const pairConfig: ChartConfig = { files: seriesConfig.files, folders: seriesConfig.folders }
const driveConfig: ChartConfig = { used: { label: "Used (MB)", color: "var(--chart-1)" } }
const memoryConfig: ChartConfig = { used: { label: "In use (MB)", color: "var(--chart-1)" }, cache: { label: "Cache (MB)", color: "var(--chart-3)" } }
const diskConfig: ChartConfig = { used: { label: "Used", color: "var(--chart-1)" }, system: { label: "System", color: "var(--chart-3)" }, free: { label: "Free", color: "var(--chart-2)" } }
const axis = { tickLine: false } as const
const tip = <ChartTooltip cursor={false} isAnimationActive={false} content={<ChartTooltipContent />} />

const systems = [
  { value: "win95", label: "Windows 95" },
  { value: "win98", label: "Windows 98" },
  { value: "me", label: "Windows ME" },
  { value: "nt4", label: "Windows NT 4.0" },
  { value: "2000", label: "Windows 2000" },
]

function FolderGlyph() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" shapeRendering="crispEdges" aria-hidden="true" className="shrink-0">
      <path d="M1 1h5v1h1v1h8v10H1z" fill="#f7c600" />
      <path d="M0 0h7v1h1v1h8v12H0zM1 1v12h14V3H7V2H6V1z" fill="#0a0a0a" fillRule="evenodd" />
    </svg>
  )
}

export function MoreSections() {
  const [status, setStatus] = React.useState(true)
  const [view, setView] = React.useState("list")
  const [page, setPage] = React.useState(2)
  const [open, setOpen] = React.useState(false)
  const [place, setPlace] = React.useState("documents")
  const form = useForm<{ name: string }>({ defaultValues: { name: "" } })
  const places = [
    { id: "documents", label: "Documents" },
    { id: "programs", label: "Programs" },
    { id: "settings", label: "Settings" },
  ]

  return (
    <>
      <DemoWindow title="Dialogs · Overlays (6)" status={<span>Dialog · AlertDialog · Sheet · Drawer · Popover · HoverCard</span>}>
        <Spec name="Dialog · AlertDialog">
          <Dialog>
            <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader closeLabel="Close"><DialogTitle>Properties</DialogTitle></DialogHeader>
              <DialogBody>
                <DialogDescription>Change the file name, then choose OK.</DialogDescription>
                <Input defaultValue="README.TXT" aria-label="File name" />
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild><Button>Cancel</Button></DialogClose>
                <DialogClose asChild><Button primary>OK</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button>Delete file</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>Confirm File Delete</AlertDialogTitle></AlertDialogHeader>
              <AlertDialogBody icon="question">
                <AlertDialogDescription>Are you sure you want to send 'readme.txt' to the Recycle Bin?</AlertDialogDescription>
              </AlertDialogBody>
              <AlertDialogFooter>
                <AlertDialogAction>Yes</AlertDialogAction>
                <AlertDialogCancel>No</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Spec>
        <Spec name="Sheet · Drawer">
          <Sheet>
            <SheetTrigger asChild><Button>Open sheet</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader closeLabel="Close"><SheetTitle>Details</SheetTitle></SheetHeader>
              <SheetBody>
                <SheetDescription>A panel docked to the edge of the screen.</SheetDescription>
                <Label><Switch defaultChecked /> Show status bar</Label>
              </SheetBody>
              <SheetFooter><SheetClose asChild><Button primary>OK</Button></SheetClose></SheetFooter>
            </SheetContent>
          </Sheet>
          <Drawer>
            <DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader><DrawerTitle>Details</DrawerTitle></DrawerHeader>
              <DrawerBody><DrawerDescription>Drag the grip down to close.</DrawerDescription></DrawerBody>
              <DrawerFooter><DrawerClose asChild><Button primary>OK</Button></DrawerClose></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Spec>
        <Spec name="Popover · HoverCard">
          <Popover>
            <PopoverTrigger asChild><Button>Open popover</Button></PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <p>A small panel anchored to its button.</p>
              <Input placeholder="File name" aria-label="File name" />
            </PopoverContent>
          </Popover>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button type="button" className="text-anchor underline underline-offset-2">react95.css</button>
            </HoverCardTrigger>
            <HoverCardContent>CSS Document · 14 KB</HoverCardContent>
          </HoverCard>
          <span className="type-12">Hover the file name</span>
        </Spec>
      </DemoWindow>

      <DemoWindow title="Menus · Navigation (5)" status={<span>Menubar · ContextMenu · NavigationMenu · Breadcrumb · Pagination</span>}>
        <Spec name="Menubar">
          <Frame variant="window" className="w-full">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>New Folder <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>
                  <MenubarItem>Rename</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem disabled>Delete</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarCheckboxItem checked={status} onCheckedChange={setStatus}>Status bar</MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarRadioGroup value={view} onValueChange={setView}>
                    <MenubarRadioItem value="icons">Large icons</MenubarRadioItem>
                    <MenubarRadioItem value="list">List</MenubarRadioItem>
                    <MenubarRadioItem value="details">Details</MenubarRadioItem>
                  </MenubarRadioGroup>
                  <MenubarSeparator />
                  <MenubarItem>Refresh <MenubarShortcut>F5</MenubarShortcut></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </Frame>
        </Spec>
        <Spec name="ContextMenu">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Frame variant="field" className="flex h-20 w-full select-none items-center justify-center px-3 text-center">Right-click or long-press here</Frame>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>New Folder</ContextMenuItem>
              <ContextMenuItem>Rename <ContextMenuShortcut>F2</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuCheckboxItem checked={status} onCheckedChange={setStatus}>Status bar</ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Properties</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Spec>
        <Spec name="NavigationMenu">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="#">Documents</NavigationMenuLink>
                  <NavigationMenuLink href="#">Settings</NavigationMenuLink>
                  <NavigationMenuLink href="#">My Computer</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink variant="button" href="#">Help</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Spec>
        <Spec name="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">My Computer</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Local Disk (C:)</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>src</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Spec>
        <Spec name="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</PaginationPrevious></PaginationItem>
              {[1, 2, 3].map((n) => (
                <PaginationItem key={n}><PaginationLink isActive={page === n} onClick={() => setPage(n)}>{n}</PaginationLink></PaginationItem>
              ))}
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext disabled={page === 3} onClick={() => setPage((p) => p + 1)}>Next</PaginationNext></PaginationItem>
            </PaginationContent>
          </Pagination>
        </Spec>
      </DemoWindow>

      <DemoWindow title="More inputs (11)" status={<span>Label · Switch · Toggle · ToggleGroup · ButtonGroup · Combobox · Command · InputOTP · Form · Calendar · Kbd</span>}>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <Spec name="Label · Switch">
            <div className="flex flex-col gap-2">
              <Label><Switch defaultChecked /> Notifications</Label>
              <Label><Switch /> Show status bar</Label>
              <Label className="text-engraved"><Switch disabled /> Disabled</Label>
            </div>
          </Spec>
          <Spec name="Toggle · ToggleGroup">
            <Toggle size="icon" aria-label="Bold" defaultPressed className="font-pixel-bold">B</Toggle>
            <ToggleGroup type="single" defaultValue="left" aria-label="View mode">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </Spec>
        </div>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <Spec name="ButtonGroup · Kbd">
            <ButtonGroup>
              <Button>Back</Button>
              <Button>Forward</Button>
            </ButtonGroup>
            <KbdGroup><Kbd>Ctrl</Kbd>+<Kbd>C</Kbd></KbdGroup>
          </Spec>
          <Spec name="Combobox">
            <Combobox options={systems} defaultValue="win98" aria-label="Operating system" placeholder="Choose..." searchPlaceholder="Search..." emptyText="No results" />
          </Spec>
        </div>
        <Spec name="Command">
          <Command className="max-w-sm">
            <CommandInput placeholder="Search..." aria-label="Search..." />
            <CommandList>
              <CommandEmpty>No results</CommandEmpty>
              <CommandItem>New Folder <CommandShortcut>Ctrl+N</CommandShortcut></CommandItem>
              <CommandItem>Rename <CommandShortcut>F2</CommandShortcut></CommandItem>
              <CommandItem>Refresh <CommandShortcut>F5</CommandShortcut></CommandItem>
              <CommandItem>Properties</CommandItem>
            </CommandList>
          </Command>
        </Spec>
        <Spec name="InputOTP">
          <InputOTP maxLength={6} aria-label="Code" defaultValue="1995">
            <InputOTPGroup><InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /></InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup><InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} /></InputOTPGroup>
          </InputOTP>
        </Spec>
        <Spec name="Form">
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit((v) => { toast.info("Saved", { description: v.name }); form.reset() })}
              className="flex w-full max-w-sm flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Enter a file name." }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File name</FormLabel>
                    <FormControl><Input maxLength={8} {...field} /></FormControl>
                    <FormDescription>Up to 8 characters, as in MS-DOS.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" primary className="self-start">Save</Button>
            </form>
          </Form>
        </Spec>
        <Spec name="Calendar">
          <Calendar defaultSelected={new Date(1995, 7, 24)} previousLabel="Previous" nextLabel="Next" />
        </Spec>
      </DemoWindow>

      <DemoWindow title="Structure (6)" status={<span>Accordion · Collapsible · Card · Resizable · Sidebar · AspectRatio</span>}>
        <Spec name="Accordion">
          <Accordion type="single" collapsible defaultValue="general" className="w-full">
            {["General", "Network", "Sharing"].map((n) => (
              <AccordionItem key={n} value={n.toLowerCase()}>
                <AccordionTrigger>{n}</AccordionTrigger>
                <AccordionContent>More text appears here when the section is open.</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Spec>
        <Spec name="Collapsible">
          <Collapsible open={open} onOpenChange={setOpen} className="flex w-full flex-col items-start gap-2">
            <CollapsibleTrigger asChild><Button>{open ? "Hide details" : "Show details"}</Button></CollapsibleTrigger>
            <CollapsibleContent asChild><Frame variant="field" className="w-full p-2">More text appears here when the section is open.</Frame></CollapsibleContent>
          </Collapsible>
        </Spec>
        <Spec name="Card">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>My Computer</CardTitle>
              <CardDescription>3 object(s)</CardDescription>
            </CardHeader>
            <CardContent><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /></CardContent>
            <CardFooter><Button primary>OK</Button></CardFooter>
          </Card>
        </Spec>
        <Spec name="Resizable">
          <div className="h-32 w-full">
            <ResizablePanelGroup orientation="horizontal">
              <ResizablePanel defaultSize="35%" minSize="20%" className="p-2">Left pane</ResizablePanel>
              <ResizableHandle />
              <ResizablePanel minSize="20%" className="p-2">Right pane<br /><span className="type-12">Drag the bar between the panes.</span></ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </Spec>
        <Spec name="Sidebar">
          <SidebarProvider className="h-44">
            <Sidebar collapsible="icon">
              <SidebarHeader>My Computer</SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Folders</SidebarGroupLabel>
                  <SidebarMenu>
                    {places.map((p) => (
                      <SidebarMenuItem key={p.id}>
                        <SidebarMenuButton isActive={place === p.id} onClick={() => setPlace(p.id)} aria-label={p.label}><FolderGlyph /><span>{p.label}</span></SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="gap-2 pl-2">
              <SidebarTrigger className="self-start">Toggle sidebar</SidebarTrigger>
              <p>{places.find((p) => p.id === place)?.label}</p>
            </SidebarInset>
          </SidebarProvider>
        </Spec>
        <Spec name="AspectRatio">
          <div className="w-full max-w-xs">
            <AspectRatio ratio={16 / 9}>
              <Frame variant="field" className="flex size-full items-center justify-center bg-desktop text-desktop-foreground">16 : 9</Frame>
            </AspectRatio>
          </div>
        </Spec>
      </DemoWindow>

      <DemoWindow title="Feedback (5)" className="lg:col-span-2" status={<span>Alert · Badge · Skeleton · Toaster · Carousel</span>}>
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          <Spec name="Alert">
            <div className="flex w-full flex-col gap-2">
              <Alert><AlertTitle>Note</AlertTitle><AlertDescription>Setup finished.</AlertDescription></Alert>
              <Alert variant="warning"><AlertTitle>Warning</AlertTitle><AlertDescription>The disk is almost full.</AlertDescription></Alert>
              <Alert variant="destructive" icon={16}><AlertDescription>The file could not be found.</AlertDescription></Alert>
            </div>
          </Spec>
          <Spec name="Badge · Skeleton · Toaster">
            <Badge>New</Badge>
            <Badge variant="secondary">3</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline">Draft</Badge>
            <Skeleton className="h-5 w-24" />
            <Button onClick={() => toast.info("Copy complete", { description: "3 files copied to Local Disk (C:)." })}>Show toast</Button>
            <Button onClick={() => toast.warning("Warning", { description: "The disk is almost full." })}>Warning</Button>
          </Spec>
          <Spec name="Carousel">
            <Carousel className="w-full">
              <CarouselPrevious aria-label="Previous" />
              <CarouselContent>
                {[1, 2, 3].map((n) => (
                  <CarouselItem key={n} className="flex h-24 items-center justify-center type-32">Slide {n}</CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext aria-label="Next" />
            </Carousel>
          </Spec>
        </div>
      </DemoWindow>

      <DemoWindow title="Charts (6)" className="lg:col-span-2" status={<span>Chart · ChartTooltipContent · ChartLegend · ChartDot · ChartHatch · var(--chart-1) to var(--chart-5)</span>}>
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
          <Spec name="Bar · grouped">
            <div className="flex w-full flex-col gap-2">
              <ChartContainer config={pairConfig} className="h-48">
                <BarChart data={quarters} margin={{ top: 4, right: 4, bottom: 0, left: -16 }} barGap={0}>
                  <CartesianGrid vertical={false} strokeDasharray="1 3" />
                  <XAxis dataKey="q" {...axis} />
                  <YAxis {...axis} />
                  {tip}
                  <Bar dataKey="files" fill="var(--color-files)" stroke="var(--border-darkest)" isAnimationActive={false} />
                  <Bar dataKey="folders" fill="var(--color-folders)" stroke="var(--border-darkest)" isAnimationActive={false} />
                </BarChart>
              </ChartContainer>
              <ChartLegend config={pairConfig} />
            </div>
          </Spec>
          <Spec name="Bar · stacked">
            <div className="flex w-full flex-col gap-2">
              <ChartContainer config={seriesConfig} className="h-48">
                <BarChart data={quarters} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                  <CartesianGrid vertical={false} strokeDasharray="1 3" />
                  <XAxis dataKey="q" {...axis} />
                  <YAxis {...axis} />
                  {tip}
                  <Bar dataKey="files" stackId="a" fill="var(--color-files)" stroke="var(--border-darkest)" isAnimationActive={false} />
                  <Bar dataKey="folders" stackId="a" fill="var(--color-folders)" stroke="var(--border-darkest)" isAnimationActive={false} />
                  <Bar dataKey="shortcuts" stackId="a" fill="var(--color-shortcuts)" stroke="var(--border-darkest)" isAnimationActive={false} />
                </BarChart>
              </ChartContainer>
              <ChartLegend config={seriesConfig} />
            </div>
          </Spec>
          <Spec name="Bar · horizontal">
            <div className="flex w-full flex-col gap-2">
              <ChartContainer config={driveConfig} className="h-48">
                <BarChart data={drives} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: -28 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="1 3" />
                  <XAxis type="number" {...axis} />
                  <YAxis type="category" dataKey="drive" {...axis} />
                  {tip}
                  <Bar dataKey="used" fill="var(--color-used)" stroke="var(--border-darkest)" isAnimationActive={false} />
                </BarChart>
              </ChartContainer>
              <ChartLegend config={driveConfig} />
            </div>
          </Spec>
          <Spec name="Line">
            <div className="flex w-full flex-col gap-2">
              <ChartContainer config={memoryConfig} className="h-48">
                <LineChart data={memory} margin={{ top: 8, right: 20, bottom: 0, left: -16 }}>
                  <CartesianGrid vertical={false} strokeDasharray="1 3" />
                  <XAxis dataKey="t" {...axis} interval={1} />
                  <YAxis {...axis} />
                  {tip}
                  <Line dataKey="used" type="linear" stroke="var(--color-used)" strokeWidth={2} dot={<ChartDot />} activeDot={false} isAnimationActive={false} />
                  <Line dataKey="cache" type="linear" stroke="var(--color-cache)" strokeWidth={2} dot={<ChartDot />} activeDot={false} isAnimationActive={false} />
                </LineChart>
              </ChartContainer>
              <ChartLegend config={memoryConfig} />
            </div>
          </Spec>
          <Spec name="Area · stepped, dithered">
            <div className="flex w-full flex-col gap-2">
              <ChartContainer config={memoryConfig} className="h-48">
                <AreaChart data={memory} margin={{ top: 8, right: 20, bottom: 0, left: -16 }}>
                  <ChartHatch id="hatch-used" color="var(--chart-1)" />
                  <ChartHatch id="hatch-cache" color="var(--chart-3)" background="var(--canvas)" />
                  <CartesianGrid vertical={false} strokeDasharray="1 3" />
                  <XAxis dataKey="t" {...axis} interval={1} />
                  <YAxis {...axis} />
                  {tip}
                  <Area dataKey="used" type="stepAfter" stroke="var(--color-used)" strokeWidth={2} fill="url(#hatch-used)" fillOpacity={1} activeDot={false} isAnimationActive={false} />
                  <Area dataKey="cache" type="stepAfter" stroke="var(--color-cache)" strokeWidth={2} fill="url(#hatch-cache)" fillOpacity={1} activeDot={false} isAnimationActive={false} />
                </AreaChart>
              </ChartContainer>
              <ChartLegend config={memoryConfig} />
            </div>
          </Spec>
          <Spec name="Pie">
            <div className="flex w-full flex-col gap-2">
              <ChartContainer config={diskConfig} className="h-48">
                <PieChart>
                  {tip}
                  <Pie data={disk} dataKey="value" nameKey="name" outerRadius="90%" startAngle={90} endAngle={-270} stroke="var(--border-darkest)" strokeWidth={1} isAnimationActive={false} />
                </PieChart>
              </ChartContainer>
              <ChartLegend config={diskConfig} />
            </div>
          </Spec>
        </div>
      </DemoWindow>
    </>
  )
}
