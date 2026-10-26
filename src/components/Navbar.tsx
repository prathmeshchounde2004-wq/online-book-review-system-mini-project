import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    setShowAuthModal,
    setShowJavaModal,
    loginAs,
    logout,
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getSubtext = () => {
    switch (activeTab) {
      case 'home':
        return 'Home';
      case 'browse':
        return 'Browse';
      case 'top-rated':
        return 'Top Rated';
      case 'account':
        return currentUser?.role === 'ADMIN' ? 'Admin Panel' : 'Account';
      case 'book-details':
        return 'Book Detail';
      default:
        return 'Catalogue';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#fcf9f4]/95 backdrop-blur-xl border-b border-[#e5e2dd] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div
          className="flex items-center gap-2.5 cursor-pointer min-w-0"
          onClick={() => setActiveTab('home')}
        >
          <img
            alt="BookReview Logo"
            className="h-8 w-auto object-contain shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XhwrMiTrKGP82BfNUuF145yi-LG_Cnt5u3bS2Ec9wma5yrA4IDX-OLwzk3K0vwJGCpedGL-ZYF0Y7l4y--rOH1zZ7PUWOTx5pPryn5RyRc5cAVaEn2opL-cp-lDdA2RLSi3KyjkB_uSASQKFU8jFLRbVZ8TmMpKx7xnICZize59r4flqGapgpDJ47DuSpw4KUyITtGx2bJ2DrVnWS2gwELZBek7tcDFJ8gJwUwsI25dNF4N6YB9op70A_J"
            onError={(e) => {
              // Graceful SVG fallback if network is hermetic
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-serif-title text-[20px] font-bold text-[#1c1c19] tracking-tight truncate leading-none">
              BookReview
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8d7168] truncate">
              {getSubtext()}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#59413a]">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-[#9b2f00] ${
              activeTab === 'home' ? 'text-[#9b2f00] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`transition-colors hover:text-[#9b2f00] ${
              activeTab === 'browse' ? 'text-[#9b2f00] font-semibold' : ''
            }`}
          >
            Browse Books
          </button>
          <button
            onClick={() => setActiveTab('top-rated')}
            className={`transition-colors hover:text-[#9b2f00] ${
              activeTab === 'top-rated' ? 'text-[#9b2f00] font-semibold' : ''
            }`}
          >
            Top Rated
          </button>
          {currentUser?.role === 'ADMIN' && (
            <button
              onClick={() => setActiveTab('account')}
              className={`transition-colors hover:text-[#9b2f00] flex items-center gap-1 ${
                activeTab === 'account' ? 'text-[#9b2f00] font-semibold' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span>Admin Dashboard</span>
            </button>
          )}
          {currentUser && currentUser.role !== 'ADMIN' && (
            <button
              onClick={() => setActiveTab('account')}
              className={`transition-colors hover:text-[#9b2f00] ${
                activeTab === 'account' ? 'text-[#9b2f00] font-semibold' : ''
              }`}
            >
              My Reviews
            </button>
          )}
        </nav>

        {/* Header Right Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Advanced Java Capstone Project Viewer button */}
          <button
            onClick={() => setShowJavaModal(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#fe932c]/15 hover:bg-[#fe932c]/25 text-[#9b2f00] text-[12px] sm:text-[13px] font-semibold transition-all border border-[#fe932c]/30 shadow-xs"
            title="Inspect Advanced Java Project Architecture, Servlets, JSP, MySQL Schema & Eclipse Setup"
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span className="hidden sm:inline">AJP Java Project</span>
            <span className="sm:hidden">Java Code</span>
          </button>

          {/* Quick Browse button */}
          <button
            aria-label="Search Catalogue"
            onClick={() => setActiveTab('browse')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#59413a] hover:text-[#9b2f00] hover:bg-[#ebe8e3] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* User Account / Role Badge */}
          <div className="relative">
            {currentUser ? (
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-[#ebe8e3] transition-colors"
                title={`${currentUser.name} (${currentUser.role})`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shadow-xs ${
                    currentUser.role === 'ADMIN'
                      ? 'bg-[#9b2f00]'
                      : currentUser.role === 'FACULTY'
                      ? 'bg-[#4a5569]'
                      : 'bg-[#c2410c]'
                  }`}
                >
                  {currentUser.avatarInitials}
                </div>
                <span className="hidden lg:inline text-[13px] font-medium text-[#1c1c19] max-w-[100px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#8d7168]">
                  expand_more
                </span>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#c2410c] hover:bg-[#9b2f00] text-white text-[13px] font-semibold shadow-sm transition-all"
              >
                Log In
              </button>
            )}

            {/* User switch dropdown menu */}
            {showUserDropdown && currentUser && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl bg-white p-3 shadow-xl border border-[#e5e2dd] z-50 text-[13px]"
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <div className="pb-2 mb-2 border-b border-[#e5e2dd]">
                  <p className="font-semibold text-[#1c1c19] truncate">{currentUser.name}</p>
                  <p className="text-[11px] text-[#8d7168] truncate">{currentUser.email}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      currentUser.role === 'ADMIN'
                        ? 'bg-[#ffece7] text-[#9b2f00]'
                        : currentUser.role === 'FACULTY'
                        ? 'bg-[#d8e3fb] text-[#111c2d]'
                        : 'bg-[#f0ede9] text-[#59413a]'
                    }`}
                  >
                    Role: {currentUser.role}
                  </span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab('account');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f6f3ee] text-[#1c1c19] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#8d7168]">
                      {currentUser.role === 'ADMIN' ? 'admin_panel_settings' : 'dashboard'}
                    </span>
                    <span>
                      {currentUser.role === 'ADMIN' ? 'Admin Control Panel' : 'My User Dashboard'}
                    </span>
                  </button>

                  <div className="pt-1 border-t border-[#f0ede9]">
                    <p className="text-[10px] font-bold uppercase text-[#8d7168] px-2 py-1">
                      Switch Role (Demo Mode)
                    </p>
                    <button
                      onClick={() => {
                        loginAs(1);
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#f6f3ee] text-[12px] flex items-center justify-between"
                    >
                      <span>Admin SysAdmin</span>
                      {currentUser.id === 1 && (
                        <span className="text-[#9b2f00] font-bold">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        loginAs(2);
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#f6f3ee] text-[12px] flex items-center justify-between"
                    >
                      <span>Student (Alex Chen)</span>
                      {currentUser.id === 2 && (
                        <span className="text-[#9b2f00] font-bold">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        loginAs(3);
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-2.5 py-1 rounded-md hover:bg-[#f6f3ee] text-[12px] flex items-center justify-between"
                    >
                      <span>Faculty (Prof. David K.)</span>
                      {currentUser.id === 3 && (
                        <span className="text-[#9b2f00] font-bold">✓</span>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#f0ede9]">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#ffdad6] text-[#ba1a1a] flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Log Out Session</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
