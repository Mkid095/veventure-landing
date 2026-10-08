import React, { useState } from 'react';
import { X, Check, Copy, AlertTriangle } from 'lucide-react';
import { PersonalAccessToken } from '../types';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (token: PersonalAccessToken) => void;
}

const AVAILABLE_SCOPES = [
  {
    category: 'Instances',
    scopes: [
      { id: 'instances:read', label: 'instances:read', desc: 'Query instance state and QR pairing' },
      { id: 'instances:write', label: 'instances:write', desc: 'Create, pair, reboot and delete instances' },
    ],
  },
  {
    category: 'Messages',
    scopes: [
      { id: 'messages:send', label: 'messages:send', desc: 'Dispatch text, templates, and media attachments' },
      { id: 'messages:read', label: 'messages:read', desc: 'Inspect delivery receipts and chat history' },
    ],
  },
  {
    category: 'Webhooks',
    scopes: [
      { id: 'webhooks:read', label: 'webhooks:read', desc: 'Inspect webhook subscriptions and dead-letter queue' },
      { id: 'webhooks:write', label: 'webhooks:write', desc: 'Register endpoints and cycle HMAC signing secrets' },
    ],
  },
  {
    category: 'Account',
    scopes: [
      { id: 'account:read', label: 'account:read', desc: 'Query quota, usage counters, and audit logs' },
    ],
  },
];

export const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
}) => {
  const [label, setLabel] = useState('');
  const [expiryDays, setExpiryDays] = useState('90');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    'instances:read',
    'messages:send',
  ]);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleScope = (scopeId: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scopeId) ? prev.filter((s) => s !== scopeId) : [...prev, scopeId]
    );
  };

  const handleGenerate = () => {
    if (!label.trim()) {
      setError('Please provide a token label.');
      return;
    }
    if (selectedScopes.length === 0) {
      setError('Please select at least one permission scope.');
      return;
    }

    const randomSuffix = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const fullToken = `vvn_live_${randomSuffix}`;

    const expDate = new Date();
    expDate.setDate(expDate.getDate() + parseInt(expiryDays, 10));

    const newToken: PersonalAccessToken = {
      id: `tok_${Math.random().toString(36).substring(2, 9)}`,
      label: label.trim(),
      tokenPreview: `${fullToken.substring(0, 12)}...${fullToken.substring(fullToken.length - 4)}`,
      scopes: selectedScopes,
      createdAt: 'Just now',
      lastUsedAt: 'Never',
      expiresAt: expDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setGeneratedSecret(fullToken);
    onGenerate(newToken);
  };

  const handleCopyToken = () => {
    if (generatedSecret) {
      navigator.clipboard.writeText(generatedSecret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setGeneratedSecret(null);
    setLabel('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-[8px] border border-[#e5e5e5] max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-neutral-400 hover:text-neutral-700"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-1">
          {generatedSecret ? 'Token Generated' : 'Generate personal access token'}
        </h3>
        <p className="text-[13px] text-[#737373] mb-6">
          {generatedSecret
            ? 'Store this secret token immediately in a secure vault.'
            : 'Personal access tokens allow you to authenticate with the API and MCP gateway.'}
        </p>

        {/* Once generated: Show token ONCE with warning per spec §4.2 */}
        {generatedSecret ? (
          <div className="space-y-5">
            <div className="p-4 rounded-[6px] bg-[#fafafa] border border-[#e5e5e5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-600">Generated Plaintext Token</span>
                <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Active
                </span>
              </div>
              <div className="font-mono text-xs text-neutral-900 bg-white p-3 rounded border border-neutral-200 break-all select-all">
                {generatedSecret}
              </div>
              <button
                onClick={handleCopyToken}
                className="mt-3 w-full py-2 bg-[#0a0a0a] text-white text-xs font-medium rounded hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy token to clipboard</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-[6px] flex items-start gap-2.5 text-[12px] text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 stroke-[1.5]" />
              <p className="leading-relaxed">
                <strong>Warning:</strong> Copy this token now. You will not be able to see it again once this window is closed.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleClose}
                className="px-5 py-2 bg-[#0a0a0a] text-white text-xs font-medium rounded hover:bg-neutral-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {error && (
              <div className="p-2.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded">
                {error}
              </div>
            )}

            {/* Label input */}
            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1.5">
                Token label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={64}
                value={label}
                onChange={(e) => {
                  setLabel(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. Cursor MCP Gateway or Production Bot"
                className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-[6px] focus:outline-none focus:border-neutral-800"
              />
              <span className="text-[11px] text-neutral-400 mt-1 block">Max 64 characters</span>
            </div>

            {/* Expiry Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1.5">
                Expiration
              </label>
              <select
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-[6px] bg-white focus:outline-none focus:border-neutral-800"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days (Recommended)</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>

            {/* Scopes Checkboxes */}
            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-2">
                Select Scopes
              </label>
              <div className="space-y-4 max-h-52 overflow-y-auto pr-1 border border-[#f0f0f0] p-3 rounded-[6px]">
                {AVAILABLE_SCOPES.map((cat) => (
                  <div key={cat.category}>
                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                      {cat.category}
                    </div>
                    <div className="space-y-2">
                      {cat.scopes.map((scope) => (
                        <label
                          key={scope.id}
                          className="flex items-start gap-2.5 cursor-pointer text-xs group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedScopes.includes(scope.id)}
                            onChange={() => handleToggleScope(scope.id)}
                            className="mt-0.5 rounded border-neutral-300 text-neutral-900 focus:ring-0"
                          />
                          <div>
                            <span className="font-mono font-medium text-neutral-900 group-hover:text-black">
                              {scope.label}
                            </span>
                            <span className="block text-[11px] text-neutral-500">
                              {scope.desc}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#f0f0f0] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                className="px-5 py-2 bg-[#0a0a0a] text-white text-xs font-medium rounded-[6px] hover:bg-neutral-800 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
