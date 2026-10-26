import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-bounce-short">
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-xl shadow-xl text-white ${
          toast.type === 'error'
            ? 'bg-[#ba1a1a]'
            : toast.type === 'info'
            ? 'bg-[#1e293b]'
            : 'bg-[#1c1c19]'
        }`}
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          <span
            className="material-symbols-outlined text-[20px] text-[#fe932c]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <span className="text-[13px] font-medium truncate">{toast.message}</span>
        </div>

        <button
          onClick={dismissToast}
          className="text-white/80 hover:text-white p-1 rounded-full transition-colors ml-2"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};
