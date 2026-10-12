import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LiveTicker } from './LiveTicker';
import { AiAssistant } from './AiAssistant';

export function AppShell({ children }: {children: React.ReactNode;}) {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="app-backdrop flex min-h-screen w-full flex-col bg-base">
      <Header onOpenNav={() => setNavOpen(true)} />
      <LiveTicker />
      <div className="flex min-h-0 flex-1">
        <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
        <main className="min-w-0 flex-1">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 pb-28 sm:px-6 lg:px-8">
            
            {children}
          </motion.div>
        </main>
      </div>
      <AiAssistant />
    </div>);

}