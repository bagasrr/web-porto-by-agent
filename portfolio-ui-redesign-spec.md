# FULL UI REDESIGN + JSON STORAGE MIGRATION

## 1. Objective

Redesign the **entire existing application** based on the attached UI reference image.

The reference is a **visual and UX inspiration only**. Do not copy it pixel-by-pixel.

The final application should feel like a:

> **Premium futuristic personal portfolio + CMS for a developer**

Visual characteristics:

- Futuristic
- Premium
- Elegant
- Dark and atmospheric
- Modern editorial typography
- Subtle glassmorphism
- Rounded cards
- Thin borders
- Soft glow effects
- Layered composition
- Strong visual hierarchy
- Smooth but restrained animations
- Fully responsive

Replace the reference image's purple/pink identity with a **red / maroon / burgundy / wine / crimson** visual identity.

---

# 2. IMPORTANT: REDESIGN THE ENTIRE APPLICATION

Do **not** redesign only the landing page.

The new design system must be applied consistently to **every existing page and UI component**, including:

- Landing / portfolio page
- Dashboard
- CRUD dashboards
- Tables
- Create pages
- Edit pages
- Detail pages
- Forms
- Login / authentication UI
- Sidebar
- Navbar / topbar
- Modals
- Dialogs
- Dropdowns
- Toasts / notifications
- Empty states
- Loading states
- Error states
- Settings
- Profile pages
- Mobile navigation
- Any other existing route

The public portfolio and admin/CMS area must clearly feel like parts of the same product.

Do not leave CRUD pages looking like a generic Bootstrap, Tailwind, shadcn, or admin-template dashboard.

---

# 3. Design Direction

Use the attached reference as inspiration for:

- Layout rhythm
- Visual hierarchy
- Editorial typography
- Atmospheric backgrounds
- Glass/surface cards
- Large visual imagery
- Rounded containers
- Thin borders
- Subtle glowing accents
- Premium spacing
- Section composition
- Modern portfolio presentation

Do not literally duplicate the reference.

Create an original design adapted to the current application and its content.

---

# 4. Color System

IMPORTANT:

Do NOT use the reference's purple/pink palette.

Use a sophisticated **burgundy / maroon / red** palette.

Suggested base tokens:

```text
Background:
#10070D

Secondary Background:
#180A12

Surface:
#21101A

Primary:
#8F1D3F

Primary Hover:
#A6264D

Dark Burgundy:
#3D0B1F

Accent:
#D94A70

Primary Text:
#F8F3F5

Secondary Text:
#C8B9BF

Muted Text:
#8F7D85

Border:
rgba(255,255,255,0.10)

Accent Border:
rgba(143,29,63,0.45)

Success:
#5FCB91

Warning:
#E7B75C

Danger:
#E05B69
```

These values may be adjusted slightly if needed for accessibility and visual consistency.

Do not scatter arbitrary colors throughout the codebase.

Create centralized theme/design tokens.

---

# 5. Dark Mode + Light Mode

Both themes are mandatory.

## Dark Mode

Dark mode should be the primary visual experience:

- Deep burgundy-black background
- Subtle red/burgundy glow
- Dark glass/surface cards
- Soft borders
- Off-white text
- Burgundy highlights
- Atmospheric gradients

## Light Mode

Light mode must be intentionally designed.

Suggested direction:

```text
Background:
#FAF7F8

Surface:
#FFFFFF

Secondary Surface:
#F4ECEF

Primary:
#8F1D3F

Primary Dark:
#64132F

Text:
#24151B

Secondary Text:
#66555D

Border:
#E7DDE1
```

Do NOT simply invert the dark theme.

Manually verify both themes for:

- Text contrast
- Buttons
- Cards
- Tables
- Forms
- Inputs
- Sidebar
- Navigation
- Icons
- Badges
- Dialogs
- Dropdowns
- Hover states
- Focus states
- Disabled states

The light mode must be fully readable.

---

# 6. Typography

Use a modern professional typography system.

Preferred direction:

- Inter
- Geist
- Or another high-quality modern sans-serif

Optionally combine with a subtle editorial/display font for major headings.

Suggested hierarchy:

