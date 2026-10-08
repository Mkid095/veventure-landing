import React from 'react';
import { Smartphone, Code2, Webhook, Key, ShieldCheck, TrendingUp } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: Smartphone,
      title: 'Multi-instance',
      description: 'Manage hundreds of WhatsApp numbers from one dashboard.',
    },
    {
      icon: Code2,
      title: 'Canonical REST API',
      description: 'One stable API. No vendor lock-in.',
    },
    {
      icon: Webhook,
      title: 'Webhooks with retries',
      description: 'At-least-once delivery, signed payloads, dead-letter queue.',
    },
    {
      icon: Key,
      title: 'Personal Access Tokens',
      description: 'Scope-limited, revocable, audit-logged.',
    },
    {
      icon: ShieldCheck,
      title: 'MCP-native',
      description: 'Connect Claude, Cursor, and any MCP client in two clicks.',
    },
    {
      icon: TrendingUp,
      title: 'Usage-based pricing',
      description: 'Pay per message. Free 1,000 / month.',
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-28 border-b border-[#f0f0f0]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-block px-2.5 py-1 rounded bg-[#ecfdf5] text-[#059669] text-[11px] font-semibold tracking-wider uppercase mb-3">
            FEATURES
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#0a0a0a] tracking-[-0.03em] leading-tight mb-3">
            Everything you need to run WhatsApp at scale.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#737373]">
            Built for engineers. Trusted by product teams.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[8px] border border-[#e5e5e5] bg-white transition-all hover:border-neutral-400 group"
              >
                <div className="mb-5 text-[#059669]">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-[17px] font-semibold text-[#0a0a0a] tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[#737373] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
