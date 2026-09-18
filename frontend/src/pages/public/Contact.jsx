import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

import PublicHero from '@/components/public/PublicHero';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { APP } from '@/constants/app';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) return;
    setSent(true);
  }

  return (
    <>
      <PublicHero
        title="We'd love to hear from you"
        subtitle="Got a question, a story to share, or stuck in a field? Reach out — we are here to help."
        primaryLabel="Email us"
        primaryTo="/contact"
        secondaryLabel="Call us"
        secondaryTo="#"
        illustration={
          <span aria-hidden="true" className="text-6xl sm:text-7xl">
            💬
          </span>
        }
      />

      <section className="py-16 sm:py-20">
        <div className="container-app">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h2 className="font-display text-xl font-bold text-gray-900">Send us a message</h2>

              {sent ? (
                <div className="rounded-2xl border border-primary-200 bg-primary-50/60 p-6 text-center">
                  <div
                    aria-hidden="true"
                    className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600"
                  >
                    <FiSend />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-gray-900">
                    Message sent!
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    We will get back to you within 24 hours on {values.email}.
                  </p>
                </div>
              ) : (
                <>
                  <Input
                    label="Name"
                    name="name"
                    required
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  <div>
                    <label className="label-base">Message</label>
                    <textarea
                      name="message"
                      required
                      value={values.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      rows={5}
                      className="input-base"
                    />
                  </div>
                  <Button type="submit" rightIcon={FiSend}>
                    Send message
                  </Button>
                </>
              )}
            </form>

            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-gray-900">Contact details</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Our support team is available 7 AM – 9 PM, all days.
                </p>
              </div>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <FiPhone className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  <span>+91 1800 123 4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiMail className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  <span>{APP.supportEmail}</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  <span>
                    AgriTech Innovation Hub,
                    <br />
                    Ludhiana, Punjab, India
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
