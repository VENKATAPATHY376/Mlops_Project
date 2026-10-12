import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PlatformProvider } from './contexts/PlatformContext';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { ModulePlaceholder } from './pages/ModulePlaceholder';

interface AppProps {
  /** City the platform opens on. */
  defaultCity?: 'chennai' | 'delhi' | 'mumbai' | 'bengaluru' | 'hyderabad';
  /** Overall interface theme. */
  theme?: 'dark' | 'light';
}

export function App({ defaultCity = 'chennai', theme = 'dark' }: AppProps) {
  return (
    <PlatformProvider initialCity={defaultCity} initialTheme={theme}>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<ModulePlaceholder />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </PlatformProvider>);

}