```text
Eyebrow:
10–12px
uppercase
letter spacing
muted/accent

Hero Heading:
48–72px desktop
36–48px tablet
32–40px mobile

Section Heading:
32–48px

Card Heading:
18–24px

Body:
14–16px

Metadata:
11–13px
```

Keep typography readable and avoid excessive oversized text.

---

# 7. Global Visual System

Create reusable components and design tokens.

## Cards

Cards should use:

- Rounded corners
- Thin borders
- Subtle translucent surfaces
- Soft shadows
- Burgundy glow where appropriate
- Consistent padding

Example direction:

```css
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 18px;
```

Do not make everything transparent.

Glassmorphism should be used selectively.

---

# 8. Background

The background should have subtle depth.

Use combinations of:

- Radial gradients
- Burgundy/red glow
- Soft blurred gradient areas
- Very subtle noise/grain if appropriate
- Vignette
- Low-opacity decorative shapes

Effects must remain subtle.

Never reduce text readability.

Avoid excessive particles or distracting animated backgrounds.

---

# 9. Portfolio / Landing Page

Redesign the homepage into a premium personal developer portfolio.

Suggested structure:

```text
Navbar
↓
Hero
↓
Featured Projects
↓
About
↓
Skills
↓
Services
↓
Experience
↓
Process / Workflow
↓
Testimonials / Achievements
↓
Contact CTA
↓
Footer
```

Adapt the structure to the existing application's actual content.

---

# 10. Navbar

Desktop navigation can include:

```text
Logo / Name

Home
Work
About
Skills
Experience
Contact

Let's Connect
```

Use a floating/glass style if appropriate.

Mobile:

- Logo/name
- Menu button
- Mobile navigation drawer

The navbar must remain usable while scrolling.

---

# 11. Hero Section

Create a strong visual hero.

Suggested structure:

```text
Small eyebrow
"FULL STACK DEVELOPER"

Large headline

Short professional description

Primary CTA
Secondary CTA

Social links / availability

Large profile photo
```

Use the user's existing assets.

Do not generate fake profile images.

---

# 12. Existing Assets

Inspect:

```text
/public/assets
```

before implementing the redesign.

Identify:

- Profile photos
- Project images
- Logos
- Icons
- Other relevant visual assets

Reuse existing local assets wherever appropriate.

Do not replace existing relevant assets with random stock images.

Do not introduce unnecessary external image dependencies.

Do not stretch or distort images.

Use proper:

- object-fit
- object-position
- aspect-ratio
- responsive sizing

---

# 13. Featured Projects

Create a premium project showcase.

Project cards should contain information such as:

```text
Project number
Project image
Project name
Description
Category
Technology tags
View project
```

Example:

```text
01

Project Name

Short project description...

React
Next.js
Golang

→ View Project
```

Use visually interesting layouts when appropriate.

Do not force every card into an identical layout if the content benefits from variation.

---

# 14. About Section

Create an elegant profile section containing:

- Professional introduction
- Current role
- Experience
- Education
- Main technologies
- Working philosophy

Avoid making this look like a plain resume.

---

# 15. Skills Section

Group skills logically:

```text
Frontend
Backend
Database
Tools
DevOps
Other
```

Examples may include:

```text
JavaScript
TypeScript
React
Next.js
Golang
.NET
PostgreSQL
MS SQL
Git
Docker
```

Use appropriate icons if already available.

Avoid unnecessary skill progress bars.

---

# 16. Services Section

Create modern service cards.

Examples:

```text
01 — FULL STACK DEVELOPMENT

02 — WEB APPLICATION DEVELOPMENT

03 — API DEVELOPMENT

04 — DATABASE & SYSTEM DESIGN
```

Each card can contain:

- Icon
- Title
- Description
- Technologies
- Optional CTA

Use subtle hover interactions.

---

# 17. Experience Section

Use a modern timeline.

Example:

```text
2025 — Present

Full Stack Developer

Company

Description
Technologies
Achievements
```

Make the timeline responsive.

---

# 18. Process Section

Create a visual workflow such as:

```text
01 — DISCOVER
02 — PLAN
03 — DESIGN
04 — DEVELOP
05 — TEST
06 — DEPLOY
```

Use subtle connecting lines and indicators.

Keep it elegant and readable.

---

# 19. Contact Section

Create a strong final CTA.

Example:

```text
Have a project in mind?

Let's build something meaningful together.

Email
LinkedIn
GitHub

Contact Form
```

