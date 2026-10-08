import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode, docId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#e5e5e5] bg-white pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Brand */}
          <div>
            <div className="text-[18px] font-semibold text-[#0a0a0a] tracking-tight mb-3">
              Viventure
            </div>
            <p className="text-[14px] text-[#737373] leading-relaxed max-w-[240px]">
              WhatsApp Business API built for developers.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-[14px] font-semibold text-[#0a0a0a] mb-4">Product</h4>
            <ul className="space-y-2.5 text-[14px] text-[#737373]">
              <li>
                <button
                  onClick={() => onNavigate('docs', 'instances')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  Instances
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs', 'mcp-overview')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  MCP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs', 'webhooks')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  Webhooks
                </button>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Developers */}
          <div>
            <h4 className="text-[14px] font-semibold text-[#0a0a0a] mb-4">Developers</h4>
            <ul className="space-y-2.5 text-[14px] text-[#737373]">
              <li>
                <button
                  onClick={() => onNavigate('docs')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  Docs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs', 'mcp-discovery')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  MCP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs', 'messages')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  API reference
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Viventure Status: All 12 regions operational. 0 incidents in last 90 days.')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  Status
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-[14px] font-semibold text-[#0a0a0a] mb-4">Company</h4>
            <ul className="space-y-2.5 text-[14px] text-[#737373]">
              <li>
                <button
                  onClick={() => alert('Viventure Inc. — Developer infrastructure for real-time messaging.')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Viventure Terms of Service — developer privacy and non-abuse policy.')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Viventure Privacy Policy — zero telemetry, zero message retention beyond delivery.')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Contact: support@viventure.dev or engineering@viventure.dev')}
                  className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#737373]">
          <div>
            © 2026 Viventure. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block animate-pulse"></span>
            <span className="text-[#525252] font-medium">Status: operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
