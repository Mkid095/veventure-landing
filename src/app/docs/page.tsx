'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PublicDocs } from '../../components/PublicDocs';
import { ViewMode } from '../../types';

export default function DocsPage() {
  const router = useRouter();

  const handleNavigate = (view: ViewMode) => {
    if (view === 'landing') {
      router.push('/');
    } else if (view === 'dashboard') {
      router.push('/dashboard');
    }
  };

  return <PublicDocs onNavigate={handleNavigate} />;
}
