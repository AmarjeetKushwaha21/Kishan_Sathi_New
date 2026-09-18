import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiCheckCircle, FiPlus } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CROP_OPTIONS, CROP_IMAGES, QUALITY_GRADES } from '@/data/mock/marketplace';

const CROP_EMOJIS = {
  wheat: '🌾',
  paddy: '🍚',
  potato: '🥔',
  onion: '🧅',
  garlic: '🧄',
  gram: '🥣',
  beans: '🫘',
  arhardal: '🍲',
  maize: '🌽',
  mustard: '🌿',
  cotton: '🧵',
  soybean: '🌱',
  sugarcane: '🎋',
  bajra: '🌾',
};

export default function SellCrop() {
  const navigate = useNavigate();
  const { addListing } = useMarketplace();
  const [cropKey, setCropKey] = useState('wheat');
  const [organic, setOrganic] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(null);

  const crop = CROP_OPTIONS.find((c) => c.key === cropKey);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      crop: 'wheat',
      variety: CROP_OPTIONS[0].variety[0],
      quantity: '',
      pricePerQuintal: '',
      grade: 'A',
      location: '',
      harvestDate: '',
      description: '',
    },
  });

  function handleCropChange(key) {
    setCropKey(key);
    const next = CROP_OPTIONS.find((c) => c.key === key);
    setValue('crop', key);
    setValue('variety', next.variety[0], { shouldValidate: true });
  }

  function toggleCertification(cert) {
    setCertifications((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  }

  async function onSubmit(data) {
    setServerError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const listing = addListing({
        ...data,
        crop: crop?.label || data.crop || 'Wheat',
        cropKey,
        emoji: CROP_EMOJIS[cropKey] || '🌾',
        image: CROP_IMAGES[cropKey] || '/assets/crops/wheat.jpg',
        organic,
        certifications,
      });
      setSuccess(true);
      setTimeout(() => navigate(`/dashboard/marketplace/crop/${listing.id}`, { replace: true }), 1200);
    } catch (error) {
      setServerError(error.message);
    }
  }

  return (
    <PageTransition>
      <MarketplaceHeader title="Sell Crop" subtitle="List a new lot and receive offers from buyers" showBack />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {serverError && <Alert variant="error">{serverError}</Alert>}
          {success && <Alert variant="success" title="Listing published!">Your crop lot is now live on the marketplace.</Alert>}

          <Card variant="soft">
            <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Crop details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="label-base">Crop type</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CROP_OPTIONS.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => handleCropChange(c.key)}
                      aria-pressed={cropKey === c.key}
                      className={`focus-ring flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${
                        cropKey === c.key
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                      }`}
                    >
                      <span aria-hidden="true">{CROP_EMOJIS[c.key]}</span>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="label-base">Variety</span>
                <select {...register('variety', { required: 'Select a variety' })} className="input-base">
                  {crop.variety.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                {errors.variety && <p className="mt-1.5 text-xs text-red-500" role="alert">{errors.variety.message}</p>}
              </label>

              <Input
                label="Quantity (quintals)"
                type="number"
                min="1"
                placeholder="e.g. 45"
                required
                error={errors.quantity?.message}
                {...register('quantity', {
                  required: 'Quantity is required',
                  min: { value: 1, message: 'Minimum 1 quintal' },
                  validate: (v) => Number(v) <= 500 || 'Maximum 500 quintals per listing',
                })}
              />

              <Input
                label="Asking price per quintal (₹)"
                type="number"
                min="1"
                placeholder="e.g. 2450"
                required
                error={errors.pricePerQuintal?.message}
                {...register('pricePerQuintal', {
                  required: 'Price is required',
                  min: { value: 1, message: 'Enter a valid price' },
                })}
              />

              <label className="block">
                <span className="label-base">Quality grade</span>
                <select {...register('grade')} className="input-base">
                  {QUALITY_GRADES.map((g) => (
                    <option key={g} value={g}>{g} Grade</option>
                  ))}
                </select>
              </label>

              <Input
                label="Harvest / available date"
                type="date"
                required
                error={errors.harvestDate?.message}
                {...register('harvestDate', { required: 'Harvest date is required' })}
              />
            </div>
          </Card>

          <Card variant="soft">
            <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Location & description</h3>
            <div className="space-y-4">
              <Input
                label="Village / nearest market"
                placeholder="e.g. Village Khaira, Ludhiana"
                required
                error={errors.location?.message}
                {...register('location', { required: 'Location is required' })}
              />
              <label className="block">
                <span className="label-base">Description</span>
                <textarea
                  rows={4}
                  placeholder="Mention moisture, quality highlights, pickup availability…"
                  className="input-base resize-none"
                  {...register('description', { required: 'Add a short description', maxLength: { value: 300, message: 'Keep it under 300 characters' } })}
                />
                {errors.description && <p className="mt-1.5 text-xs text-red-500" role="alert">{errors.description.message}</p>}
              </label>
            </div>
          </Card>

          <Card variant="soft">
            <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Extras</h3>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setOrganic((v) => !v)}
                role="switch"
                aria-checked={organic}
                className="focus-ring flex w-full items-center justify-between rounded-xl border border-gray-200 p-4 text-left transition hover:border-primary-300"
              >
                <span>
                  <span className="block text-sm font-semibold text-gray-800">Organic produce</span>
                  <span className="block text-xs text-gray-500">Attracts premium buyers</span>
                </span>
                <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${organic ? 'bg-primary-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${organic ? 'left-[22px]' : 'left-0.5'}`} />
                </span>
              </button>

              <fieldset>
                <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Certifications</legend>
                <div className="flex flex-wrap gap-2">
                  {['FSSAI Grade A', 'Organic Certified', 'Traceable', 'Pesticide-free'].map((cert) => {
                    const selected = certifications.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleCertification(cert)}
                        aria-pressed={selected}
                        className={`focus-ring flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                          selected ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-500 hover:border-primary-300'
                        }`}
                      >
                        <FiCheckCircle aria-hidden="true" className={selected ? 'text-primary-600' : 'text-gray-300'} />
                        {cert}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </Card>

          <Button type="submit" size="lg" fullWidth loading={isSubmitting} leftIcon={FiPlus}>
            {isSubmitting ? 'Publishing…' : 'Publish listing'}
          </Button>
        </form>

        <Card variant="tinted" className="lg:sticky lg:top-24">
          <h3 className="mb-3 font-display text-base font-semibold text-gray-900">Listing preview</h3>
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-3xl" aria-hidden="true">
              {CROP_EMOJIS[cropKey] || '🌾'}
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{crop.label} · {watch('variety')}</p>
              <p className="text-xs text-gray-500">{watch('quantity') || '—'} quintals · {watch('grade')} grade</p>
              <p className="mt-1 font-display text-lg font-bold text-primary-700">
                ₹{Number(watch('pricePerQuintal')) ? Number(watch('pricePerQuintal')).toLocaleString('en-IN') : '—'}/quintal
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-gray-600">
            Your listing will be visible to verified companies and traders in {watch('location') || 'your region'}. Offers typically arrive within 48 hours.
          </p>
        </Card>
      </div>
    </PageTransition>
  );
}