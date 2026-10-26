import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { showAuthModal, setShowAuthModal, login, register, loginAs } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!showAuthModal) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(email, password);
    if (!success) {
      setErrorMsg('No user record found with this email. Try quick test credentials below.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }
    const success = register(name, email, password, studentId, department);
    if (!success) {
      setErrorMsg('An account with this email already exists in MySQL.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 border border-[#e5e2dd] max-h-[95vh] overflow-y-auto animate-fadeIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b2f00] text-[22px]">
              account_circle
            </span>
            <h2 className="font-serif-title text-xl font-bold text-[#1c1c19]">
              {mode === 'login' ? 'Academic Authentication' : 'Create Student Account'}
            </h2>
          </div>
          <button
            onClick={() => {
              setShowAuthModal(false);
              setErrorMsg('');
            }}
            className="text-[#8d7168] hover:text-[#1c1c19]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex rounded-xl bg-[#f6f3ee] p-1 border border-[#e5e2dd]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-[#1c1c19] shadow-xs' : 'text-[#59413a]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register' ? 'bg-white text-[#1c1c19] shadow-xs' : 'text-[#59413a]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Forms */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#59413a] mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex.chen@university.edu"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#59413a] mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#c2410c] hover:bg-[#9b2f00] text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
            >
              Sign In via LoginServlet
            </button>

            {/* Quick Demo Credentials */}
            <div className="pt-2 border-t border-[#f0ede9]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8d7168] mb-2 text-center">
                Or Quick Login (Mini Project Demo Accounts)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    loginAs(2);
                    setShowAuthModal(false);
                  }}
                  className="p-2 rounded-lg bg-[#f6f3ee] hover:bg-[#ebe8e3] text-left border border-[#e5e2dd] transition-colors"
                >
                  <p className="font-semibold text-xs text-[#1c1c19] truncate">Alex Chen</p>
                  <p className="text-[10px] text-[#8d7168]">CS Student</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    loginAs(3);
                    setShowAuthModal(false);
                  }}
                  className="p-2 rounded-lg bg-[#f6f3ee] hover:bg-[#ebe8e3] text-left border border-[#e5e2dd] transition-colors"
                >
                  <p className="font-semibold text-xs text-[#1c1c19] truncate">Prof. David</p>
                  <p className="text-[10px] text-[#8d7168]">Faculty</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    loginAs(1);
                    setShowAuthModal(false);
                  }}
                  className="p-2 rounded-lg bg-[#ffdcc3] hover:bg-[#ffb77d] text-left border border-[#fe932c]/30 transition-colors"
                >
                  <p className="font-semibold text-xs text-[#6e3900] truncate">SysAdmin</p>
                  <p className="text-[10px] text-[#6e3900]">Admin Role</p>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#59413a] mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Patel"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#59413a] mb-1">
                University Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya.patel@university.edu"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[#59413a] mb-1">Student ID</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="2024-912"
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs focus:outline-none border border-[#e5e2dd]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#59413a] mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Computer Science"
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs focus:outline-none border border-[#e5e2dd]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[#59413a] mb-1">Password *</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs focus:outline-none border border-[#e5e2dd]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#59413a] mb-1">Confirm *</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat pass"
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs focus:outline-none border border-[#e5e2dd]"
                  required
                />
              </div>
            </div>

            <div className="pt-1 text-[11px] text-[#8d7168]">
              Password will be securely hashed with BCrypt (12 rounds) before persisting to MySQL.
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#c2410c] hover:bg-[#9b2f00] text-white text-sm font-semibold rounded-xl shadow-sm transition-all mt-2"
            >
              Complete Registration via RegisterServlet
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
