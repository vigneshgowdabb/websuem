# App Development Workflows

## Phase 1: Foundation & Setup (Current Phase)
1.  Initialize Next.js project with Tailwind CSS, TypeScript, and shadcn/ui.
2.  Set up Supabase project, initialize Auth and Database schemas.
3.  Configure environment variables and routing structure.
**Checkpoint 1:** Verify local environment, linting, and basic database connection.

## Phase 2: Landing Page Development
1.  Build core UI components (Navbar, Footer, Buttons, Cards).
2.  Develop Hero Section with animations.
3.  Develop Services, About Us, and Contact forms.
4.  Integrate Contact form with the database (Leads table).
**Checkpoint 2:** Review Landing page UI/UX, responsiveness, and form functionality.

## Phase 3: Authentication & Client Portal
1.  Implement Supabase Auth (Login/Signup/Magic Link).
2.  Create protected route logic based on roles (`admin` vs `client`).
3.  Build Client Dashboard layout.
4.  Integrate project tracking timeline and invoice views.
**Checkpoint 3:** User can log in, see their assigned project status, and view placeholder invoices securely.

## Phase 4: Internal CRM
1.  Build Admin layout and sidebar.
2.  Develop Leads dashboard (fetch and update lead status).
3.  Develop Clients & Projects management (CRUD operations).
4.  Develop Invoice management system.
**Checkpoint 4:** Admin can manage the entire lifecycle from a lead to a completed project.

## Phase 5: Polish & Deployment
1.  End-to-end testing of the complete user journey.
2.  Performance profiling (Lighthouse, Core Web Vitals).
3.  Finalize Framer Motion animations.
4.  Deploy to Vercel and configure domain.
**Final Checkpoint:** Production deployment review.