import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiCamera, FiCameraOff, FiChevronLeft, FiMaximize, FiMic, FiMicOff, FiMessageCircle, FiPhoneOff, FiX } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import VideoControl from '@/components/expert/VideoControl';
import { useExpert } from '@/context/ExpertContext';
import { cn } from '@/utils/cn';

function formatDuration(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function VideoCallUI() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { getAppointment, getExpert, upcoming, getThread } = useExpert();

  const appointment = getAppointment(appointmentId) || upcoming[0] || null;
  const expert = appointment ? getExpert(appointment.expertId) : getExpert(undefined);
  const thread = expert ? getThread(expert.id) : [];

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [quality, setQuality] = useState('HD');
  const [ended, setEnded] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (ended && timerRef.current) clearInterval(timerRef.current);
  }, [ended]);

  function endCall() {
    setEnded(true);
    setTimeout(() => navigate('/dashboard/consultation/history'), 1600);
  }

  if (ended) {
    return (
      <PageTransition>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-4xl text-primary-600">
            <FiPhoneOff aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-gray-900">Call ended</h2>
            <p className="mt-1 text-sm text-gray-500">Duration {formatDuration(seconds)} · with {expert?.name}</p>
          </div>
          <p className="text-xs text-gray-400">Taking you back to consultation history…</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gray-900 shadow-card">
        <div
          className="relative flex min-h-[70vh] flex-col items-center justify-center p-6"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(34,197,94,0.18), transparent 45%), radial-gradient(circle at 80% 30%, rgba(245,158,11,0.15), transparent 40%)',
            }}
          />

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Leave call"
            className="focus-ring absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setChatOpen(true)}
            aria-label="Open chat"
            className="focus-ring absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <FiMessageCircle aria-hidden="true" />
          </button>

          <div className="relative z-[5] flex flex-col items-center gap-4 text-center text-white">
            <span className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br text-6xl shadow-2xl ${expert.gradient}`} aria-hidden="true">
              {camOn ? expert.emoji : '🙈'}
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold">{expert.name}</h3>
              <p className="mt-1 text-sm text-white/70">{expert.short} · {appointment ? appointment.topic : 'Consultation'}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" aria-hidden="true" />
              Live · {formatDuration(seconds)}
            </div>
            <p className="text-[11px] text-white/60">Connection: {quality} · End-to-end encrypted</p>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-6 right-6 hidden h-40 w-28 overflow-hidden rounded-2xl border-2 border-white/30 shadow-xl sm:block"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <div className="flex h-full w-full items-center justify-center bg-gray-800 text-4xl">
              {camOn ? '👨‍🌾' : '🙈'}
            </div>
            <p className="absolute bottom-1 left-2 text-[10px] font-semibold text-white">You</p>
          </div>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-3xl bg-gray-900/60 p-3 backdrop-blur">
            <VideoControl icon={micOn ? FiMic : FiMicOff} label={micOn ? 'Mute microphone' : 'Unmute microphone'} active={!micOn} onClick={() => setMicOn((v) => !v)} />
            <VideoControl icon={camOn ? FiCamera : FiCameraOff} label={camOn ? 'Turn camera off' : 'Turn camera on'} active={!camOn} onClick={() => setCamOn((v) => !v)} />
            <VideoControl icon={FiMessageCircle} label="Chat" active={chatOpen} onClick={() => setChatOpen(true)} />
            <VideoControl icon={FiMaximize} label="Fullscreen" onClick={() => setQuality((q) => (q === 'HD' ? 'SD' : 'HD'))} />
            <VideoControl icon={FiPhoneOff} label="End call" danger onClick={endCall} />
          </div>
        </div>
      </div>

      {chatOpen && (
        <div className="mx-auto mt-4 max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <p className="font-display text-sm font-bold text-gray-900">Chat with {expert.short}</p>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat" className="focus-ring rounded-lg p-1 text-gray-400 hover:text-gray-600">
              <FiX aria-hidden="true" />
            </button>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto p-4">
            {thread.slice(-6).map((m) => (
              <div key={m.id} className={cn('flex', m.from === 'farmer' ? 'justify-end' : 'justify-start')}>
                <p className={cn('max-w-[75%] rounded-2xl px-3.5 py-2 text-sm', m.from === 'farmer' ? 'rounded-br-md bg-primary-600 text-white' : 'rounded-bl-md bg-gray-100 text-gray-800')}>
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  );
}