# 🚀 Websuem Web Platform

Websuem is a high-performance, **Next-Gen AI Web Agency** platform built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Supabase**.

## 🏗️ Platform Overview

The platform consists of three integrated interfaces:
1.  **Agency Landing Page**: Immersive, high-conversion landing page for showcasing services (Web Dev, AI Automation, Branding).
2.  **Client Portal**: A secure, project-tracking dashboard where clients can view timelines, invoices, and deliverables.
3.  **Internal Admin CRM**: A comprehensive agency management dashboard for tracking leads, active projects, and revenue.

## 🛠️ Technology Stack

-   **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
-   **UI Library**: lucide-react, react-hot-toast, clsx, tailwind-merge
-   **Backend**: Supabase (PostgreSQL, Auth, RLS)
-   **Email**: Resend API
-   **Orchestration**: Claude Flow (Ruflo v3) for multi-agent coordination

## 🚀 Getting Started

### 1. Prerequisites
-   Node.js 20+
-   npm 10+
-   A Supabase project
-   A Resend API key

### 2. Configuration
Create a `.env.local` file in the root directory and add your credentials (see `.env.local.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
RESEND_API_KEY=your_resend_api_key
```

### 3. Database Setup
Copy the contents of `supabase/schema.sql` and run it in your **Supabase SQL Editor**. This will set up the tables, Row Level Security (RLS), and automatic profile triggers.

### 4. Installation
```bash
npm install
```

### 5. Running the App
```bash
npm run dev
```

Visit:
-   **Home**: [http://localhost:3000](http://localhost:3000)
-   **Portal**: [http://localhost:3000/portal](http://localhost:3000/portal)
-   **CRM**: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Project Structure

```text
├── docs/               # PRD, TRD, and Design Guidelines
├── src/
│   ├── app/            # Next.js App Router (Pages & API)
│   ├── components/     # UI, Layout, and Section components
│   ├── lib/            # Shared utilities (Tailwind-merge, etc.)
│   └── utils/          # Supabase client and middleware
├── supabase/           # SQL Schema and migrations
└── CLAUDE.md           # Swarm orchestration guidance
```

## 🛡️ Security
The platform uses **Row Level Security (RLS)** in Supabase to ensure that clients can only access their own data. The **Next.js Middleware** enforces Role-Based Access Control (RBAC) to protect the Admin CRM and Client Portal routes.

---
Built with ❤️ by **Websuem AI Agency**.
