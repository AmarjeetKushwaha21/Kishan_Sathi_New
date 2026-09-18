import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FiMail,
  FiBriefcase,
  FiAward,
  FiHeart,
  FiCheckCircle,
} from 'react-icons/fi';
import { MdAccountBalance, MdHandshake } from 'react-icons/md';
import { useLanguage } from '@/context/LanguageContext';
import contactService from '@/services/contactService';
import collaborationService from '@/services/collaborationService';
import { SproutIllustration } from './LandingIllustrations';

export default function ContactCollaborateSection() {
  const { t } = useLanguage();
  const [contactSuccess, setContactSuccess] = useState(false);
  const [collabSuccess, setCollabSuccess] = useState(false);
  const [selectedCollab, setSelectedCollab] = useState('companies');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onContactSubmit = async (data) => {
    try {
      await contactService.submitContact(data);
      setContactSuccess(true);
      reset();
      setTimeout(() => setContactSuccess(false), 5000);
    } catch {
      // handled
    }
  };

  const onCollabSubmit = async () => {
    try {
      await collaborationService.submitCollaboration({ partnerType: selectedCollab });
      setCollabSuccess(true);
      setTimeout(() => setCollabSuccess(false), 5000);
    } catch {
      // handled
    }
  };

  const collabOptions = [
    {
      id: 'companies',
      title: t('collabOpt1Title', 'Companies / Buyers'),
      desc: t('collabOpt1Desc', 'Work with farmers directly'),
      icon: FiBriefcase,
    },
    {
      id: 'experts',
      title: t('collabOpt2Title', 'Experts'),
      desc: t('collabOpt2Desc', 'Share knowledge & guidance'),
      icon: FiAward,
    },
    {
      id: 'ngos',
      title: t('collabOpt3Title', 'NGOs'),
      desc: t('collabOpt3Desc', 'Support farmer communities'),
      icon: FiHeart,
    },
    {
      id: 'gov',
      title: t('collabOpt4Title', 'Government / Institutions'),
      desc: t('collabOpt4Desc', 'Collaborate for greater reach'),
      icon: MdAccountBalance,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-12 dark:bg-gray-950 sm:py-16">
      <div className="container-app">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {t('contactEyebrow', 'GET IN TOUCH')}
          </span>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t(
              'contactMainHeading',
              'Let’s Build a Stronger Agricultural Future Together'
            )}
          </h2>
        </div>

        {/* Two Columns Grid */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Left Card: Contact Us Form */}
          <div className="flex flex-col justify-between rounded-2xl border border-primary-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
                  <FiMail aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                    {t('contactCardTitle', 'Contact Us')}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                    {t('contactCardSubtitle', 'Have a question? We’d love to hear from you.')}
                  </p>
                </div>
              </div>

              {contactSuccess && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary-50 p-3 text-xs font-semibold text-primary-800 dark:bg-primary-950/60 dark:text-primary-300">
                  <FiCheckCircle className="text-base text-primary-600 dark:text-primary-400" />
                  <span>{t('contactSuccessAlert', 'Thank you! Your message has been sent successfully (Prototype mode).')}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onContactSubmit)} className="mt-6 space-y-3.5">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {t('fieldName', 'Name')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('namePlaceholder', 'Your name')}
                    className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
                    {...register('name', { required: true })}
                  />
                  {errors.name && <span className="text-[11px] text-red-500">Name is required</span>}
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {t('fieldEmail', 'Email')}
                    </label>
                    <input
                      type="email"
                      placeholder={t('emailPlaceholder', 'your@email.com')}
                      className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
                      {...register('email')}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {t('fieldPhone', 'Phone')}
                    </label>
                    <input
                      type="tel"
                      placeholder={t('phonePlaceholder', '+91 98765 43210')}
                      className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
                      {...register('phone', { required: true })}
                    />
                    {errors.phone && <span className="text-[11px] text-red-500">Phone is required</span>}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {t('fieldMessage', 'Message')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t('messagePlaceholder', 'Type your message here...')}
                    className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
                    {...register('message')}
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-semibold text-white shadow-soft transition-all hover:bg-primary-700 active:bg-primary-800 disabled:opacity-60 sm:text-sm"
                  >
                    {isSubmitting ? t('btnSending', 'Sending...') : t('btnSendMessage', 'Send Message →')}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Card: Collaborate With Us */}
          <div className="flex flex-col justify-between rounded-2xl border border-primary-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-2xl text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
                  <MdHandshake aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                    {t('collabCardTitle', 'Collaborate With Us')}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                    {t('collabCardSubtitle', 'Partner with us to create a bigger impact.')}
                  </p>
                </div>
              </div>

              {collabSuccess && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary-50 p-3 text-xs font-semibold text-primary-800 dark:bg-primary-950/60 dark:text-primary-300">
                  <FiCheckCircle className="text-base text-primary-600 dark:text-primary-400" />
                  <span>Partnership inquiry recorded! Our team will contact you.</span>
                </div>
              )}

              {/* 4 Options Grid */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {collabOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedCollab === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedCollab(opt.id)}
                      className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50/70 shadow-sm dark:border-primary-500 dark:bg-primary-950/40'
                          : 'border-gray-200 bg-white hover:border-primary-300 dark:border-gray-800 dark:bg-gray-800/60'
                      }`}
                    >
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-sm text-primary-700 dark:bg-primary-900/60 dark:text-primary-300">
                        <Icon aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white sm:text-sm">
                          {opt.title}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={onCollabSubmit}
                  className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-semibold text-white shadow-soft transition-all hover:bg-primary-700 active:bg-primary-800 sm:w-auto sm:text-sm"
                >
                  <span>{t('btnStartCollab', 'Start a Collaboration →')}</span>
                </button>

                {/* Right Visual Annotation matching design */}
                <div className="flex items-center gap-2 text-right">
                  <div className="font-display text-xs font-extrabold italic text-gray-700 dark:text-gray-300">
                    <p className="text-primary-700 dark:text-primary-300">Together</p>
                    <p>for a Greener</p>
                    <p className="text-gray-900 dark:text-white">Tomorrow</p>
                  </div>
                  <SproutIllustration className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
