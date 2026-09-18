import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  APPOINTMENT_SEED,
  CHAT_SEED,
  CONSULT_TYPES,
  DEFAULT_SELECTED_EXPERT,
  EXPERTS,
  REVIEWS,
  SPECIALTIES,
  TOPIC_OPTIONS,
  getAvailableSlots,
  dateLabel,
  fullDateLabel,
} from '@/data/mock/expertConsultation';

const APPOINTMENTS_KEY = 'ks_consult_appointments';
const CHAT_KEY = 'ks_expert_chat';
const RATINGS_KEY = 'ks_expert_ratings';

function load(key, fallback) {
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    if (stored !== null && stored !== undefined) return stored;
  } catch {
    // ignore corrupt storage
  }
  return fallback;
}

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

const ExpertContext = createContext(null);

export function ExpertProvider({ children }) {
  const [selectedExpertId, setSelectedExpertId] = useState(DEFAULT_SELECTED_EXPERT);
  const [appointments, setAppointments] = useState(() => load(APPOINTMENTS_KEY, APPOINTMENT_SEED));
  const [chat, setChat] = useState(() => load(CHAT_KEY, CHAT_SEED));
  const [myRatings, setMyRatings] = useState(() => load(RATINGS_KEY, []));

  useEffect(() => {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(CHAT_KEY, JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    localStorage.setItem(RATINGS_KEY, JSON.stringify(myRatings));
  }, [myRatings]);

  const selectedExpert = EXPERTS.find((e) => e.id === selectedExpertId) || EXPERTS[0];

  const upcoming = useMemo(
    () => appointments.filter((a) => a.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date)),
    [appointments]
  );
  const completed = useMemo(
    () => appointments.filter((a) => a.status === 'completed').sort((a, b) => b.date.localeCompare(a.date)),
    [appointments]
  );

  const bookAppointment = useCallback(({ expertId, type, date, time, topic }) => {
    const expert = EXPERTS.find((e) => e.id === expertId);
    const typeInfo = CONSULT_TYPES.find((t) => t.key === type);
    const price = Math.round((expert.rate * typeInfo.priceFactor) / 10) * 10;
    const newAppointment = {
      id: `apt-${Date.now()}`,
      expertId,
      date,
      fullDate: date === dateLabel(0) ? 'Today' : fullDateLabelFromLabel(date),
      time,
      type,
      topic,
      price,
      status: 'upcoming',
      duration: type === 'chat' ? 30 : 15,
      rating: null,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  }, []);

  const cancelAppointment = useCallback((id) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)));
  }, []);

  const sendMessage = useCallback((expertId, text) => {
    setChat((prev) => ({
      ...prev,
      [expertId]: [...(prev[expertId] || []), { id: Date.now(), from: 'farmer', text, time: nowTime() }],
    }));
  }, []);

  const submitRating = useCallback(({ appointmentId, expertId, rating }) => {
    setMyRatings((prev) => [{ id: `rt-${Date.now()}`, appointmentId, expertId, rating, date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) }, ...prev]);
    setAppointments((prev) => prev.map((a) => (a.id === appointmentId ? { ...a, rating } : a)));
  }, []);

  const getExpert = useCallback((id) => EXPERTS.find((e) => e.id === id) || EXPERTS[0], []);
  const getAppointment = useCallback((id) => appointments.find((a) => a.id === id), [appointments]);
  const getThread = useCallback((expertId) => chat[expertId] || [], [chat]);
  const getSlots = useCallback((expertId, date) => getAvailableSlots(expertId, date), []);

  const value = useMemo(
    () => ({
      experts: EXPERTS,
      specialties: SPECIALTIES,
      consultTypes: CONSULT_TYPES,
      topicOptions: TOPIC_OPTIONS,
      reviews: REVIEWS,
      selectedExpertId,
      setSelectedExpertId,
      selectedExpert,
      appointments,
      upcoming,
      completed,
      bookAppointment,
      cancelAppointment,
      sendMessage,
      submitRating,
      getExpert,
      getAppointment,
      getThread,
      getSlots,
      myRatings,
    }),
    [
      selectedExpertId,
      selectedExpert,
      appointments,
      upcoming,
      completed,
      bookAppointment,
      cancelAppointment,
      sendMessage,
      submitRating,
      getExpert,
      getAppointment,
      getThread,
      getSlots,
      myRatings,
    ]
  );

  return <ExpertContext.Provider value={value}>{children}</ExpertContext.Provider>;
}

function fullDateLabelFromLabel(label) {
  const today = dateLabel(0);
  if (label === today) return 'Today';
  const tomorrow = dateLabel(1);
  if (label === tomorrow) return 'Tomorrow';
  return fullDateLabel(2);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useExpert() {
  const ctx = useContext(ExpertContext);
  if (!ctx) throw new Error('useExpert must be used within an ExpertProvider');
  return ctx;
}