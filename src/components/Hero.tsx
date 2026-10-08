import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Terminal } from 'lucide-react';
import { ViewMode } from '../types';

interface HeroProps {
  onNavigate: (view: ViewMode, docId?: string) => void;
}

const HERO_CODE = `# list your WhatsApp instances
curl https://api.viventure.dev/v1/instances \\
  -H "Authorization: Bearer YOUR_PAT"

# send a message
curl -X POST https://api.viventure.dev/v1/instances/inst_abc/messages/send \\
  -H "Authorization: Bearer YOUR_PAT" \\
  -d '{"to":"+12025550100","content":{"type":"text","text":"Hello"}}'`;

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(HERO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column (60% width on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="text-[12px] font-semibold text-[#737373] tracking-[0.08em] uppercase mb-4">
              WHATSAPP BUSINESS API
            </div>

            {/* H1 */}
            <h1 className="text-[40px] sm:text-[54px] lg:text-[62px] font-semibold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mb-6 text-balance">
              Ship WhatsApp products without managing infrastructure.
            </h1>

            {/* Subhead */}
            <p className="text-[17px] sm:text-[18px] text-[#737373] leading-[1.6] max-w-[580px] mb-8 font-normal">
              Viventure gives you instances, messaging, webhooks, and an MCP-native developer experience — all behind one canonical REST API.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <button
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] text-white text-[15px] font-medium rounded-[6px] hover:bg-neutral-800 transition-colors cursor-pointer active:scale-[0.98]"
              >
                <span>Start free</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>

              <button
                onClick={() => onNavigate('docs')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#0a0a0a] text-[15px] font-medium rounded-[6px] border border-[#e5e5e5] hover:bg-neutral-50 transition-colors cursor-pointer active:scale-[0.98]"
              >
                <span>Read the docs</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>

            {/* Trust strip */}
            <div className="text-[13px] text-[#737373] flex items-center gap-2">
              <span>No credit card required</span>
              <span className="text-[#a3a3a3]">·</span>
              <span>1,000 free messages / month</span>
            </div>
          </div>

          {/* Right Column (40% width on lg): Terminal Code block */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-[8px] border border-[#262626] bg-[#0c1015] overflow-hidden shadow-xs">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d] bg-[#0c1015]">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Terminal className="w-4 h-4 text-neutral-400 stroke-[1.5]" />
                  <span className="font-mono text-xs text-neutral-300">terminal</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded hover:bg-neutral-800"
                  title="Copy snippet"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2]" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal code content */}
              <div className="p-4 sm:p-5 font-mono text-[13px] leading-[1.65] text-neutral-200 overflow-x-auto whitespace-pre selection:bg-neutral-700">
                <span className="text-neutral-500"># list your WhatsApp instances</span>
                {'\n'}
                <span className="text-neutral-100">curl https://api.viventure.dev/v1/instances \</span>
                {'\n'}
                <span className="text-neutral-100">  -H "Authorization: Bearer YOUR_PAT"</span>
                {'\n\n'}
                <span className="text-neutral-500"># send a message</span>
                {'\n'}
                <span className="text-neutral-100">curl -X POST https://api.viventure.dev/v1/instances/inst_abc/messages/send \</span>
                {'\n'}
                <span className="text-neutral-100">  -H "Authorization: Bearer YOUR_PAT" \</span>
                {'\n'}
                <span className="text-neutral-100">  -d &#39;&#123;&quot;to&quot;:&quot;+12025550100&quot;,&quot;content&quot;:&#123;&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;Hello&quot;&#125;&#125;&#39;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
