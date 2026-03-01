# Technical Requirements Document (TRD)

## 1. Technology Stack
*   **Frontend Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **UI Components:** shadcn/ui (Radix UI + Tailwind)
*   **Backend & Database:** Supabase (PostgreSQL)
*   **Authentication:** Supabase Auth (Role-based access)
*   **Hosting/Deployment:** Vercel

## 2. Architecture Overview
The application will be a monolithic Next.js repository using the App Router for server-side rendering (SSR) and SEO optimization for the landing page, and client-side interactivity for the portals.

### 2.1 Routing Structure
*   `/` - Landing Page
*   `/services`, `/about`, `/contact` - Marketing Pages
*   `/portal/*` - Client Portal (Protected Route, requires `client` role)
*   `/admin/*` - CRM Dashboard (Protected Route, requires `admin` role)

## 3. Database Schema (High-Level)
*   **Users:** `id`, `email`, `role` (admin, client), `created_at`
*   **Clients:** `id`, `user_id`, `company_name`, `contact_info`
*   **Leads:** `id`, `name`, `email`, `service_requested`, `status`, `message`
*   **Projects:** `id`, `client_id`, `name`, `status` (Discovery, Design, Build, etc.), `start_date`, `end_date`
*   **Invoices:** `id`, `project_id`, `amount`, `status` (Paid, Pending, Overdue), `due_date`, `pdf_url`

## 4. Security & Compliance
*   **Row Level Security (RLS):** Supabase RLS will be implemented to ensure clients can only view their own projects and invoices. Admins will have global read/write access.
*   **Input Validation:** Zod for schema validation on all forms and API routes.
*   **Environment Variables:** Strict separation of public and private keys using `.env.local`.