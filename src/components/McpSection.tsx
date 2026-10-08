'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Copy, FileCode2 } from 'lucide-react';
import { ViewMode } from '../types';

interface McpSectionProps {
  onNavigate: (view: ViewMode, docId?: string) => void;
}

const MCP_CODE = `// Step 1 — discover categories
POST /v1/platform/mcp/invoke
{
  "tool": "list_categories"
}

// Step 2 — get tools for a category
POST /v1/platform/mcp/invoke
{
  "tool": "list_tools",
  "parameters": {
    "category": "messages"
  }
}

// Step 3 — invoke a tool
POST /v1/platform/mcp/invoke
{
  "tool": "send_message",
  "parameters": {
    "instanceId": "inst_abc",
    "to": "+12025550100",
    "text": "Hello from MCP"
  }
}`;

export const McpSection: React.FC<McpSectionProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MCP_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const points = [
    {
      title: 'Categorical discovery.',
      description: 'List categories first, fetch tool schemas per category. No more 30-tool dumps.',
    },
    {
      title: 'Scope-checked PATs.',
      description:
        'Personal Access Tokens carry scopes (messages:send, instances:read, …) and the gateway enforces them before execution.',
    },
    {
      title: 'JSON-RPC 2.0 over HTTPS.',
      description:
        'Plain HTTP, plain JSON, plain auth. No WebSocket, no protocol upgrade, no nonsense.',
    },
  ];

  return (
    <section id="developers" className="py-24 sm:py-28 border-b border-[#f0f0f0]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-block px-2.5 py-1 rounded bg-[#ecfdf5] text-[#059669] text-[11px] font-semibold tracking-wider uppercase mb-3">
              DEVELOPER EXPERIENCE
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#0a0a0a] tracking-[-0.03em] leading-tight mb-8">
              Built for the Model Context Protocol.
            </h2>

            <div className="flex flex-col gap-6 mb-10 w-full">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0a0a0a] text-[15px] sm:text-[16px] mr-1.5">
                      {point.title}
                    </span>
                    <span className="text-[#737373] text-[15px] sm:text-[16px] leading-relaxed">
                      {point.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('docs', 'mcp-overview')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] text-white text-[14px] font-medium rounded-[6px] hover:bg-neutral-800 transition-colors cursor-pointer active:scale-[0.98]"
            >
              <span>Read the MCP docs</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>

          {/* Right Column: Code block */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-[8px] border border-[#262626] bg-[#0c1015] overflow-hidden shadow-xs">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d] bg-[#0c1015]">
                <div className="flex items-center gap-2 text-neutral-400">
                  <FileCode2 className="w-4 h-4 text-neutral-400 stroke-[1.5]" />
                  <span className="font-mono text-xs text-neutral-300">mcp-requests.json</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded hover:bg-neutral-800"
                  title="Copy JSON-RPC"
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

              {/* Code */}
              <div className="p-4 sm:p-5 font-mono text-[13px] leading-[1.65] text-neutral-200 overflow-x-auto whitespace-pre selection:bg-neutral-700">
                <span className="text-neutral-500">// Step 1 — discover categories</span>
                {'\n'}
                <span className="text-emerald-400">POST</span> <span className="text-neutral-100">/v1/platform/mcp/invoke</span>
                {'\n'}
                <span className="text-neutral-100">&#123;</span>
                {'\n'}
                <span className="text-neutral-300">  &quot;tool&quot;: </span><span className="text-emerald-300">&quot;list_categories&quot;</span>
                {'\n'}
                <span className="text-neutral-100">&#125;</span>
                {'\n\n'}
                <span className="text-neutral-500">// Step 2 — get tools for a category</span>
                {'\n'}
                <span className="text-emerald-400">POST</span> <span className="text-neutral-100">/v1/platform/mcp/invoke</span>
                {'\n'}
                <span className="text-neutral-100">&#123;</span>
                {'\n'}
                <span className="text-neutral-300">  &quot;tool&quot;: </span><span className="text-emerald-300">&quot;list_tools&quot;</span><span className="text-neutral-300">,</span>
                {'\n'}
                <span className="text-neutral-300">  &quot;parameters&quot;: &#123;</span>
                {'\n'}
                <span className="text-neutral-300">    &quot;category&quot;: </span><span className="text-emerald-300">&quot;messages&quot;</span>
                {'\n'}
                <span className="text-neutral-300">  &#125;</span>
                {'\n'}
                <span className="text-neutral-100">&#125;</span>
                {'\n\n'}
                <span className="text-neutral-500">// Step 3 — invoke a tool</span>
                {'\n'}
                <span className="text-emerald-400">POST</span> <span className="text-neutral-100">/v1/platform/mcp/invoke</span>
                {'\n'}
                <span className="text-neutral-100">&#123;</span>
                {'\n'}
                <span className="text-neutral-300">  &quot;tool&quot;: </span><span className="text-emerald-300">&quot;send_message&quot;</span><span className="text-neutral-300">,</span>
                {'\n'}
                <span className="text-neutral-300">  &quot;parameters&quot;: &#123;</span>
                {'\n'}
                <span className="text-neutral-300">    &quot;instanceId&quot;: </span><span className="text-emerald-300">&quot;inst_abc&quot;</span><span className="text-neutral-300">,</span>
                {'\n'}
                <span className="text-neutral-300">    &quot;to&quot;: </span><span className="text-emerald-300">&quot;+12025550100&quot;</span><span className="text-neutral-300">,</span>
                {'\n'}
                <span className="text-neutral-300">    &quot;text&quot;: </span><span className="text-emerald-300">&quot;Hello from MCP&quot;</span>
                {'\n'}
                <span className="text-neutral-300">  &#125;</span>
                {'\n'}
                <span className="text-neutral-100">&#125;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
