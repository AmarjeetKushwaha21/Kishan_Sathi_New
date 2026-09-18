import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiMic, FiMicOff, FiSend, FiVolume2, FiVolumeX } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import { AI_SEED_MESSAGES, AI_SUGGESTED_PROMPTS, generateAiReply } from '@/data/mock/aiAssistant';
import { sendChatMessage } from '@/services/assistantService';
import { useWeather } from '@/context/WeatherContext';
import { cn } from '@/utils/cn';

function AssistantBubble({ message, onSpeak }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white shadow-soft"
          aria-hidden="true"
        >
          🤖
        </span>
      )}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft',
          isUser
            ? 'rounded-br-md bg-primary-600 text-white'
            : 'rounded-bl-md border border-gray-100 bg-white text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100'
        )}
      >
        <p className="whitespace-pre-line">{message.text}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className={cn('text-[10px] font-medium', isUser ? 'text-primary-100' : 'text-gray-400')}>
            {message.time} {message.provider === 'gemini' && '· ✨ Gemini AI'}
          </span>
          {!isUser && onSpeak && (
            <button
              type="button"
              onClick={() => onSpeak(message.text)}
              className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-primary-600 dark:hover:bg-gray-800"
              title="Listen to response"
            >
              <FiVolume2 className="text-xs" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AiAssistant() {
  const [messages, setMessages] = useState(AI_SEED_MESSAGES);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  // Weather context for grounding
  let weatherContext = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    weatherContext = useWeather();
  } catch {
    // Weather provider may not be in scope on standalone views
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, typing]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Initialize Speech Recognition (Web Speech API)
  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Default to Hindi/Indian accent
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  // Text-To-Speech: Speak text aloud
  const speakText = (content) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech audio is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech
    const cleanContent = content.replace(/[#*•—]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanContent);
    utterance.rate = 0.95; // Slightly slower for clear agricultural comprehension

    // Pick Hindi or Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  async function send(prompt) {
    const message = prompt.trim();
    if (!message) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setText('');
    setTyping(true);

    // Prepare farm context from active weather & location
    const farmContext = {
      location: weatherContext?.activeLocation?.name || 'Punjab, India',
      temp: weatherContext?.current?.temp ? `${weatherContext.current.temp}°C` : undefined,
    };

    try {
      // Call backend AI service
      const response = await sendChatMessage(message, messages, farmContext);
      const aiReplyText = response.reply || generateAiReply(message);

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: aiReplyText,
          provider: response.provider || 'gemini',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.warn('Backend chat API failed, using fallback engine:', err.message);
      // Seamless fallback
      const fallbackReply = generateAiReply(message);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: fallbackReply,
          provider: 'offline',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <PageTransition>
      <PageHeader
        title="AI Sathi"
        subtitle="Your AI farming assistant — 24x7, in your language (Powered by Gemini AI)"
        status="Online"
      />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <Card variant="soft" className="flex h-[68vh] flex-col overflow-hidden p-0">
          {/* Assistant Header */}
          <div className="flex items-center gap-3 border-b border-gray-100 bg-white/50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/50">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-lg font-bold text-white shadow-soft"
              aria-hidden="true"
            >
              🤖
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-display text-sm font-bold text-gray-900 dark:text-white">Sathi · AI Assistant</p>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400">
                  ✨ Gemini 1.5
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" aria-hidden="true" />
                Speaks Hindi · Hinglish · Punjabi · English
              </p>
            </div>

            {/* Read Out Audio Button */}
            <button
              type="button"
              onClick={() => {
                const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
                if (lastAssistant) speakText(lastAssistant.text);
              }}
              aria-label={isSpeaking ? 'Stop speaking' : 'Read aloud'}
              className={cn(
                'focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-lg transition',
                isSpeaking
                  ? 'bg-primary-600 text-white animate-pulse'
                  : 'text-gray-500 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-400'
              )}
              title={isSpeaking ? 'Stop audio' : 'Listen to last response'}
            >
              {isSpeaking ? <FiVolumeX aria-hidden="true" /> : <FiVolume2 aria-hidden="true" />}
            </button>

            <Link
              to="/dashboard/ai-assistant/advisories"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-lg text-gray-500 transition hover:bg-primary-50 hover:text-primary-600 dark:text-gray-400"
              aria-label="Advisories"
              title="Advisories"
            >
              <FiBookOpen aria-hidden="true" />
            </Link>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50/60 p-4 dark:bg-gray-950/40">
            {messages.map((message) => (
              <AssistantBubble key={message.id} message={message} onSpeak={speakText} />
            ))}
            {typing && (
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  🤖
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-soft dark:bg-gray-900">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary-500" aria-hidden="true" />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-primary-500"
                    style={{ animationDelay: '150ms' }}
                    aria-hidden="true"
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-primary-500"
                    style={{ animationDelay: '300ms' }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-gray-100 bg-white px-3 py-2.5 dark:border-gray-800 dark:bg-gray-900">
            {AI_SUGGESTED_PROMPTS.slice(0, 5).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => send(prompt)}
                className="focus-ring shrink-0 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-100 dark:border-primary-800/60 dark:bg-primary-950/40 dark:text-primary-300"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Form */}
          <form
            className="flex items-center gap-2 border-t border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
            onSubmit={(event) => {
              event.preventDefault();
              send(text);
            }}
          >
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              aria-label={isListening ? 'Stop listening' : 'Speak your question'}
              className={cn(
                'focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition',
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-md'
                  : 'text-gray-400 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-gray-800'
              )}
              title={isListening ? 'Listening... click to stop' : 'Click to speak in Hindi/English'}
            >
              {isListening ? <FiMicOff aria-hidden="true" /> : <FiMic aria-hidden="true" />}
            </button>

            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={isListening ? 'Listening... speak now...' : 'Ask anything about your farm in Hindi, Hinglish, or English…'}
              aria-label="Message Sathi"
              className="input-base !py-2.5"
            />

            <Button
              type="submit"
              size="icon"
              disabled={typing || !text.trim()}
              aria-label="Send message"
              leftIcon={FiSend}
            />
          </form>
        </Card>

        {/* Right Info Sidebar */}
        <div className="space-y-4">
          <Card variant="tinted">
            <p className="font-display text-sm font-bold text-gray-900 dark:text-white">Today for your farm</p>
            <ul className="mt-3 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex gap-2">
                <span aria-hidden="true">☁️</span>
                <span>
                  <strong className="text-gray-800 dark:text-gray-200">
                    {weatherContext?.current?.temp ? `${weatherContext.current.temp}°C, ` : '32°C, '}
                    {weatherContext?.current?.condition || 'chance of rain'}.
                  </strong>{' '}
                  Good day for field inspection.
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">🌾</span>
                <span>
                  Wheat at <strong className="text-gray-800 dark:text-gray-200">₹2,450/q</strong> — up 2.4% at local mandi.
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">🐛</span>
                <span>
                  <strong className="text-gray-800 dark:text-gray-200">Rust & pest watch</strong> active — scan a leaf photo anytime.
                </span>
              </li>
            </ul>
            <Link
              to="/dashboard/disease-detection"
              className="focus-ring mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Scan a leaf →
            </Link>
          </Card>

          <Card variant="flat">
            <p className="font-display text-sm font-bold text-gray-900 dark:text-white">Try saying…</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {AI_SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  className="focus-ring rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-primary-300 hover:text-primary-700 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300"
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