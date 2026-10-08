'use client';

import React, { useState } from 'react';
import {
  Key,
  Plus,
  Trash2,
  ExternalLink,
  Shield,
  Layers,
  ChevronDown,
  Terminal,
  Activity,
  Check,
  AlertCircle,
  Copy,
  BookOpen,
  Home,
  LogOut,
  User,
  Settings,
  CreditCard,
  Send,
} from 'lucide-react';
import { PersonalAccessToken, ViewMode } from '../types';
import { TokenModal } from './TokenModal';

interface DashboardViewProps {
  onNavigate: (view: ViewMode, docId?: string) => void;
}

const INITIAL_TOKENS: PersonalAccessToken[] = [
  {
    id: 'tok_cursor_mcp',
    label: 'Cursor Agent (MCP Gateway)',
    tokenPreview: 'vvn_live_38ad...819a',
    scopes: ['instances:read', 'messages:send', 'messages:read'],
    createdAt: '2 days ago',
    lastUsedAt: '4 minutes ago',
    expiresAt: 'Jan 5, 2027',
  },
  {
    id: 'tok_prod_webhook',
    label: 'Production CI Pipeline',
    tokenPreview: 'vvn_live_9921...f102',
    scopes: ['instances:read', 'instances:write', 'webhooks:write'],
    createdAt: '2 weeks ago',
    lastUsedAt: '1 hour ago',
    expiresAt: 'Mar 12, 2027',
  },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [tokens, setTokens] = useState<PersonalAccessToken[]>(INITIAL_TOKENS);
  const [revokingTokenId, setRevokingTokenId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tokens' | 'billing' | 'mcp_tester'>('tokens');

  // MCP Tester state
  const [mcpTool, setMcpTool] = useState('list_categories');
  const [mcpResult, setMcpResult] = useState<string | null>(null);
  const [isInvoking, setIsInvoking] = useState(false);

  const handleRevoke = (id: string) => {
    setTokens((prev) => prev.filter((t) => t.id !== id));
    setRevokingTokenId(null);
  };

  const handleCreateToken = (newToken: PersonalAccessToken) => {
    setTokens((prev) => [newToken, ...prev]);
  };

  const handleRunMcp = () => {
    setIsInvoking(true);
    setTimeout(() => {
      setIsInvoking(false);
      if (mcpTool === 'list_categories') {
        setMcpResult(
          JSON.stringify(
            {
              jsonrpc: '2.0',
              result: {
                categories: [
                  { name: 'instances', toolCount: 9, status: 'ready' },
                  { name: 'messages', toolCount: 4, status: 'ready' },
                  { name: 'webhooks', toolCount: 6, status: 'ready' },
                ],
              },
            },
            null,
            2
          )
        );
      } else if (mcpTool === 'list_tools') {
        setMcpResult(
          JSON.stringify(
            {
              jsonrpc: '2.0',
              result: {
                category: 'messages',
                tools: [
                  {
                    name: 'send_message',
                    description: 'Dispatch text message payload to E.164 phone number',
                    requiredScopes: ['messages:send'],
                  },
                  {
                    name: 'send_media',
                    description: 'Transmit image or document attachment URL',
                    requiredScopes: ['messages:send'],
                  },
                  {
                    name: 'get_message_status',
                    description: 'Query read receipts and delivery timestamp',
                    requiredScopes: ['messages:read'],
                  },
                ],
              },
            },
            null,
            2
          )
        );
      } else {
        setMcpResult(
          JSON.stringify(
            {
              jsonrpc: '2.0',
              result: {
                messageId: 'msg_8912aa0b_sent',
                status: 'delivered',
                recipient: '+12025550100',
                costCents: 0.05,
              },
            },
            null,
            2
          )
        );
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Dashboard Top Bar */}
      <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-[#e5e5e5] px-6">
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between">
          {/* Left Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('landing')}
              className="text-[19px] font-semibold tracking-tight text-[#0a0a0a] hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              <span>Viventure</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                dashboard
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-neutral-600">
              <button
                onClick={() => setActiveTab('tokens')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'tokens' ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'hover:text-black'
                }`}
              >
                Tokens & API
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'billing' ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'hover:text-black'
                }`}
              >
                Billing & Quotas
              </button>
              <button
                onClick={() => setActiveTab('mcp_tester')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'mcp_tester' ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'hover:text-black'
                }`}
              >
                MCP Live Sandbox
              </button>
            </nav>
          </div>

          {/* Right: Quick actions + Profile menu §4.1 */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('docs')}
              className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black font-medium transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Docs</span>
            </button>

            {/* Profile Dropdown Container */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-[6px] hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200 cursor-pointer"
                aria-label="User profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-semibold">
                  AC
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-semibold text-neutral-900 leading-none">Alex Chen</div>
                  <div className="text-[10px] text-neutral-500 leading-none mt-1">Engineering Lead</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 stroke-[1.5]" />
              </button>

              {/* 4.1 Profile Menu Dropdown Panel (280px wide, 1px border) */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-[280px] bg-white border border-[#e5e5e5] rounded-[8px] shadow-sm z-50 animate-fadeIn py-2 divide-y divide-[#f0f0f0]">
                  {/* Header: User name + role */}
                  <div className="px-4 py-3">
                    <div className="text-sm font-semibold text-[#0a0a0a]">Alex Chen</div>
                    <div className="text-xs text-[#737373]">Engineering Lead</div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-1">org_enterprise_991b</div>
                  </div>

                  {/* Section: Account */}
                  <div className="py-1.5">
                    <div className="px-4 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Account
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('tokens');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('tokens');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Key className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Personal access tokens</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('billing');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Billing & usage</span>
                    </button>
                  </div>

                  {/* Section: Resources */}
                  <div className="py-1.5">
                    <div className="px-4 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Resources
                    </div>
                    <button
                      onClick={() => {
                        onNavigate('docs');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Documentation</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('mcp_tester');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5 text-neutral-500" />
                      <span>MCP tools</span>
                    </button>
                    <button
                      onClick={() => {
                        alert('Status: All API services operational.');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Status</span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </button>
                  </div>

                  {/* Bottom: Log out */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('landing');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1280px] mx-auto w-full flex-1 px-6 py-8">
        {/* TAB 1: TOKENS TAB (§4.2) */}
        {activeTab === 'tokens' && (
          <div>
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-[26px] sm:text-[30px] font-semibold text-[#0a0a0a] tracking-tight">
                  Personal access tokens
                </h1>
                <p className="text-[14px] text-[#737373] mt-1">
                  Generate tokens for the CLI, MCP, and API access.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] text-white text-xs font-medium rounded-[6px] hover:bg-neutral-800 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2]" />
                <span>Generate new token</span>
              </button>
            </div>

            {/* Token Table */}
            <div className="bg-white border border-[#e5e5e5] rounded-[8px] overflow-hidden shadow-xs">
              {tokens.length === 0 ? (
                <div className="p-16 text-center">
                  <Key className="w-8 h-8 text-neutral-300 mx-auto mb-3 stroke-[1.5]" />
                  <p className="text-sm font-medium text-neutral-800 mb-1">
                    No tokens yet
                  </p>
                  <p className="text-xs text-[#737373] max-w-sm mx-auto mb-5">
                    Generate one to use the API or MCP.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-[#0a0a0a] text-white text-xs font-medium rounded-[6px] hover:bg-neutral-800"
                  >
                    Generate token
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#fcfcfc] border-b border-[#e5e5e5] text-neutral-600 font-semibold">
                      <tr>
                        <th className="py-3 px-5">Label</th>
                        <th className="py-3 px-5">Scopes</th>
                        <th className="py-3 px-5">Created</th>
                        <th className="py-3 px-5">Last used</th>
                        <th className="py-3 px-5">Expires</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f0]">
                      {tokens.map((token) => (
                        <tr
                          key={token.id}
                          className="hover:bg-neutral-50/70 transition-colors group"
                        >
                          {/* Label + Token Preview */}
                          <td className="py-4 px-5">
                            <div className="font-semibold text-neutral-900">
                              {token.label}
                            </div>
                            <div className="font-mono text-[11px] text-neutral-400 mt-0.5">
                              {token.tokenPreview}
                            </div>
                          </td>

                          {/* Scopes chips */}
                          <td className="py-4 px-5">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {token.scopes.map((s) => (
                                <span
                                  key={s}
                                  className="font-mono text-[10px] px-1.5 py-0.5 bg-neutral-100 text-neutral-700 rounded border border-neutral-200"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Created */}
                          <td className="py-4 px-5 text-neutral-500">
                            {token.createdAt}
                          </td>

                          {/* Last Used */}
                          <td className="py-4 px-5 text-neutral-500">
                            {token.lastUsedAt}
                          </td>

                          {/* Expires */}
                          <td className="py-4 px-5 text-neutral-500">
                            {token.expiresAt}
                          </td>

                          {/* Actions: Revoke with inline confirm */}
                          <td className="py-4 px-5 text-right">
                            {revokingTokenId === token.id ? (
                              <div className="inline-flex items-center gap-1.5">
                                <span className="text-[11px] text-neutral-500">Revoke?</span>
                                <button
                                  onClick={() => handleRevoke(token.id)}
                                  className="px-2 py-1 bg-red-600 text-white rounded text-[11px] font-medium hover:bg-red-700"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setRevokingTokenId(null)}
                                  className="px-2 py-1 bg-neutral-200 text-neutral-700 rounded text-[11px] hover:bg-neutral-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setRevokingTokenId(token.id)}
                                className="text-neutral-400 hover:text-red-600 transition-colors p-1.5 rounded hover:bg-red-50 cursor-pointer"
                                title="Revoke token"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BILLING & USAGE */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[26px] font-semibold text-[#0a0a0a] tracking-tight">
                Billing & Quotas
              </h1>
              <p className="text-[14px] text-[#737373] mt-1">
                Your monthly plan limits, message volume, and active numbers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-[#e5e5e5] p-5 rounded-[8px]">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1">
                  Active Plan
                </div>
                <div className="text-2xl font-bold text-neutral-900">Pro Plan</div>
                <div className="text-xs text-neutral-500 mt-1">$49 / mo · Renews in 24 days</div>
              </div>

              <div className="bg-white border border-[#e5e5e5] p-5 rounded-[8px]">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1">
                  Messages Dispatched
                </div>
                <div className="text-2xl font-bold text-neutral-900">4,812 / 25,000</div>
                <div className="w-full bg-neutral-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[19%]" />
                </div>
              </div>

              <div className="bg-white border border-[#e5e5e5] p-5 rounded-[8px]">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1">
                  WhatsApp Instances
                </div>
                <div className="text-2xl font-bold text-neutral-900">2 / 10</div>
                <div className="text-xs text-neutral-500 mt-1">8 additional numbers available</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MCP LIVE SANDBOX */}
        {activeTab === 'mcp_tester' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[26px] font-semibold text-[#0a0a0a] tracking-tight">
                Model Context Protocol Live Sandbox
              </h1>
              <p className="text-[14px] text-[#737373] mt-1">
                Simulate JSON-RPC tool invocation over HTTPS without writing client code.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-white border border-[#e5e5e5] rounded-[8px] p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Select MCP Tool
                  </label>
                  <select
                    value={mcpTool}
                    onChange={(e) => setMcpTool(e.target.value)}
                    className="w-full p-2 text-xs border border-neutral-300 rounded-[6px] bg-white font-mono"
                  >
                    <option value="list_categories">list_categories (Step 1)</option>
                    <option value="list_tools">list_tools [category: messages] (Step 2)</option>
                    <option value="send_message">send_message [instance: inst_abc] (Step 3)</option>
                  </select>
                </div>

                <div>
                  <div className="text-xs font-semibold text-neutral-700 mb-1">
                    HTTP Gateway Endpoint
                  </div>
                  <div className="p-2 bg-neutral-100 rounded text-xs font-mono text-neutral-800 break-all">
                    POST https://api.viventure.dev/v1/platform/mcp/invoke
                  </div>
                </div>

                <button
                  onClick={handleRunMcp}
                  disabled={isInvoking}
                  className="w-full py-2.5 bg-[#0a0a0a] text-white text-xs font-medium rounded-[6px] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isInvoking ? 'Invoking MCP Gateway...' : 'Execute JSON-RPC Call'}</span>
                </button>
              </div>

              <div className="lg:col-span-7 bg-[#0c1015] border border-[#262626] rounded-[8px] p-5 overflow-hidden font-mono text-xs text-neutral-200">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3 text-neutral-400">
                  <span>mcp-gateway-response.json</span>
                  <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                    200 OK
                  </span>
                </div>
                <pre className="overflow-x-auto whitespace-pre leading-relaxed text-emerald-400">
                  {mcpResult ||
                    '// Click "Execute JSON-RPC Call" to simulate real-time gateway response.'}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Generate Token Modal */}
      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleCreateToken}
      />
    </div>
  );
};
