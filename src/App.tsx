/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustLogos } from './components/TrustLogos';
import { Features } from './components/Features';
import { McpSection } from './components/McpSection';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { PublicDocs } from './components/PublicDocs';
import { DashboardView } from './components/DashboardView';
import { ViewMode } from './types';
import { Check, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [activeDocId, setActiveDocId] = useState<string>('introduction');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [salesEmail, setSalesEmail] = useState('');

  // Handle URL hash and back-forward navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#docs') {
        setCurrentView('docs');
      } else if (hash === '#dashboard') {
        setCurrentView('dashboard');
      } else if (hash.startsWith('#docs/')) {
        const docId = hash.replace('#docs/', '');
        setCurrentView('docs');
        setActiveDocId(docId);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: ViewMode, docId?: string) => {
    setCurrentView(view);
    if (docId) {
      setActiveDocId(docId);
      window.location.hash = `docs/${docId}`;
    } else if (view === 'docs') {
      window.location.hash = 'docs';
    } else if (view === 'dashboard') {
      window.location.hash = 'dashboard';
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salesEmail.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactModalOpen(false);
      setSalesEmail('');
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] flex flex-col font-sans selection:bg-neutral-200">
      {/* View routing: Public Docs portal */}
      {currentView === 'docs' && (
        <PublicDocs
          initialDocId={activeDocId}
          onNavigate={handleNavigate}
        />
      )}

      {/* View routing: Dashboard & Token Manager */}
      {currentView === 'dashboard' && (
        <DashboardView onNavigate={handleNavigate} />
      )}

      {/* View routing: Landing Page (exact match to spec & screenshot) */}
      {currentView === 'landing' && (
        <div className="flex-1 flex flex-col">
          {/* Top Nav (sticky 64px) */}
          <Navbar currentView={currentView} onNavigate={handleNavigate} />

          {/* Hero Section */}
          <main className="flex-1">
            <Hero onNavigate={handleNavigate} />

            {/* Logos / Trust Strip */}
            <TrustLogos />

            {/* Features 3x2 Grid */}
            <Features />

            {/* Developer Experience / MCP Section */}
            <McpSection onNavigate={handleNavigate} />

            {/* Pricing Section */}
            <Pricing
              onNavigate={handleNavigate}
              onOpenContact={() => setContactModalOpen(true)}
            />
          </main>

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />
        </div>
      )}

      {/* Sales Inquiry Modal for Scale tier */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-[8px] border border-[#e5e5e5] max-w-md w-full p-6 shadow-xl relative">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-1">
              Contact Enterprise Sales
            </h3>
            <p className="text-xs text-[#737373] mb-5">
              Discuss custom WhatsApp instance volumes, high-throughput dedicated nodes, and SLAs.
            </p>

            {contactSubmitted ? (
              <div className="py-6 text-center text-emerald-600 space-y-2">
                <Check className="w-8 h-8 mx-auto" />
                <div className="font-semibold text-sm">Inquiry Received</div>
                <div className="text-xs text-neutral-600">
                  A solutions engineer will reach out to your team within 2 hours.
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={salesEmail}
                    onChange={(e) => setSalesEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-[6px] focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Estimated Monthly Messages
                  </label>
                  <select className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-[6px] bg-white">
                    <option>50,000 – 250,000 messages / mo</option>
                    <option>250,000 – 1,000,000 messages / mo</option>
                    <option>1,000,000+ messages / mo</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(false)}
                    className="px-3.5 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0a0a0a] text-white text-xs font-medium rounded-[6px] hover:bg-neutral-800"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
