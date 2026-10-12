import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SendHorizonalIcon, SparklesIcon, XIcon } from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { getCategory } from '../../utils/aqi';

interface Message {
  id: number;
  from: 'ai' | 'user';
  text: string;
}

const SUGGESTIONS = ['Why is AQI rising today?', 'Compare Delhi and Chennai', 'Draft a health advisory'];

export function AiAssistant() {
  const { city, snapshot } = usePlatform();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const category = getCategory(snapshot.aqi);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { id: Date.now(), from: 'user', text: trimmed }]);
    setInput('');
    setThinking(true);
    window.setTimeout(() => {
      setMessages((m) => [
      ...m,
      {
        id: Date.now() + 1,
        from: 'ai',
        text: `${city.name} is currently at AQI ${snapshot.aqi} (${category.label}), with a 24-hour forecast of ${snapshot.forecast24}. The dominant pollutant is ${snapshot.dominantPollutant} and wind speed of ${snapshot.windSpeed} km/h is the strongest dispersing factor. ${category.advice[0]}.`
      }]
      );
      setThinking(false);
    }, 900);
  }

  return (
    <>
      <AnimatePresence>
        {open ?
        <motion.aside
          key="panel"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          aria-label="AirPulse AI assistant"
          className="fixed bottom-24 right-4 z-50 flex h-[440px] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-lift backdrop-blur-xl sm:right-6">
          
            <header className="flex items-center gap-2.5 border-b border-line/70 px-4 py-3">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/15 text-accent">
                <SparklesIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold text-ink">AirPulse Assistant</p>
                <p className="text-[10px] text-muted">Context: {city.name}</p>
              </div>
              <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="ml-auto rounded-lg p-1.5 text-muted transition-colors hover:bg-elevated hover:text-ink">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="rounded-2xl rounded-tl-sm border border-line/70 bg-elevated/70 p-3 text-xs leading-relaxed text-ink">
                Ask me about forecasts, drivers of pollution, or advisory language for {city.name}.
              </div>
              {messages.map((m) =>
            <div
              key={m.id}
              className={
              m.from === 'user' ?
              'ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-accent/15 p-3 text-xs leading-relaxed text-ink' :
              'max-w-[90%] rounded-2xl rounded-tl-sm border border-line/70 bg-elevated/70 p-3 text-xs leading-relaxed text-ink'
              }>
              
                  {m.text}
                </div>
            )}
              {thinking ?
            <div className="flex items-center gap-1.5 px-1" aria-live="polite" aria-label="Assistant is typing">
                  {[0, 1, 2].map((i) =>
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />

              )}
                </div> :
            null}
            </div>

            {messages.length === 0 ?
          <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {SUGGESTIONS.map((s) =>
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted transition-colors duration-150 hover:border-accent/50 hover:text-accent">
              
                    {s}
                  </button>
            )}
              </div> :
          null}

            <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-line/70 p-3">
            
              <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about air quality..."
              aria-label="Message the assistant"
              className="min-w-0 flex-1 rounded-xl border border-line bg-elevated/70 px-3 py-2 text-xs text-ink placeholder:text-muted/80 focus:border-accent/60 focus:outline-none" />
            
              <button
              type="submit"
              aria-label="Send message"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent text-[rgb(var(--c-base))] transition-[filter] duration-150 hover:brightness-110">
              
                <SendHorizonalIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.aside> :
        null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Hide AI assistant' : 'Open AI assistant'}
        className="fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-2xl border border-accent/40 bg-accent px-4 py-3 text-xs font-semibold text-[rgb(var(--c-base))] shadow-lift transition-transform duration-150 ease-smooth hover:-translate-y-0.5 sm:right-6">
        
        <SparklesIcon className="h-4 w-4" aria-hidden="true" />
        <span className="hidden whitespace-nowrap sm:inline">Ask AirPulse AI</span>
      </button>
    </>);

}