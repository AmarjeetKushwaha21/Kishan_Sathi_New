import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiClock, FiSend, FiVideo } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Button from '@/components/ui/Button';
import ExpertHeader from '@/components/expert/ExpertHeader';
import ChatBubble from '@/components/expert/ChatBubble';
import { useExpert } from '@/context/ExpertContext';
import { cn } from '@/utils/cn';

const QUICK_REPLIES = ['Urea dose?', 'Send a photo', 'Irrigation advice', 'Pesticide name'];

export default function ChatUI() {
  const { expertId } = useParams();
  const { experts, getThread, sendMessage, setSelectedExpertId, getExpert, upcoming } = useExpert();
  const [activeId, setActiveId] = useState(() => expertId || experts[0].id);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const replyTimer = useRef(null);

  const activeExpert = getExpert(activeId);
  const thread = getThread(activeId);

  useEffect(() => {
    setActiveId(expertId || experts[0].id);
    setSelectedExpertId(expertId || experts[0].id);
  }, [expertId, experts, setSelectedExpertId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [thread.length, typing]);

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  function send() {
    const message = text.trim();
    if (!message) return;
    sendMessage(activeId, message);
    setText('');
    setTyping(true);
    replyTimer.current = setTimeout(() => {
      sendMessage(activeId, 'Got it. I will share a detailed plan shortly — for urgent cases, tap the video call button.');
      setTyping(false);
    }, 1400);
  }

  return (
    <PageTransition>
      <ExpertHeader title="Expert Chat" subtitle="Messages are answered within ~15 minutes" showBack status="Online" />

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {experts.map((e) => (
          <button
            key={e.id}
            type="button"
            aria-pressed={activeId === e.id}
            onClick={() => setActiveId(e.id)}
            className={cn(
              'focus-ring flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition',
              activeId === e.id ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
            )}
          >
            <span aria-hidden="true">{e.emoji}</span> {e.short}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-50/70 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-lg ${activeExpert.gradient}`} aria-hidden="true">
            {activeExpert.emoji}
          </span>
          <div>
            <p className="font-display text-sm font-bold text-gray-900">{activeExpert.name}</p>
            <p className="text-[11px] text-gray-500">{activeExpert.short} · replies in {activeExpert.responseTime}</p>
          </div>
        </div>
        <Link to={upcoming[0] ? `/dashboard/consultation/video/${upcoming[0].id}` : '/dashboard/consultation/book'} className="focus-ring rounded-xl">
          <Button size="sm" leftIcon={FiVideo}>Video call</Button>
        </Link>
      </div>

      <div className="mt-4 flex h-[52vh] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/60">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {thread.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
          {typing && (
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-2.5 shadow-soft w-fit">
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} aria-hidden="true" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} aria-hidden="true" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} aria-hidden="true" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-gray-200 bg-white px-3 py-2.5">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                sendMessage(activeId, q);
              }}
              className="focus-ring shrink-0 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-100"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          className="flex items-center gap-2 border-t border-gray-200 bg-white p-3"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <span className="hidden items-center gap-1 px-2 text-[11px] text-gray-400 sm:inline-flex">
            <FiClock aria-hidden="true" /> Avg reply ~15 min
          </span>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type your farming question…"
            aria-label="Message"
            className="input-base !py-2.5"
          />
          <Button type="submit" size="icon" aria-label="Send message" leftIcon={FiSend} />
        </form>
      </div>
    </PageTransition>
  );
}