import React, { useState, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Home,
  ExternalLink,
} from 'lucide-react';
import { DOC_SECTIONS, DOC_PAGES, DocPage } from '../data/docsContent';
import { ViewMode } from '../types';

interface PublicDocsProps {
  initialDocId?: string;
  onNavigate: (view: ViewMode, docId?: string) => void;
}

export const PublicDocs: React.FC<PublicDocsProps> = ({
  initialDocId = 'introduction',
  onNavigate,
}) => {
  const [activeDocId, setActiveDocId] = useState<string>(initialDocId);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const activeDoc: DocPage = useMemo(() => {
    return DOC_PAGES[activeDocId] || DOC_PAGES['introduction'];
  }, [activeDocId]);

  // Flattened order of docs for next/prev navigation
  const flatDocs = useMemo(() => {
    const list: { id: string; title: string; sectionTitle: string }[] = [];
    DOC_SECTIONS.forEach((sec) => {
      sec.items.forEach((item) => {
        list.push({ id: item.id, title: item.title, sectionTitle: sec.title });
      });
    });
    return list;
  }, []);

  const currentIndex = flatDocs.findIndex((d) => d.id === activeDoc.id);
  const prevDoc = currentIndex > 0 ? flatDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null;

  // Filtered docs for search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return Object.values(DOC_PAGES).filter(
      (doc) =>
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.content.overview.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleCopy = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Docs Top Bar */}
      <header className="sticky top-0 z-40 w-full h-16 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] px-6">
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between gap-4">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="text-[19px] font-semibold tracking-tight text-[#0a0a0a] hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              <span>Viventure</span>
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                docs
              </span>
            </button>
          </div>

          {/* Center: Search input */}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 stroke-[1.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation, tools, API endpoints... (Cmd+K)"
              className="w-full pl-9 pr-4 py-1.5 text-[13px] bg-neutral-50 border border-[#e5e5e5] rounded-[6px] focus:outline-none focus:border-neutral-800 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}

            {/* Search Dropdown */}
            {searchQuery && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#e5e5e5] rounded-[6px] shadow-lg max-h-80 overflow-y-auto p-2 z-50">
                {searchResults.length === 0 ? (
                  <div className="p-3 text-xs text-neutral-500 text-center">
                    No results for "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveDocId(item.id);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2.5 hover:bg-neutral-50 rounded-[4px] transition-colors flex flex-col gap-0.5"
                    >
                      <div className="text-xs font-semibold text-neutral-900">{item.title}</div>
                      <div className="text-[11px] text-neutral-500 truncate">{item.description}</div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 hidden md:flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Landing</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3.5 py-1.5 bg-[#0a0a0a] text-white text-[13px] font-medium rounded-[6px] hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Log in</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="max-w-[1400px] mx-auto w-full flex-1 flex px-4 sm:px-6">
        {/* Sticky Sidebar (240px wide) */}
        <aside className="w-60 shrink-0 border-r border-[#e5e5e5] py-8 pr-4 hidden md:block self-start sticky top-16 max-h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="space-y-7">
            {DOC_SECTIONS.map((section) => (
              <div key={section.id}>
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2.5 px-2">
                  {section.title}
                </div>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = activeDoc.id === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveDocId(item.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-[4px] text-[13px] transition-colors cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-neutral-100 text-[#0a0a0a] font-semibold'
                              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                          }`}
                        >
                          <span className="truncate">{item.title}</span>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile section dropdown */}
        <div className="md:hidden w-full py-4 border-b border-neutral-200">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide block mb-1">
            Documentation Topic
          </label>
          <select
            value={activeDoc.id}
            onChange={(e) => setActiveDocId(e.target.value)}
            className="w-full p-2 border border-neutral-300 rounded text-sm bg-white"
          >
            {DOC_SECTIONS.map((sec) => (
              <optgroup key={sec.id} label={sec.title}>
                {sec.items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Content Area */}
        <main className="flex-1 py-8 md:py-10 md:pl-10 max-w-4xl min-w-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-medium">
            <button onClick={() => onNavigate('landing')} className="hover:text-black">
              Viventure
            </button>
            <span>/</span>
            <span>Docs</span>
            <span>/</span>
            <span className="text-neutral-900 capitalize">
              {activeDoc.sectionId.replace('-', ' ')}
            </span>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">{activeDoc.title}</span>
          </div>

          {/* Document Header */}
          <div className="border-b border-[#e5e5e5] pb-6 mb-8">
            <h1 className="text-[32px] sm:text-[38px] font-semibold text-[#0a0a0a] tracking-tight leading-tight mb-3">
              {activeDoc.title}
            </h1>
            <p className="text-[16px] text-[#737373] leading-relaxed">
              {activeDoc.description}
            </p>
          </div>

          {/* Overview text */}
          <div className="prose text-[15px] text-[#404040] leading-relaxed mb-10">
            <p>{activeDoc.content.overview}</p>
          </div>

          {/* Subsections */}
          {activeDoc.content.subsections && (
            <div className="space-y-10 mb-12">
              {activeDoc.content.subsections.map((sub, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-[18px] font-semibold text-[#0a0a0a] tracking-tight">
                    {sub.title}
                  </h3>
                  <p className="text-[14px] text-[#525252] leading-relaxed">
                    {sub.body}
                  </p>

                  {/* Code Block if any */}
                  {sub.code && (
                    <div className="rounded-[6px] border border-[#262626] bg-[#0c1015] overflow-hidden my-4 shadow-xs">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-[#21262d] bg-[#0c1015]">
                        <span className="font-mono text-xs text-neutral-400">
                          {sub.code.filename || sub.code.language}
                        </span>
                        <button
                          onClick={() => handleCopy(sub.code!.snippet, `sub-${idx}`)}
                          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-neutral-800"
                        >
                          {copiedSnippet === `sub-${idx}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 font-mono text-[13px] text-neutral-200 overflow-x-auto leading-relaxed">
                        <code>{sub.code.snippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Data Table if any */}
          {activeDoc.content.table && (
            <div className="my-10 border border-[#e5e5e5] rounded-[6px] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-neutral-50 border-b border-[#e5e5e5] text-neutral-700 font-semibold">
                    <tr>
                      {activeDoc.content.table.headers.map((h, i) => (
                        <th key={i} className="py-3 px-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e5e5]">
                    {activeDoc.content.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-neutral-50/60 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3 px-4 ${
                              cIdx === 0 ? 'font-mono text-xs font-medium text-neutral-900' : 'text-neutral-600'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Next / Previous Page Navigation */}
          <div className="pt-8 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
            {prevDoc ? (
              <button
                onClick={() => setActiveDocId(prevDoc.id)}
                className="w-full sm:w-auto p-3.5 rounded-[6px] border border-[#e5e5e5] hover:border-neutral-400 text-left transition-colors flex items-center gap-3 cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-neutral-400 group-hover:-translate-x-0.5 transition-transform" />
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wide">
                    Previous
                  </div>
                  <div className="text-[13px] font-semibold text-neutral-900">
                    {prevDoc.title}
                  </div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextDoc && (
              <button
                onClick={() => setActiveDocId(nextDoc.id)}
                className="w-full sm:w-auto p-3.5 rounded-[6px] border border-[#e5e5e5] hover:border-neutral-400 text-right transition-colors flex items-center justify-end gap-3 cursor-pointer group ml-auto"
              >
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wide">
                    Next
                  </div>
                  <div className="text-[13px] font-semibold text-neutral-900">
                    {nextDoc.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
