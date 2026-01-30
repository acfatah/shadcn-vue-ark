# TODO

## WIP

- [ ] Shadcn components
  - [x] Aspect Ratio
  - [x] Breadcrumb
  - [x] Button Group
  - [ ] Calendar
  - [ ] Caraousel
  - [ ] Chart
  - [ ] Collapsible
  - [ ] Combobox
  - [ ] Command
  - [ ] Context Menu
  - [ ] Data Table
  - [ ] Date Picker
  - [x] Dialog
  - [ ] Drawer
  - [x] Dropdown Menu
  - [ ] Form
  - [ ] Hover Card
  - [ ] Input Group
  - [ ] Input OTP
  - [x] Kbd
  - [ ] Menubar
  - [ ] Navigation Menu
  - [ ] Number Field
  - [ ] Pagination
  - [ ] Pin Input
  - [x] Popover
  - [ ] Progress
  - [ ] Range Calendar
  - [ ] Resizable
  - [ ] Scroll Area
  - [x] Separator
  - [x] Sheet
  - [ ] Sidebar
  - [ ] Skeleton
  - [ ] Slider
  - [ ] Sonner
  - [x] Spinner
  - [x] Stepper
  - [x] Switch
  - [x] Table
  - [ ] Tabs
  - [ ] Tags Input
  - ~~[ ] Toast~~
  - [x] Toggle
  - [x] Toggle Group
  - [ ] Tooltip
  - [ ] Typography

- [ ] Components for data-table
  - [x] Checkbox
  - [ ] DataTable
  - [x] Dialog
  - [x] Dropdown
  - [ ] Calendar
  - [ ] Form
  - [x] Label // Use Field.Label
  - [x] Popover
  - [x] Sheet
  - [x] Switch
  - [ ] Toast

  - ~~[ ] Input // Use Field.Input~~
  - [x] Input namespace
    - [x] button // custom
    - [x] checkbox
    - [x] color
    - [x] date
    - [x] datetime-local
    - [x] email
    - [x] file
    - ~~[ ] hidden~~
    - ~~[ ] image~~
    - [x] month
    - [x] number
    - [x] password
    - [x] radio
    - [x] range
    - [x] reset // custom
    - [x] search
    - [x] submit // custom
    - [x] tel
    - [x] text
    - [x] time
    - [x] url
    - [x] week


## TODO

- [ ] Update `templates/vue-start` to use @acfatah/eslint-preset 


### Registry

- [ ] Working on creating Registry repository, specifically UI components.
- [ ] Still unsure about implementing `usePrimitive` as a composable.

- [x] horizontal orientation for checkbox group `Checkbox.Group`
- [ ] Update bordered Checkbox and Radio as variant

- [ ] Loading state for Textarea component. See `PrimitiveInput` implementation.
  - [ ] Textarea component
  - [ ] Checkbox component
  - [ ] RadioInput component

- [ ] Improve Input.Checkbox component (types, modelValue vs value, aria-checked)

- [x] Use shadcn registry to add css for Accordion.
  See: https://ui.shadcn.com/docs/registry/examples#add-custom-animations
  
- [ ] Input buttons invalid styles have not been implemented.
- [ ] Input buttons loading styles with loading icon.
- [ ] Should we handle `required` attribute on label by automatically adding
      `Input.RequiredIndicator` on the label text?

- [ ] Implement loading state to all input components.
- [ ] aria-busy (loading state) on Select component
  
### Storybook

- [ ] Incomplete Field component story
- [ ] Incomplete Fieldset component story
- [ ] Separator component story

- [ ] Checkbox.Group story

- [ ] Implement `readonly` prop control in stories for input components.
- [ ] Story for Select with popper positioning.

- [ ] Story for Item component with different variants and sizes.
- [ ] Complete stories and documentation for Sonner (vue-sonner) component.

### Documentation

TOC
- [ ] Overview
- [ ] Intro
- [ ] Getting Started
- [ ] About
  - Acknowledgements
  - License
- [ ] Guides
  - [ ] Components, Blocks and Utilities
  - [ ] Namespacing
  - [ ] Styling with data-scope and data-part
  - [ ] Anatomy of Components
  - [ ] Animation
    - mention tw-animate
  - [ ] Styling // with Tailwind CSS
  - [ ] Theming
- [ ] Components
- [ ] Utilities
  - Working with date and time

- [ ] Need to mention about namespace in the documentation.
  Refer: https://ark-ui.com/docs/guides/namespaces

- [ ] Need to mention in the documentation about data-scope and data-part
  Refer: https://ark-ui.com/docs/guides/styling
  
- [ ] Need to mention about anatomy of components in the documentation.
  Refer: https://ark-ui.com/docs/guides/anatomy

