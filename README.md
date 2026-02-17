# BreezeConnect Analytics Dashboard

> **Status: Interactive Prototype / Concept Demo**
> All data shown is **dummy / illustrative only** — no live systems are connected.

A high-fidelity reporting dashboard concept for BreezeConnect (Leader Computers' telco division), designed to visualise sales KPIs, churn analysis, and Account Manager performance using data from the PortaOne billing platform.

**Live demo:** [https://leadermarketing.github.io/BreezeConnectAnalyticsDashboard/](https://leadermarketing.github.io/BreezeConnectAnalyticsDashboard/)

---

## What's in the Demo

| Page                   | What it shows                                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Executive Overview** | Revenue trend (18-month), KPI cards (MRR, active services, ARPU, churn rate), product mix bar chart, state share donut, top partners table, top plans, AM/state/product champions |
| **Churn Analysis**     | Churned accounts table with filters by period (1M / 3M / 6M), reason breakdown donut, revenue-at-risk KPIs, churn by product and state                                            |
| **AM Performance**     | Account Manager rankings with quota attainment, new wins, revenue contribution, progress bars, and individual AM drill-down                                                       |

### Key UI Features

- PortaOne-style **collapsible left sidebar** (chevron toggle)
- Interactive **tab bars, period switches, toggles**
- Product-specific icons (SIP = phone, NBN = globe, Fibre = lightning, Teams = mic, SMS = chat)
- Clickable **user profile dropdown** (Profile, Settings, Notifications, Sign Out)
- Responsive layout with smooth CSS transitions
- BreezeConnect branding (logo, colours, Inter typeface)

### Data Scope (Dummy)

- **States:** NSW, VIC, QLD, WA, SA
- **Products:** SIP Trunking, NBN, Fibre, Microsoft Teams Calling, SMS
- **Account Managers:** 15 real AM names used with fictitious performance data
- **Partners:** 25 sample partner companies
- **Revenue Trend:** 18 months of generated data (Jul 2024 – Dec 2025)

---

## Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Framework  | React 19 + TypeScript         |
| Build tool | Vite 7                        |
| Charting   | Recharts                      |
| Icons      | react-icons (Heroicons v2)    |
| Routing    | react-router-dom (HashRouter) |
| Hosting    | GitHub Pages (gh-pages)       |

No backend or database — all data lives in `src/data/mockData.ts`.

---

## Running Locally

```bash
# Clone
git clone https://github.com/LeaderMarketing/BreezeConnectAnalyticsDashboard.git
cd BreezeConnectAnalyticsDashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deploying Updates

```bash
# Build production bundle
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist
```

The site will be live at the GitHub Pages URL within 1–2 minutes.

---

## What's Needed to Move to Real Data

To transition this from a static prototype to a live, production dashboard pulling real data from PortaOne and internal systems, the following would be required:

### 1. Data Source / API Layer

- **PortaOne API integration** — connect to the PortaOne billing platform REST API to pull live customer, service, billing, and CDR data.
- **Backend service** (e.g. Node.js / Python / .NET) to act as a middleware layer that:
  - Authenticates with PortaOne
  - Queries and aggregates raw data into dashboard-ready shapes (monthly revenue, churn lists, AM quotas, product breakdowns, etc.)
  - Exposes a simple REST or GraphQL API that the React frontend consumes
- **Database** (optional but recommended) — a lightweight data warehouse or cache (e.g. PostgreSQL, BigQuery, or even a scheduled JSON export) to avoid hitting PortaOne on every page load and to enable historical trend storage.

### 2. Authentication & Access Control

- **SSO / login** — integrate with the company's identity provider (Azure AD, Google Workspace, etc.) so only authorised staff can access the dashboard.
- **Role-based access** — e.g. AMs see only their own data, managers see everything.

### 3. Data Mapping

- Map PortaOne entities (customers, accounts, products, i_customer, etc.) to the dashboard's concept of:
  - **Products** (SIP, NBN, Fibre, Teams, SMS)
  - **States** (derive from customer address or service location)
  - **Account Managers** (from CRM or a mapping table)
  - **Partners / Resellers** (from PortaOne reseller hierarchy)
- Define **churn logic** — what constitutes a churned account? (e.g. service terminated, zero usage for X months, account status change)
- Define **quota / target data** — where do AM targets live? (CRM, spreadsheet, or a new admin interface)

### 4. Scheduling & Refresh

- Decide refresh cadence — real-time, hourly, daily?
- Implement a **data pipeline** (cron job, Azure Function, AWS Lambda) that periodically pulls from PortaOne, transforms, and stores aggregated metrics.

### 5. Infrastructure

- **Hosting** — move from GitHub Pages to a proper environment (Azure App Service, AWS, Vercel, internal server) that can serve both the frontend and the API.
- **CI/CD** — automated build + deploy pipeline (GitHub Actions, Azure DevOps).
- **Monitoring** — error tracking, uptime checks, log aggregation.

### 6. Additional Features (Future Scope)

- Date range pickers with real historical data
- Export to PDF / Excel
- Drill-down to individual customer detail
- Alerting / notifications (e.g. churn risk triggers)
- Comparison periods (month-on-month, year-on-year)
- Mobile-responsive views

---

## Project Structure

```
dashboard-mockup/
├── public/                  # Static assets (logos, favicon, photos)
├── src/
│   ├── components/
│   │   ├── charts/          # RevenueTrendChart, ProductBarChart, StateShareChart
│   │   ├── filters/         # GlobalFilters (state, product, period)
│   │   ├── layout/          # AppShell (sidebar + header + routing shell)
│   │   └── ui/              # KpiCard, Panel, SimpleTable, ProductIcon
│   ├── data/
│   │   └── mockData.ts      # All dummy data (replace with API calls)
│   ├── pages/
│   │   ├── DashboardOverview.tsx
│   │   ├── ChurnDetail.tsx
│   │   └── AMPerformanceDetail.tsx
│   ├── styles/
│   │   ├── tokens.css       # Design tokens (colours, spacing, radii)
│   │   └── global.css       # All component & layout styles
│   ├── types/
│   │   └── dashboard.ts     # TypeScript interfaces
│   └── utils/
│       └── format.ts        # Number/currency formatting helpers
├── index.html
├── vite.config.ts
└── package.json
```

---

## Credits

Concept demo designed and built by **John Cardenas** — [john.cardenas@leadersystems.com.au](mailto:john.cardenas@leadersystems.com.au)

Built for **BreezeConnect** (Leader Computers Pty Ltd).
