import { Link } from 'react-router-dom';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
} from 'react-icons/fi';
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { MdSpa } from 'react-icons/md';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingFooter() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-[#05180f] text-gray-300">
      <div className="container-app py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-xl text-white">
                <MdSpa />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-white">
                  Kishan Sathi
                </span>
                <span className="block text-[10px] font-medium text-primary-400">
                  {t('footerTagline', 'Farmers Today, A Greener Tomorrow')}
                </span>
              </div>
            </Link>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              {t('footerQuickLinks', 'Quick Links')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-400">
              <li>
                <a href="/#home" className="transition hover:text-white">
                  {t('navHome', 'Home')}
                </a>
              </li>
              <li>
                <a href="/#features" className="transition hover:text-white">
                  {t('navFeatures', 'Features')}
                </a>
              </li>
              <li>
                <a href="/#about" className="transition hover:text-white">
                  {t('navAbout', 'About')}
                </a>
              </li>
              <li>
                <a href="/#contact" className="transition hover:text-white">
                  {t('navContact', 'Contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Platform */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              {t('footerOurPlatform', 'Our Platform')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/dashboard" className="transition hover:text-white">
                  {t('footerForFarmers', 'For Farmers')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/marketplace" className="transition hover:text-white">
                  {t('footerForCompanies', 'For Companies')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/consultation" className="transition hover:text-white">
                  {t('footerExpertNetwork', 'Expert Network')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/central-schemes" className="transition hover:text-white">
                  {t('footerGovSchemes', 'Government Schemes')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              {t('footerContactUs', 'Contact Us')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <FiMail className="shrink-0 text-primary-400" />
                <a href="mailto:support@kishansathi.in" className="hover:text-white">
                  support@kishansathi.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="shrink-0 text-primary-400" />
                <a href="tel:+919876543210" className="hover:text-white">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="shrink-0 text-primary-400" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Follow Us & Legal */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              {t('footerFollowUs', 'Follow Us')}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition hover:bg-primary-600 hover:text-white"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition hover:bg-primary-600 hover:text-white"
              >
                <FiInstagram className="text-sm" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition hover:bg-primary-600 hover:text-white"
              >
                <FiYoutube className="text-sm" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition hover:bg-primary-600 hover:text-white"
              >
                <FiLinkedin className="text-sm" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter X"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition hover:bg-primary-600 hover:text-white"
              >
                <FaXTwitter className="text-sm" />
              </a>
            </div>

            <div className="mt-5 flex flex-col gap-1.5 text-xs text-gray-400">
              <Link to="/about" className="hover:text-white">
                {t('footerPrivacy', 'Privacy Policy')}
              </Link>
              <Link to="/about" className="hover:text-white">
                {t('footerTerms', 'Terms & Conditions')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800/80 pt-6 text-center text-xs text-gray-400">
          <p>© {currentYear} Kishan Sathi. {t('footerRights', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
}