- [ ] Mention about the usage of `lucide-vue-next` icons and how to change the
  icon sets in the documentation.
  
- [ ] Add guide about animation using `tw-animate` and ark-ui animation in the documentation.
  Refer: https://ark-ui.com/docs/guides/animation


## Others

- [x] Update name to `shadcn-vue-ark`
- [ ] Component story is not generated when re-exporting components from
      Ark UI. We need to create wrapper components for that.



## MVP component registry checklist

Tier 0: Layout & basics

- [x] Button
- [x] Separator
- [x] Spinner
- [ ] Typography
  - [ ] Text
  - [ ] Heading
  - [ ] Muted
  - [ ] Lead
- [ ] Card
  - [ ] CardRoot
  - [ ] CardHeader
  - [ ] CardTitle
  - [ ] CardDescription
  - [ ] CardContent
  - [ ] CardFooter

Tier 1: Form & field primitives

- [x] Field
  - [x] FieldRoot
  - [x] FieldLabel
  - [x] FieldDescription
  - [x] FieldError
  - [x] FieldInput
  - [x] FieldTextarea
  - [x] FieldRequiredIndicator
- [x] Fieldset
  - [x] FieldsetRoot
  - [x] FieldsetLegend
  - [x] FieldsetDescription
  - [x] FieldsetSeparator
  - [x] FieldsetGroup
- [x] Label
- [x] Input
- [x] Textarea
- [x] FileInput
- [x] Checkbox
  - [x] CheckboxRoot
  - [x] CheckboxLabel
  - [x] CheckboxDescription
  - [x] CheckboxIndicator
  - [x] CheckboxControl
  - [x] CheckboxHiddenInput
  - [x] CheckboxGroup
- [ ] Switch
- [ ] Select
  - [ ] SelectRoot
  - [ ] SelectTrigger
  - [ ] SelectValue
  - [ ] SelectContent
  - [ ] SelectItem
  - [ ] SelectLabel
  - [ ] SelectSeparator
- [x] RadioGroup
  - [x] RadioGroupRoot
  - [x] RadioGroupItem
  - [x] RadioGroupLabel
  - [x] RadioGroupDescription

Tier 2: Navigation & disclosure

- [x] Accordion
  - [x] AccordionRoot
  - [x] AccordionItem
  - [x] AccordionTrigger
  - [x] AccordionContent
- [ ] Tabs
  - [ ] TabsRoot
  - [ ] TabsList
  - [ ] TabsTrigger
  - [ ] TabsContent
- [ ] Collapsible
- [ ] Menu
  - [ ] MenuRoot
  - [ ] MenuTrigger
  - [ ] MenuContent
  - [ ] MenuItem
  - [ ] MenuSeparator
  - [ ] MenuLabel
  - [ ] MenuGroup
  - [ ] MenuSub
- [ ] DropdownMenu

Tier 3: Overlay & feedback

- [ ] Dialog
  - [ ] DialogRoot
  - [ ] DialogTrigger
  - [ ] DialogContent
  - [ ] DialogHeader
  - [ ] DialogTitle
  - [ ] DialogDescription
  - [ ] DialogFooter
  - [ ] DialogClose
- [ ] Drawer
- [ ] Popover
- [ ] Tooltip
- [ ] Toast
  - [ ] ToastProvider
  - [ ] ToastRoot
  - [ ] ToastTitle
  - [ ] ToastDescription
  - [ ] ToastAction
  - [ ] ToastClose
- [ ] Alert
- [ ] AlertDialog

Tier 4: Data display & complex inputs

- [x] Avatar
- [x] Badge
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Table
  - [ ] TableRoot
  - [ ] TableHeader
  - [ ] TableBody
  - [ ] TableRow
  - [ ] TableHead
  - [ ] TableCell
  - [ ] TableCaption
- [ ] Combobox
- [ ] Command
  - [ ] CommandRoot
  - [ ] CommandInput
  - [ ] CommandList
  - [ ] CommandEmpty
  - [ ] CommandGroup
  - [ ] CommandItem
  - [ ] CommandSeparator
- [ ] Slider
- [ ] RangeSlider
- [ ] DatePicker
- [ ] Calendar

Tier 5: Theming & utility

- [ ] DarkModeToggle
- [ ] ThemeProvider
- [ ] ScrollArea
- [ ] Resizable
- [ ] AspectRatio


## References

- How to write "Getting Started" guide, the idea is using namespacing
  https://shadcnstudio.com/docs/getting-started/how-to-use-shadcn-cli


- Figma
  [Obra Studio](https://www.figma.com/community/file/1514746685758799870)
