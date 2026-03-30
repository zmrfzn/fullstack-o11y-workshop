import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import 'primeicons/primeicons.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { path: '/tutorials', icon: 'pi pi-list', label: 'Tutorials' },
    { path: '/add', icon: 'pi pi-plus', label: 'Add Tutorial' },
    { path: '/dashboard', icon: 'pi pi-chart-bar', label: 'Dashboard' },
    { path: '/analytics', icon: 'pi pi-chart-line', label: 'Analytics' }
  ];

  return (
    <div className="app-container slide-in-right">
      {/* Sidebar */}
      <aside className={`sidebar d-flex flex-column ${!isSidebarOpen ? 'd-none' : ''}`}>
        <div className="p-4 d-flex align-items-center border-bottom border-dark border-opacity-25" style={{ height: '70px' }}>
          <img src="https://newrelic.com/themes/custom/erno/assets/mediakit/new_relic_logo_vertical.png" alt="NR Logo" className="logo mr-2" style={{ height: '32px' }} />
          <span className="font-weight-bold ml-2" style={{ color: 'var(--nr-text-primary)', fontSize: '1.2rem' }}>Workshop</span>
        </div>

        <nav className="flex-grow-1 p-3">
          <ul className="nav flex-column gap-2">
            {navItems.map((item) => (
              <li className="nav-item mb-2" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link d-flex align-items-center p-3 rounded hover-lift ${location.pathname === item.path ? 'bg-primary text-white' : 'text-secondary'}`}
                  style={{ transition: 'all 0.2s', ...((location.pathname === item.path) ? { backgroundColor: 'var(--nr-primary)', color: '#fff' } : { color: 'var(--nr-text-secondary)' }) }}
                >
                  <i className={`${item.icon} mr-3`} style={{ fontSize: '1.2rem' }}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-top border-dark border-opacity-25 text-muted small">
          <div>Built with PERN Stack</div>
          <div className="font-weight-bold" style={{ color: 'var(--nr-primary)' }}>Instrumented by New Relic</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content d-flex flex-column">
        {/* Top Header */}
        <header className="px-4 py-3 border-bottom border-dark border-opacity-25 bg-dark d-flex align-items-center justify-content-between" style={{ height: '70px', backgroundColor: 'var(--nr-surface)' }}>
          <h5 className="m-0 text-white font-weight-bold">PERN Stack Application</h5>
          <div className="d-flex align-items-center">
            <span className="badge badge-pill badge-primary mr-3 pulse-glow">Observability Active</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow-1 p-4 overflow-auto fade-in-up" style={{ backgroundColor: 'var(--nr-bg-base)' }}>
          <div className="container-fluid">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
};

export default MainLayout;