/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { BrowseView } from './components/BrowseView';
import { BookDetailView } from './components/BookDetailView';
import { TopRatedView } from './components/TopRatedView';
import { AdminView } from './components/AdminView';
import { UserDashboardView } from './components/UserDashboardView';
import { AuthModal } from './components/AuthModal';
import { JavaProjectViewerModal } from './components/JavaProjectViewerModal';
import { Toast } from './components/Toast';

const MainContent: React.FC = () => {
  const { activeTab, currentUser } = useApp();

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto pt-20 pb-24 px-4 sm:px-6">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'browse' && <BrowseView />}
      {activeTab === 'top-rated' && <TopRatedView />}
      {activeTab === 'book-details' && <BookDetailView />}
      {activeTab === 'account' && (
        currentUser?.role === 'ADMIN' ? <AdminView /> : <UserDashboardView />
      )}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#fcf9f4] text-[#1c1c19] selection:bg-[#fe932c]/20 selection:text-[#9b2f00]">
        <Navbar />
        <MainContent />
        <BottomNav />
        <AuthModal />
        <JavaProjectViewerModal />
        <Toast />
      </div>
    </AppProvider>
  );
}