Contact form fields:

```text
Name
Email
Subject
Message
Submit
```

Implement proper validation and feedback states.

---

# 20. Footer

Create a minimal premium footer containing:

- Logo/name
- Navigation
- Social links
- Copyright
- Privacy/Terms if applicable

---

# 21. Dashboard Redesign

The dashboard must use the same visual language.

Transform the existing dashboard into a premium modern CMS/admin interface.

Suggested structure:

```text
Sidebar

Dashboard
Projects
Experience
Skills
Services
Testimonials
Messages
Settings

Topbar

Search
Notifications
Profile

Main Content

Overview
Statistics
Recent Activity
Recent Projects
```

---

# 22. Sidebar

Use a modern surface/glass sidebar.

Characteristics:

- Burgundy active state
- Rounded active navigation item
- Minimal icons
- Subtle hover
- Clear active state
- Collapsible desktop behavior if appropriate
- Mobile drawer

Example:

```text
LOGO

Overview

Portfolio
  Projects
  Experience
  Skills
  Services

Content
  Testimonials
  Messages

System
  Settings
```

Active items should have a subtle burgundy highlight/glow.

---

# 23. Dashboard Overview

Create useful statistic cards.

Examples:

```text
Total Projects
24

Experience
3+ Years

Technologies
15+

Messages
12
```

Cards may include:

- Large number
- Label
- Icon
- Optional trend indicator

Only use charts when they provide meaningful information.

---

# 24. CRUD Dashboard

Every CRUD page must use the new design system.

Do NOT leave them as generic admin tables.

Suggested structure:

```text
Page Header
Title
Description
Add New button

Search
Filters
Sort

Data Table

Actions:
View
Edit
Delete

Pagination
```

---

# 25. CRUD Tables

Tables should be modern but highly usable.

Include:

- Clear headers
- Row hover
- Status badges where appropriate
- Compact action controls
- Pagination
- Search/filter controls
- Responsive behavior

On mobile, use either:

- Horizontal scrolling
- Responsive cards
- Collapsible row details

depending on the data.

Do not sacrifice usability for visual effects.

---

# 26. Create / Edit Forms

All forms must use the same design system.

Use:

- Proper labels
- Helpful descriptions
- Validation
- Burgundy focus states
- Error states
- Loading states
- Success feedback
- Responsive layout

Example:

```text
Create Project

Project Information

Project Name
Description
Category
Technologies
Project Image
Live URL
GitHub URL

[Cancel] [Create Project]
```

---

# 27. Delete Confirmation

Use a proper dialog instead of browser-native confirmation.

Example:

```text
Delete Project?

This action cannot be undone.

[Cancel]
[Delete]
```

Use appropriate danger styling.

---

# 28. Empty States

Every CRUD page should have a meaningful empty state.

Example:

```text
No projects yet.

Start building your portfolio by adding
your first project.

[+ Add Project]
```

Never leave a blank page.

---

# 29. Loading States

Implement:

- Skeleton loaders
- Button loading states
- Table skeletons
- Page-level loading where appropriate

Avoid unnecessary flashy animations.

---

# 30. Error States

Create consistent error UI.

Example:

```text
Something went wrong.

We couldn't load your projects.

[Try Again]
```

Do not expose raw stack traces to users.

---

# 31. Responsive Design

The entire application must work properly across:

```text
320px
375px
390px
414px
768px
1024px
1280px
1440px+
```

Pay special attention to:

- Hero
- Navbar
- Sidebar
- Tables
- Forms
- Cards
- Modals
- Images
- Typography
- Buttons

Do not simply shrink desktop layouts.

Create intentional mobile layouts.

---

# 32. Animation

Use subtle premium animation:

- Fade
- Slide
- Hover lift
- Soft glow
- Image transitions
- Navigation transitions
- Modal transitions

Keep animation approximately within:

```text
150ms – 400ms
```

Avoid:

- Excessive bouncing
- Constant floating
- Heavy parallax
- Distracting particles
- Animating every element

Respect:

```css
prefers-reduced-motion
```

---

# 33. JSON Storage Migration

IMPORTANT:

Remove the database dependency for portfolio/content CRUD data.

Use JSON files as the persistence layer.

Do NOT introduce a new database.

