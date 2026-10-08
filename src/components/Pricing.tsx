'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ViewMode } from '../types';

interface PricingProps {
  onNavigate: (view: ViewMode, docId?: string) => void;
  onOpenContact?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <section id="pricing" className="py-24 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-2.5 py-1 rounded bg-[#ecfdf5] text-[#059669] text-[11px] font-semibold tracking-wider uppercase mb-3">
            PRICING
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#0a0a0a] tracking-[-0.03em] leading-tight">
            Simple, message-based pricing.
          </h2>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
          {/* Free Tier */}
          <div className="rounded-[8px] border border-[#e5e5e5] p-7 bg-white flex flex-col justify-between">
            <div>
              <div className="text-[16px] font-semibold text-[#0a0a0a] mb-2">Free</div>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-[36px] font-bold text-[#0a0a0a] tracking-tight">$0</span>
                <span className="text-[#737373] text-[15px]">/ mo</span>
              </div>

              <div className="space-y-3.5 mb-8">
                {[
                  '1 instance',
                  '1,000 messages / mo',
                  '1 PAT',
                  'Community support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[14px] text-[#404040]">
                    <Check className="w-4 h-4 text-[#059669] stroke-[2.5] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-2.5 px-4 rounded-[6px] border border-[#e5e5e5] text-[14px] font-medium text-[#0a0a0a] hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              <span>Start free</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          {/* Pro Tier (Emphasized with 2px border) */}
          <div className="rounded-[8px] border-2 border-[#0a0a0a] p-7 bg-white flex flex-col justify-between relative shadow-xs">
            <div>
              <div className="text-[16px] font-semibold text-[#0a0a0a] mb-2">Pro</div>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-[36px] font-bold text-[#0a0a0a] tracking-tight">$49</span>
                <span className="text-[#737373] text-[15px]">/ mo</span>
              </div>

              <div className="space-y-3.5 mb-8">
                {[
                  '10 instances',
                  '25,000 messages / mo',
                  '10 PATs',
                  'Webhook retries + DLQ',
                  'Priority support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[14px] text-[#404040]">
                    <Check className="w-4 h-4 text-[#059669] stroke-[2.5] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-2.5 px-4 rounded-[6px] bg-[#0a0a0a] text-[14px] font-medium text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              <span>Start trial</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          {/* Scale Tier */}
          <div className="rounded-[8px] border border-[#e5e5e5] p-7 bg-white flex flex-col justify-between">
            <div>
              <div className="text-[16px] font-semibold text-[#0a0a0a] mb-2">Scale</div>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-[36px] font-bold text-[#0a0a0a] tracking-tight">Custom</span>
              </div>

              <div className="space-y-3.5 mb-8">
                {[
                  'Unlimited instances',
                  'Custom message volume',
                  'Unlimited PATs',
                  'SSO, audit log retention, SLA',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[14px] text-[#404040]">
                    <Check className="w-4 h-4 text-[#059669] stroke-[2.5] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (onOpenContact) {
                  onOpenContact();
                } else {
                  alert('Sales inquiry dispatched. Our team will contact you within 2 hours.');
                }
              }}
              className="w-full py-2.5 px-4 rounded-[6px] border border-[#e5e5e5] text-[14px] font-medium text-[#0a0a0a] hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              <span>Contact sales</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Below Tiers Trust Strip */}
        <p className="text-center text-[13px] text-[#737373]">
          All plans include: AES-256 encryption at rest <span className="mx-2 text-[#a3a3a3]">·</span> 99.9% SLA <span className="mx-2 text-[#a3a3a3]">·</span> No vendor lock-in
        </p>
      </div>
    </section>
  );
};
