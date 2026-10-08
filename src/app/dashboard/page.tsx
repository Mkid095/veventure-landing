'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardView } from '../../components/DashboardView';
import { ViewMode } from '../../types';

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigate = (view: ViewMode) => {
    if (view === 'landing') {
      router.push('/');
    } else if (view === 'docs') {
      router.push('/docs');
    }
  };

  return <DashboardView onNavigate={handleNavigate} />;
}