Do not use the following for portfolio/content persistence:

- PostgreSQL
- MySQL
- MongoDB
- SQLite
- Prisma
- Drizzle
- Supabase Database
- Firebase Database

unless an existing unrelated feature genuinely requires one.

---

# 34. JSON Data Structure

Create a dedicated data directory.

Suggested:

```text
/data
  projects.json
  experiences.json
  skills.json
  services.json
  testimonials.json
  messages.json
  profile.json
  settings.json
```

Example project record:

```json
{
  "id": "project-001",
  "title": "Project Name",
  "slug": "project-name",
  "description": "Project description",
  "category": "Web Application",
  "technologies": [
    "React",
    "Golang"
  ],
  "image": "/assets/project-image.png",
  "githubUrl": "",
  "liveUrl": "",
  "featured": true,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

Use appropriate structures for other entities.

---

# 35. JSON CRUD Architecture

Do NOT import JSON into the frontend and mutate it directly.

If the project uses a server-capable framework such as Next.js, use:

- API routes / route handlers
- Server actions
- Server-side filesystem APIs

Architecture:

```text
Frontend
   ↓
API / Server Action
   ↓
JSON Repository / Service
   ↓
/data/*.json
```

Create reusable repository/service functions:

```text
getAll()
getById()
create()
update()
delete()
```

Do not duplicate JSON file manipulation logic across every page.

---

# 36. JSON Repository Requirements

The repository should:

1. Read the JSON file.
2. Parse it safely.
3. Validate incoming data.
4. Perform the requested operation.
5. Write the updated JSON.
6. Handle errors.
7. Preserve valid JSON formatting.
8. Use stable unique IDs.
9. Avoid array indexes as IDs.
10. Avoid unnecessary concurrent writes.

Centralize filesystem access.

Do not scatter direct filesystem writes throughout the UI.

---

# 37. Data Validation

Do not blindly write request payloads into JSON.

Validate:

- Required fields
- String lengths
- URLs
- Arrays
- IDs
- Dates
- Entity-specific fields

Reuse an existing validation library if the project already has one.

---

# 38. Image Handling

Continue using:

```text
/public/assets
```

For JSON records, store only the image path.

Example:

```json
{
  "image": "/assets/project-1.png"
}
```

Do NOT store image binaries/base64 inside JSON.

If an image upload feature already exists, adapt it so:

1. The image file is saved into the appropriate public asset directory.
2. The JSON record stores the resulting path.

---

# 39. Existing Project Audit

Before making changes, inspect the entire repository.

Identify:

- Framework
- Project structure
- All routes
- All pages
- Reusable components
- Current styling
- Theme implementation
- Existing CRUD
- Existing API routes
- Database client
- ORM
- Models/schemas
- Authentication
- Existing assets
- Existing business logic

Do not blindly delete existing code.

Preserve working functionality wherever possible.

---

# 40. Database Cleanup

Find all database-related code:

- Database clients
- ORM configuration
- Models
- Schemas
- Queries
- Repositories
- Migrations
- Seeds
- Environment variables
- Database API endpoints

Replace portfolio/content persistence with JSON.

After migration, remove unused database dependencies/configuration if they are no longer needed.

Do not remove database functionality that is genuinely required by an unrelated feature.

---

# 41. Component Architecture

Create reusable components where appropriate.

Possible structure:

```text
components/
  layout/
    Navbar
    Sidebar
    Footer

  ui/
    Button
    Card
    Badge
    Input
    Dialog
    Table
    Modal
    EmptyState
    Skeleton

  portfolio/
    Hero
    ProjectCard
    ProjectGrid
    Skills
    ExperienceTimeline
    Services
    Contact

  dashboard/
    StatCard
    DashboardHeader
    DataTable
    CrudToolbar
```

Adapt this structure to the existing framework rather than blindly recreating the entire project.

Avoid duplicated components.

---

# 42. Design Tokens

Centralize:

- Colors
- Spacing
- Radius
- Shadows
- Typography
- Transitions

Example conceptual variables:

```text
--background
--surface
--surface-elevated
--primary
--primary-hover
--accent
--border
--text
--text-muted
--danger
--success
```

---

# 43. Accessibility

Maintain good accessibility.

Ensure:

- Sufficient contrast
- Keyboard navigation
- Visible focus indicators
- Proper labels
- Semantic HTML
- Alt text
- Accessible dialogs
- Accessible dropdowns
- Accessible navigation
- Buttons are actual buttons
- Links are actual links

Do not sacrifice accessibility for visual effects.

---

# 44. Performance

Do not add unnecessary dependencies.

Optimize:

- Images
- Fonts
- Animations
- Client-side JavaScript
- Large components

Lazy-load large images where appropriate.

Avoid excessive blur/filter effects that hurt mobile performance.

---

# 45. SEO

Maintain or improve SEO:

- Proper page titles
- Meta descriptions
- Open Graph metadata
- Semantic headings
- Image alt text
- Canonical behavior where relevant

---

# 46. Implementation Order

Follow this order.

## Phase 1 — Audit

Inspect the existing project and understand the architecture.

Do not immediately replace files.

## Phase 2 — Design System

Implement:

- Colors
- Typography
- Dark mode
- Light mode
- Buttons
- Cards
- Inputs
- Tables
- Dialogs
- Badges
- Navigation

## Phase 3 — Public Portfolio

Redesign:

- Navbar
- Hero
- Projects
- About
- Skills
- Services
- Experience
- Contact
- Footer

## Phase 4 — Dashboard

Redesign:

- Sidebar
- Topbar
- Dashboard overview
- Statistics
- Recent activity
- Content management

## Phase 5 — CRUD

Redesign every CRUD:

- List
- Search
- Filter
- Create
- Edit
- Delete
- Detail
- Empty
- Loading
- Error

## Phase 6 — JSON Migration

Move portfolio/content persistence from database to JSON.

Verify:

```text
Create → JSON updated
Read → JSON loaded
Update → JSON updated
Delete → JSON updated
Refresh → data remains
Restart → data remains
```

## Phase 7 — Responsive

Test mobile, tablet, desktop, and large screens.

## Phase 8 — Polish

Fix:

- Spacing
- Typography
- Contrast
- Animations
- Hover states
- Focus states
- Image cropping
- Mobile layout
- Dark/light consistency

---

# 47. Important Agent Behavior

Before coding:

1. Inspect the repository.
2. Understand the current architecture.
3. Inspect all routes/pages.
4. Inspect existing CRUD.
5. Inspect database usage.
6. Inspect `/public/assets`.
7. Then begin implementation.

Do NOT create a separate mock application.

Modify the existing application.

Do NOT replace working functionality unnecessarily.

Do NOT replace real content with lorem ipsum.

Do NOT replace existing assets unnecessarily.

Do NOT stop after implementing the landing page.

Dashboard and ALL CRUD interfaces must receive the same visual redesign.

If something is unclear, prefer the existing project architecture and functionality over introducing unnecessary technologies.

---

# 48. Final Acceptance Criteria

Before considering the task complete, verify:

- [ ] Landing page redesigned
- [ ] Dashboard redesigned
- [ ] ALL CRUD pages redesigned
- [ ] Create/Edit forms redesigned
- [ ] Tables redesigned
- [ ] Modals/dialogs redesigned
- [ ] Sidebar redesigned
- [ ] Navbar/topbar redesigned
- [ ] Mobile UI works
- [ ] Dark mode works
- [ ] Light mode works
- [ ] Burgundy/red identity is consistent
- [ ] Existing `/public/assets` are reused
- [ ] No unnecessary placeholder images
- [ ] CRUD persists to JSON
- [ ] Create works
- [ ] Read works
- [ ] Update works
- [ ] Delete works
- [ ] Data survives refresh
- [ ] Data survives server restart when filesystem is persistent
- [ ] No unnecessary DB dependency remains
- [ ] Existing functionality still works
- [ ] Accessibility checked
- [ ] Responsive layouts checked
- [ ] Loading/empty/error states implemented

---

# 49. Final Goal

Transform the current application into a cohesive:

**Premium futuristic Burgundy Developer Portfolio + Content Management System**

The public side should feel like a high-end personal portfolio.

The admin side should feel like the private CMS behind that portfolio.

Both sides must clearly belong to the same product and use the same Burgundy/Futuristic design system.

The reference image should influence the visual language, but the final UI must be original.

Do not copy the reference literally.

**Start by auditing the existing codebase before making changes.**
