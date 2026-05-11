# Setif Developers Group (SDG) - System Documentation

## 0x00: Overview
The **Setif Developers Group (SDG)** portal is a high-precision digital environment architected for the student tech community at **Farhat Abbas University Sétif 1 (UFAS 1)**. It serves as an central node for collaboration, academic research in software engineering, and the deployment of innovative student projects.

---

## 0x01: Core Architecture
The platform is built on a modern, reactive stack designed for maximum performance, maintainability, and aesthetic impact.

### Technical Stack
| Layer | Technology | Implementation |
| :--- | :--- | :--- |
| **Core Framework** | React 19 | Component-based UI architecture |
| **Build Engine** | Vite 6 | Lightning-fast HMR and build optimization |
| **Type Safety** | TypeScript | Strict typing for predictable data flow |
| **Styling Engine** | Tailwind CSS | Utility-first design system with custom tokens |
| **Motion/FX** | Framer Motion | Physics-based animations and layout transitions |
| **Iconography** | Lucide React | High-density vector interface icons |

### Key Modules
- **Dynamic Routing**: Managed via `react-router-dom` with support for URL-based state persistence.
- **State Management**: Hybrid approach using React hooks (`useState`, `useEffect`) and URL search parameters for cross-page filtering.
- **Design System**: A custom "Tech-Noir" design language featuring deep blacks (`#000000`), glassmorphism, and a primary accent of **SDG Blue** (`#3b82f6`).

---

## 0x02: Navigation Logic
The system implements a sophisticated navigation architecture tailored for both desktop and mobile environments.

- **URL-Driven Filtering**: The Team page uses `?dept=...` query parameters. This allows for deep linking directly to specific departments from any external source.
- **Responsive Navbar**: 
  - **Desktop**: Hover-based dropdowns with animated underlines and blur backgrounds.
  - **Mobile**: A dedicated side-panel with an always-visible nested navigation structure for rapid access to all club departments.
- **Scroll States**: The navigation header dynamically transitions from transparent to solid black on scroll to maintain legibility across various content backgrounds.

---

## 0x03: Module Breakdown

### `src/pages/`
- **`Home.tsx`**: The landing node. Features a terminal-style code block and animated tech-stack summaries.
- **`Team.tsx`**: The most complex logic module. Manages department filtering, search parameters, and an interactive member profile modal system.
- **`About.tsx`**: Historical archive and mission statement for the SDG collective.
- **`Activities.tsx`**: Operational logs of upcoming and past events.
- **`Registration.tsx`**: A multi-phase onboarding wizard for new student nodes.

### `src/components/`
- **`Navbar.tsx`**: Global navigation controller.
- **`Footer.tsx`**: Secondary navigation and branding anchor.
- **`Layout.tsx`**: Core wrapper ensuring consistent spacing and z-index management across the platform.

---

## 0x04: Deployment & Maintenance

### Initialization
```bash
# Clone the repository
git clone https://github.com/brahimmihoubi/SDG_website_frontend.git

# Install dependencies
npm install

# Start development environment
npm run dev
```

### Production Build
```bash
# Generate optimized assets
npm run build

# Preview production build
npm run preview
```

---

## 0x05: Academic Leadership
The SDG collective operates under the guidance of:

- **Faculty Advisor**: Pr. LAKHFIF ABDELAZIZ
- **Institution**: Farhat Abbas University Sétif 1, Computer Science Department.
- **Mission**: To bridge the gap between academic theory and industrial software application.

---

## 0x06: System License
© 2026 **SETIF DEVELOPERS GROUP (SDG)**. All Rights Reserved.  
Architected for the future of Software Engineering.

<div align="center">
  <code>[ TERMINAL_STATUS ]: OPERATIONAL</code>
</div>
