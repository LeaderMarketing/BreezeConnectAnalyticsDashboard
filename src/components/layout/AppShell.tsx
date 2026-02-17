import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  HiOutlineChartBarSquare,
  HiOutlineArrowTrendingDown,
  HiOutlineUserGroup,
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineSquares2X2,
  HiOutlineBuildingOffice2,
  HiOutlineDocumentChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineQuestionMarkCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineBars3,
  HiOutlineChevronLeft,
} from 'react-icons/hi2'

interface AppShellProps {
  children: React.ReactNode
}

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'nav-link active' : 'nav-link')

const pageTitles: Record<string, string> = {
  '/': 'Executive Overview',
  '/churn': 'Churn Analysis',
  '/am-performance': 'AM Performance',
}

export const AppShell = ({ children }: AppShellProps) => {
  const location = useLocation()
  const pageTitle = pageTitles[location.pathname] || 'Dashboard'
  const [photoError, setPhotoError] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={`app-shell ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="BreezeConnect" className="sidebar-logo-full" />
          <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="BreezeConnect" className="sidebar-logo-icon" />
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-label">Analytics</span>
            <NavLink to="/" className={navClass} end>
              <span className="nav-link-icon"><HiOutlineSquares2X2 size={16} /></span>
              <span className="nav-link-text">Dashboard</span>
            </NavLink>
            <NavLink to="/churn" className={navClass}>
              <span className="nav-link-icon"><HiOutlineArrowTrendingDown size={16} /></span>
              <span className="nav-link-text">Churn Analysis</span>
            </NavLink>
            <NavLink to="/am-performance" className={navClass}>
              <span className="nav-link-icon"><HiOutlineUserGroup size={16} /></span>
              <span className="nav-link-text">AM Performance</span>
            </NavLink>
          </div>

          <div className="nav-section">
            <span className="nav-section-label">Reports</span>
            <span className="nav-link" style={{ opacity: 0.45, cursor: 'default' }}>
              <span className="nav-link-icon"><HiOutlineCurrencyDollar size={16} /></span>
              <span className="nav-link-text">Revenue</span>
            </span>
            <span className="nav-link" style={{ opacity: 0.45, cursor: 'default' }}>
              <span className="nav-link-icon"><HiOutlineBuildingOffice2 size={16} /></span>
              <span className="nav-link-text">Partners</span>
            </span>
            <span className="nav-link" style={{ opacity: 0.45, cursor: 'default' }}>
              <span className="nav-link-icon"><HiOutlineDocumentChartBar size={16} /></span>
              <span className="nav-link-text">Billing</span>
            </span>
            <span className="nav-link" style={{ opacity: 0.45, cursor: 'default' }}>
              <span className="nav-link-icon"><HiOutlineChartBarSquare size={16} /></span>
              <span className="nav-link-text">Usage</span>
            </span>
          </div>

          <div className="nav-section">
            <span className="nav-section-label">System</span>
            <span className="nav-link" style={{ opacity: 0.45, cursor: 'default' }}>
              <span className="nav-link-icon"><HiOutlineCog6Tooth size={16} /></span>
              <span className="nav-link-text">Settings</span>
            </span>
          </div>
        </nav>

        <button className="sidebar-collapse-btn" onClick={() => setSidebarOpen((v) => !v)} title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}>
          <HiOutlineChevronLeft size={14} className="sidebar-collapse-icon" />
        </button>

        <div className="sidebar-footer">
          Concept Demo by{' '}
          <a href="mailto:john.cardenas@leadersystems.com.au" className="sidebar-footer-link">John Cardenas</a>
          {' '}&middot; Dummy Data
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen((v) => !v)} title="Toggle sidebar">
              <HiOutlineBars3 size={18} />
            </button>
            <h1 className="top-header-title">{pageTitle}</h1>
          </div>
          <div className="top-header-right">
            <HiOutlineMagnifyingGlass size={18} />
            <HiOutlineQuestionMarkCircle size={18} />
            <HiOutlineBell size={18} />
            <div className="top-header-user">
              {!photoError ? (
                <img className="avatar" src={`${import.meta.env.BASE_URL}ben-photo.jpg`} alt="BK" onError={() => setPhotoError(true)} />
              ) : (
                <div className="avatar-fallback">BK</div>
              )}
              <span>Ben Klason</span>
            </div>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}