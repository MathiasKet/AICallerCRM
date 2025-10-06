# Design Guidelines: AI Caller CRM & Admin Dashboard

## Design Approach
**System-Based Approach** - Drawing from modern SaaS dashboard patterns (Omnixis.ai, ClickUp) with Material Design principles for information-dense enterprise applications. Focus on professional efficiency, clear data hierarchy, and trustworthy aesthetics suitable for business operations.

## Core Design Elements

### A. Color Palette

**Dark Mode Primary (Default)**
- Background Base: 222 47% 11% (deep charcoal)
- Surface Elevated: 222 47% 15% (elevated panels)
- Surface Interactive: 222 40% 20% (cards, modals)
- Primary Brand: 217 91% 60% (vibrant blue for CTAs, active states)
- Primary Hover: 217 91% 65%
- Accent: 142 71% 45% (green for success, active calls)
- Text Primary: 210 40% 98%
- Text Secondary: 215 20% 65%
- Border: 217 33% 25%

**Light Mode**
- Background: 0 0% 100%
- Surface: 210 40% 98%
- Primary: 217 91% 50%
- Text Primary: 222 47% 11%
- Text Secondary: 215 16% 47%

**Semantic Colors**
- Success (active calls): 142 71% 45%
- Warning (pending): 38 92% 50%
- Error (failed): 0 84% 60%
- Info (scheduled): 199 89% 48%

### B. Typography
- **Headings**: Inter (600-700 weight)
  - H1: 2.5rem (dashboard titles)
  - H2: 1.875rem (section headers)
  - H3: 1.5rem (card headers)
- **Body**: Inter (400-500 weight)
  - Base: 0.875rem (dashboard content)
  - Small: 0.75rem (metadata, timestamps)
- **Monospace**: JetBrains Mono (for API keys, IDs, transcripts)

### C. Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 (e.g., p-4, gap-6, mt-8)
- Dashboard grid: 16px base unit
- Card padding: p-6
- Section spacing: space-y-8
- Component gaps: gap-4

**Layout Structure**
- Sidebar navigation: Fixed 280px width (lg:), collapsible to 64px
- Main content: max-w-7xl with responsive padding (px-4 lg:px-8)
- Dashboard cards: Grid layout (grid-cols-1 md:grid-cols-2 xl:grid-cols-3)

### D. Component Library

**Navigation**
- Side navigation with icon + label, active state with blue accent border-left (4px)
- Top bar: breadcrumbs, user profile dropdown, notification bell
- Mobile: Bottom navigation or hamburger drawer

**Data Display**
- **Call History Table**: Striped rows, hover state, sortable headers
  - Columns: Date/Time, Contact, Duration, Status, Transcript Preview
  - Row action: View full transcript modal
- **Analytics Cards**: Metric value (3rem, bold) + label + trend indicator (arrow + percentage)
- **Live Transcript Viewer**: Real-time updating panel with speaker labels, timestamps, auto-scroll
- **Calendar**: FullCalendar week/month views with color-coded call types (completed: green, scheduled: blue, missed: red)

**Forms & Inputs**
- Dark mode conscious: Input backgrounds at 222 40% 20%, borders at 217 33% 25%
- Labels: text-sm font-medium mb-2
- API Key inputs: Monospace font, show/hide toggle, copy button
- Validation: Inline error messages in red with icon

**Interactive Elements**
- Primary Button: bg-primary with subtle hover lift (translate-y-[-1px])
- Secondary: variant="outline" with border-primary
- Icon buttons: Circular, 40px, hover bg-surface-elevated
- Tabs: Underline indicator, smooth transition
- Modals: Backdrop blur-md, slide-in animation from bottom

**Charts & Visualization**
- Use Chart.js or Recharts with dark mode optimized colors
- Line charts: Gradient fill under line (primary color, 20% opacity)
- Bar charts: Rounded tops, 8px radius
- Donut charts: Center metric display

### E. Unique Dashboard Patterns

**Call Status Indicators**
- Live pill badge: Pulsing green dot + "Live" label
- Completed: Static green checkmark
- Failed: Red X icon
- Scheduled: Blue calendar icon

**CRM Sync Status**
- Success toast: Slide-in from top-right, green border-left
- Sync in progress: Animated spinner in top bar
- Error state: Red banner with retry action

**Scheduling Interface**
- Date/time picker: Custom styled with primary color highlights
- Contact selector: Searchable dropdown with avatar + name
- Quick actions: "Schedule for tomorrow 9 AM" preset buttons

## Key Design Principles
1. **Information Density**: Maximize data visibility without clutter - use tables, cards, and charts efficiently
2. **Workflow Efficiency**: Minimize clicks - quick actions accessible from list views (call, reschedule, view transcript)
3. **Status Clarity**: Always show call state, CRM sync status, system health with clear visual indicators
4. **Professional Trust**: Consistent spacing, subtle animations, no playful elements
5. **Dark Mode First**: All components designed for dark theme, light mode as alternative

## Responsive Behavior
- Desktop (1280px+): Full sidebar, 3-column card grids
- Tablet (768px-1279px): Collapsible sidebar, 2-column grids
- Mobile (<768px): Bottom nav, single column, simplified tables to cards

## Images
**Not Applicable** - This is a dashboard application. No hero images or decorative photography. Use:
- Iconography: Phosphor Icons or Lucide React (consistent 24px size)
- Empty states: Minimal illustrations in brand colors (max 200px height)
- User avatars: 40px circles with fallback initials