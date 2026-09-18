import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiMic, FiSend, FiVolume2 } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import { AI_SEED_MESSAGES, AI_SUGGESTED_PROMPTS, generateAiReply } from '@/data/mock/aiAssistant';
import { cn } from '@/utils/cn';

function AssistantBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white" aria-hidden="true">
          🤖
        </span>
      )}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft',
          isUser
            ? 'rounded-br-md bg-primary-600 text-white'
            : 'rounded-bl-md border border-gray-100 bg-white text-gray-700'
        )}
      >
        <p className="whitespace-pre-line">{message.text}</p>
        <p className={cn('mt-1.5 text-[10px] font-medium', isUser ? 'text-primary-100' : 'text-gray-400')}>
          {message.time}
        </p>
      </div>
    </div>
  );
}

export default function AiAssistant() {
  const [messages, setMessages] = useState(AI_SEED_MESSAGES);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const replyTimer = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, typing]);

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  function send(prompt) {
    const message = prompt.trim();
    if (!message) return;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setText('');
    setTyping(true);
    replyTimer.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: generateAiReply(message),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setTyping(false);
    }, 1300);
  }

  return (
    <PageTransition>
      <PageHeader
        title="AI Sathi"
        subtitle="Your AI farming assistant — 24x7, in your language"
        status="Online"
      />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <Card variant="soft" className="flex h-[68vh] flex-col overflow-hidden p-0">
          <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-lg font-bold text-white shadow-soft" aria-hidden="true">
              🤖
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-gray-900">Sathi · AI Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden="true" />
                Speaks Hindi · Punjabi · English
              </p>
            </div>
            <button type="button" aria-label="Speak" className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-lg text-gray-500 transition hover:bg-primary-50 hover:text-primary-600">
              <FiVolume2 aria-hidden="true" />
            </button>
            <Link to="/dashboard/ai-assistant/advisories" className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-lg text-gray-500 transition hover:bg-primary-50 hover:text-primary-600" aria-label="Advisories" title="Advisories">
              <FiBookOpen aria-hidden="true" />
            </Link>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50/60 p-4">
            {messages.map((message) => (
              <AssistantBubble key={message.id} message={message} />
            ))}
            {typing && (
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white" aria-hidden="true">🤖</span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-soft">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" aria-hidden="true" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} aria-hidden="true" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} aria-hidden="true" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-gray-100 bg-white px-3 py-2.5">
            {AI_SUGGESTED_PROMPTS.slice(0, 5).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => send(prompt)}
                className="focus-ring shrink-0 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-100"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
            onSubmit={(event) => {
              event.preventDefault();
              send(text);
            }}
          >
            <button type="button" aria-label="Speak instead of typing" className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg text-gray-400 transition hover:bg-primary-50 hover:text-primary-600">
              <FiMic aria-hidden="true" />
            </button>
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Ask anything about your farm…"
              aria-label="Message Sathi"
              className="input-base !py-2.5"
            />
            <Button type="submit" size="icon" aria-label="Send message" leftIcon={FiSend} />
          </form>
        </Card>

        <div className="space-y-4">
          <Card variant="tinted">
            <p className="font-display text-sm font-bold text-gray-900">Today for your farm</p>
            <ul className="mt-3 space-y-2.5 text-sm text-gray-600">
              <li className="flex gap-2">
                <span aria-hidden="true">☁️</span>
                <span><strong className="text-gray-800">32°C, chance of evening rain.</strong> Good day for urea top dressing.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">🌾</span>
                <span>Wheat at <strong className="text-gray-800">₹2,450/q</strong> — up 2.4% at Ludhiana.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">🐛</span>
                <span><strong className="text-gray-800">Rust risk rising</strong> for wheat in your block — scan a leaf this week.</span>
              </li>
            </ul>
            <Link to="/dashboard/disease-detection" className="focus-ring mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700">
              Scan a leaf →
            </Link>
          </Card>

          <Card variant="flat">
            <p className="font-display text-sm font-bold text-gray-900">Try saying…</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {AI_SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  className="focus-ring rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-primary-300 hover:text-primary-700"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}