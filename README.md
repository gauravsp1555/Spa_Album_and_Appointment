# PHA Salon & Spa Booking System

A state-of-the-art Web Application for managing salon appointments, visualizing 360-degree hair lookbooks, and tracking salon revenue performance analytics.

----

## 🌟 Why This Project Was Created

Traditional salon and spa management tools are often text-heavy and fail to bridge the visual gap between customers and stylists. This project was created to deliver a premium, visual-first customer experience and a robust backend management system for modern Indian salons:

1. **Visual Lookbooks**: Customers can rotate and inspect hair styles in a **360° Studio Viewer** before booking, eliminating guesswork.
2. **Frictionless Bookings**: A streamlined scheduling interface with automated category mapping simplifies reserving slots.
3. **Analytics Dashboard**: Empower salon owners and managers with a real-time data analysis panel to import CSV/Excel transaction records, visualize revenue metrics, evaluate specialist performance, and calculate custom tax metrics.
4. **Premium Dark Theme**: Built with a sleek, premium, glassmorphism-inspired dark user interface designed to match a high-end salon brand.

---

## ⚠️ The Problems Occurring (Before Fixes)

Prior to our optimization pass, the project was suffering from **20 critical ESLint build errors and 20 warning conditions** that completely blocked the production build (`npm run build`). The specific technical issues included:

*   **Synchronous State Cascades**: In `BookAppointmentModal.tsx`, state setters (`setSelectedCategoryId` and `setSelectedSubService`) were being triggered unconditionally inside a `useEffect` on render, violating React rules and causing performance-degrading render loops.
*   **Unescaped JSX Entities**: Random characters (e.g., `'` and `"`) were used directly in raw JSX text across several pages (like `services/page.tsx` and `analytics/page.tsx`), triggering linting errors.
*   **Unsafe Explicit `any` Types**: Catch clauses and CSV parsers used generic `any` annotations (`catch (error: any)`), bypassing TypeScript compiler safety checks.
*   **Dead Code & Unused Imports**: Unused variable assignments (like `radStart1`) and clean imports of icons (like `Sparkles`, `Award`, `Calendar`, and `Download`) were polluting the codebase.
*   **Let-Reassignments Warnings**: Variables modified in-place (like global caching in `mongodb.ts`) were declared with `let` instead of `const`.

---

## 🛠️ The Solution

We implemented clean React and TypeScript solutions to resolve every single build-blocking problem:

1. **State Refactoring via Key Re-mounting**:
    We removed the synchronous `useEffect` hook from the modal. Instead, we configured the parent component (`services/page.tsx`) to supply a unique React `key` to the modal instance:
    ```tsx
    key={`${bookingCatId || ""}-${bookingSubName || ""}-${isBookModalOpen}`}
    ```
    This triggers a native React unmount/remount cycle which safely resets and initializes the modal inputs without cascading renders.
2. **HTML Entity Escaping**:
    Replaced raw quotes and apostrophes in JSX with correct HTML character codes:
    - `'` ➔ `&apos;`
    - `"` ➔ `&quot;`
3. **Type Safety Enhancements**:
    Replaced explicit `any` tags. In `csvParser.ts`, the row mapper was typed precisely:
    ```typescript
    rows: Record<string, string | number>[];
    ```
    Catch clauses were also updated to use TypeScript's standard type assertions (`const err = error as Error`).
4. **Code Cleanups**:
    - Purged all unused icons and unused variables (`radStart1`).
    - Changed `let cached` declarations in MongoDB config to `const`.
    - Wrapped client-side document theme-checking hook in an ESLint ignore statement to preserve valid client-side mounts.

---

## 🚀 Getting Started

### 1. Installation

Clone this repository and run the following command to download all dependencies:

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.example.mongodb.net/your_database
```

### 3. Development Server

Start the local development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 4. Database Seeding

To seed the MongoDB database with initial sample lookbooks, navigate to the seeding endpoint in your browser:
```
http://localhost:3000/api/seed
```

### 5. Production Build

Build the production application bundle and run lint checks:

```bash
# Run lint check
npm run lint

# Compile production bundle
npm run build
```

---

## 💻 Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (Turbopack) & React 19
*   **Database**: [MongoDB](https://www.mongodb.com/) & Mongoose ORM
*   **Styling**: Vanilla CSS & [Tailwind CSS v4](https://tailwindcss.com/)
*   **Visualization**: [Recharts](https://recharts.org/) (for revenue graphs) & [Lucide React](https://lucide.dev/) (for iconography)
*   **Data Parsing**: [PapaParse](https://www.papaparse.com/) & [XLSX](https://sheetjs.com/) (for CSV/Excel imports)
