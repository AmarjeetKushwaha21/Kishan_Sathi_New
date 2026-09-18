import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiCheckCircle, FiClock, FiFileText, FiMapPin } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import SoilHeader from '@/components/soil/SoilHeader';
import StepIndicator from '@/components/soil/StepIndicator';
import { useSoilTest } from '@/context/SoilTestContext';
import { useFarmer } from '@/context/FarmerContext';
import { cn } from '@/utils/cn';

const TIME_SLOTS = ['8:00 AM', '9:30 AM', '11:00 AM', '2:30 PM', '4:00 PM', '5:30 PM'];
const SLOT_TYPES = ['Home sample pickup', 'Drop at lab'];

function nextDays(count) {
  const days = [];
  const start = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i + 1);
    days.push(d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }));
  }
  return days;
}

export default function Appointment() {
  const { selectedLab, selectedPackageInfo, bookAppointment } = useSoilTest();
  const { profile } = useFarmer();
  const [date, setDate] = useState(() => nextDays(7)[0]);
  const [time, setTime] = useState(TIME_SLOTS[1]);
  const [slotType, setSlotType] = useState(SLOT_TYPES[0]);
  const [serverError, setServerError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.fullName || 'Farmer',
      phone: profile?.phone?.replace(/\D/g, '').slice(-10) || '',
    },
  });

  async function onConfirm() {
    setServerError(null);
    setBusy(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const result = bookAppointment({ date, time, slot: slotType });
      setConfirmation(result);
    } catch (error) {
      setServerError(error.message || 'Could not book the appointment.');
    } finally {
      setBusy(false);
    }
  }

  if (confirmation) {
    return (
      <PageTransition>
        <SoilHeader title="Appointment Confirmed" showBack />
        <StepIndicator current="appointment" />

        <Card variant="tinted" className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-600 text-3xl text-white shadow-soft">
            <FiCheckCircle aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-gray-900">Booking confirmed</h3>
          <p className="mt-1 text-sm text-gray-500">
            {confirmation.booking.slot} on {confirmation.booking.date} at {confirmation.booking.time}.
          </p>

          <dl className="mt-5 space-y-2.5 rounded-2xl bg-white p-4 text-left text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Booking ID</dt><dd className="font-bold text-gray-900">{confirmation.booking.id}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Lab</dt><dd className="font-bold text-gray-900">{confirmation.booking.labName}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Package</dt><dd className="font-bold text-gray-900">{confirmation.booking.package}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Report ETA</dt><dd className="font-bold text-primary-700">~{selectedLab.turnaroundDays} days</dd></div>
          </dl>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link to="/dashboard/soil/report" className="focus-ring rounded-xl">
              <Button fullWidth leftIcon={FiFileText}>View soil report</Button>
            </Link>
            <Link to="/dashboard/soil/history" className="focus-ring rounded-xl">
              <Button variant="outline" fullWidth>View history</Button>
            </Link>
          </div>
        </Card>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SoilHeader title="Appointment" subtitle="Pick a date and time for sample collection" showBack />

      <StepIndicator current="appointment" />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <form onSubmit={handleSubmit(onConfirm)} noValidate className="space-y-5">
          {serverError && <Alert variant="error">{serverError}</Alert>}

          <Card variant="soft">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiCalendar className="text-primary-600" aria-hidden="true" /> Pick a date
            </h3>
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {nextDays(7).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={date === d}
                  onClick={() => setDate(d)}
                  className={cn(
                    'focus-ring shrink-0 rounded-xl border px-3 py-2.5 text-xs font-semibold transition',
                    date === d ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiClock className="text-primary-600" aria-hidden="true" /> Pick a time
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={time === t}
                  onClick={() => setTime(t)}
                  className={cn(
                    'focus-ring rounded-xl border px-3 py-2.5 text-xs font-semibold transition',
                    time === t ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <h3 className="mb-3 mt-6 font-display text-base font-semibold text-gray-900">Sample collection</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {SLOT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={slotType === type}
                  onClick={() => setSlotType(type)}
                  className={cn(
                    'focus-ring flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition',
                    slotType === type ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  )}
                >
                  <FiMapPin aria-hidden="true" /> {type}
                </button>
              ))}
            </div>
          </Card>

          <Card variant="soft">
            <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Farmer details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Farmer name" required error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
              <Input label="Phone number" type="tel" required error={errors.phone?.message} {...register('phone', { required: 'Phone is required', pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit number' } })} />
            </div>
          </Card>

          <Button type="submit" size="lg" fullWidth loading={busy} rightIcon={FiArrowRight}>
            Confirm booking
          </Button>
        </form>

        <Card variant="tinted" className="lg:sticky lg:top-24">
          <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Booking summary</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Lab</dt><dd className="font-semibold text-gray-900">{selectedLab.name}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Package</dt><dd className="font-semibold text-gray-900">{selectedPackageInfo.name}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Tests</dt><dd className="text-right font-semibold text-gray-900">{selectedPackageInfo.tests.length}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Date & time</dt><dd className="text-right font-semibold text-gray-900">{date}<br />{time}</dd></div>
            <div className="flex justify-between border-t border-primary-100 pt-3"><dt className="font-semibold text-gray-700">Price</dt><dd className="font-display text-lg font-bold text-primary-700">₹{selectedPackageInfo.price}</dd></div>
          </dl>
          <Badge variant="outline" className="mt-4">{selectedLab.turnaroundDays}-day report · {selectedLab.rating}★ rating</Badge>
        </Card>
      </div>
    </PageTransition>
  );
}