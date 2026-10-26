import React from 'react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-[#fcf9f4]/95 backdrop-blur-xl border-t border-[#e5e2dd] shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-4 grid grid-cols-4 items-center justify-items-center max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] gap-0.5 transition-colors ${
            activeTab === 'home'
              ? 'text-[#c2410c] font-semibold'
              : 'text-[#59413a] hover:text-[#9b2f00]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">menu_book</span>
          <span className="text-[11px] font-bold tracking-normal">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('browse')}
          className={`flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] gap-0.5 transition-colors ${
            activeTab === 'browse'
              ? 'text-[#c2410c] font-semibold'
              : 'text-[#59413a] hover:text-[#9b2f00]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">explore</span>
          <span className="text-[11px] font-bold tracking-normal">Browse</span>
        </button>

        <button
          onClick={() => setActiveTab('top-rated')}
          className={`flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] gap-0.5 transition-colors ${
            activeTab === 'top-rated'
              ? 'text-[#c2410c] font-semibold'
              : 'text-[#59413a] hover:text-[#9b2f00]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">hotel_class</span>
          <span className="text-[11px] font-bold tracking-normal">Top Rated</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] gap-0.5 transition-colors ${
            activeTab === 'account'
              ? 'text-[#c2410c] font-semibold'
              : 'text-[#59413a] hover:text-[#9b2f00]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">account_circle</span>
          <span className="text-[11px] font-bold tracking-normal">Account</span>
        </button>
      </div>
    </nav>
  );
};
