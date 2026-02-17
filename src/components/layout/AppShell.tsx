import { NavLink, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
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
  HiOutlineChevronLeft,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserCircle,
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
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          <h1 className="top-header-title">{pageTitle}</h1>
          <div className="top-header-right">
            <HiOutlineMagnifyingGlass size={18} />
            <HiOutlineQuestionMarkCircle size={18} />
            <div className="header-icon-wrapper">
              <HiOutlineBell size={18} />
              <span className="notification-badge">3</span>
            </div>
            <div className="top-header-user" ref={userMenuRef}>
              <button className="user-menu-trigger" onClick={() => setUserMenuOpen((v) => !v)}>
                {!photoError ? (
                  <img className="avatar" src={`${import.meta.env.BASE_URL}ben-photo.jpg`} alt="BK" onError={() => setPhotoError(true)} />
                ) : (
                  <div className="avatar-fallback">BK</div>
                )}
                <span>Ben Klason</span>
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    {!photoError ? (
                      <img className="user-dropdown-photo" src={`${import.meta.env.BASE_URL}ben-photo.jpg`} alt="BK" onError={() => setPhotoError(true)} />
                    ) : (
                      <div className="user-dropdown-photo-fallback">BK</div>
                    )}
                    <div className="user-dropdown-info">
                      <span className="user-dropdown-name">Ben Klason</span>
                      <span className="user-dropdown-email">ben.klason@breezeconnect.com.au</span>
                      <span className="user-dropdown-role">General Manager</span>
                    </div>
                  </div>
                  <div className="user-dropdown-divider" />
                  <button className="user-dropdown-item">
                    <HiOutlineUserCircle size={16} />
                    Profile
                  </button>
                  <button className="user-dropdown-item">
                    <HiOutlineCog6Tooth size={16} />
                    Settings
                  </button>
                  <button className="user-dropdown-item">
                    <HiOutlineBell size={16} />
                    Notifications
                    <span className="user-dropdown-badge">3</span>
                  </button>
                  <div className="user-dropdown-divider" />
                  <button className="user-dropdown-item user-dropdown-item-danger">
                    <HiOutlineArrowRightOnRectangle size={16} />
                    Sign Out
                  </button>
                </div>
              )}
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