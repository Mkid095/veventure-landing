import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, ArrowRight, BookOpen, LayoutDashboard, Home } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, docId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] transition-all">
      <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
        {/* Left: wordmark Viventure */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('landing')}
            className="text-[20px] font-semibold tracking-tight text-[#0a0a0a] hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
          >
            <span>Viventure</span>
          </button>

          {/* Quick view switcher pills */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-neutral-100 rounded-md text-xs font-medium text-neutral-600">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                currentView === 'landing' ? 'bg-white text-[#0a0a0a] shadow-xs' : 'hover:text-[#0a0a0a]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Landing</span>
            </button>
            <button
              onClick={() => onNavigate('docs')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                currentView === 'docs' ? 'bg-white text-[#0a0a0a] shadow-xs' : 'hover:text-[#0a0a0a]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs (/docs)</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                currentView === 'dashboard' ? 'bg-white text-[#0a0a0a] shadow-xs' : 'hover:text-[#0a0a0a]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard Demo</span>
            </button>
          </div>
        </div>

        {/* Right Desktop Nav (5 items per spec) */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] text-[#737373] font-medium">
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('developers')}
            className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
          >
            Developers
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
          >
            Pricing
          </button>
          <button
            onClick={() => onNavigate('docs')}
            className="flex items-center gap-1 hover:text-[#0a0a0a] transition-colors cursor-pointer"
          >
            <span>Docs</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 bg-[#0a0a0a] text-white text-[13px] font-medium rounded-[6px] hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Log in</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0a0a0a] hover:bg-neutral-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e5e5e5] bg-white px-6 py-4 flex flex-col gap-3 text-sm font-medium animate-fadeIn">
          <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-md text-xs mb-2">
            <button
              onClick={() => {
                onNavigate('landing');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-center rounded ${currentView === 'landing' ? 'bg-white font-semibold text-black' : 'text-neutral-600'}`}
            >
              Landing
            </button>
            <button
              onClick={() => {
                onNavigate('docs');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-center rounded ${currentView === 'docs' ? 'bg-white font-semibold text-black' : 'text-neutral-600'}`}
            >
              Docs
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-center rounded ${currentView === 'dashboard' ? 'bg-white font-semibold text-black' : 'text-neutral-600'}`}
            >
              Dashboard
            </button>
          </div>
          <button
            onClick={() => handleNavClick('features')}
            className="text-left py-2 text-[#737373] hover:text-[#0a0a0a]"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('developers')}
            className="text-left py-2 text-[#737373] hover:text-[#0a0a0a]"
          >
            Developers
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="text-left py-2 text-[#737373] hover:text-[#0a0a0a]"
          >
            Pricing
          </button>
          <button
            onClick={() => {
              onNavigate('docs');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-[#737373] hover:text-[#0a0a0a] flex items-center justify-between"
          >
            <span>Docs</span>
            <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
          </button>
          <div className="pt-2 border-t border-[#e5e5e5]">
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#0a0a0a] text-white text-center rounded-[6px] font-medium flex items-center justify-center gap-1.5"
            >
              <span>Log in</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
