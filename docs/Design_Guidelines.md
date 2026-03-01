# Design Guidelines

## 1. UI/UX Methodology
Using the **UI/UX Pro Max** framework, the design will prioritize a seamless, high-end agency feel. The application will leverage whitespace, typography, and motion to guide the user's attention.

## 2. Core Principles
*   **Minimalism & Focus:** Remove unnecessary borders. Use soft shadows and depth (glassmorphism where appropriate) to create hierarchy.
*   **Micro-interactions:** Use Framer Motion for button hovers, page transitions, and scrolling reveals.
*   **Data Density:** For the CRM and Client Portal, maintain a clean bento-box grid system. Data should be scannable with clear status indicators (e.g., green for Paid, yellow for Pending).

## 3. Components
*   **Buttons:** Soft rounded corners (e.g., `rounded-lg` or `rounded-full`), smooth hover states (scale up 1.05 or slight background color shift).
*   **Cards (Bento Box):** Used extensively for the dashboard. Subtle borders (`border-slate-200/20` in dark mode) with internal padding.
*   **Navigation:** Sticky blurred header for the landing page. Sidebar navigation for the Portal and CRM.
*   **Forms:** Floating labels or clean inline placeholders. Real-time validation feedback.

## 4. Accessibility
*   WCAG AA compliance.
*   High contrast text.
*   Keyboard navigable interfaces, especially for the CRM.