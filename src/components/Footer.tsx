import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-black/80 border-t border-white/10 pt-12 pb-8 px-4 md:px-8 mt-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="DopaStopp" className="w-10 h-10 rounded-lg" />
            <span className="text-white font-black text-xl">DopaStopp</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t("منصة تعليمية وترفيهية حديثة تركز على استعادة التركيز والتعافي من إدمان العالم الرقمي.", "A modern educational and entertainment platform focused on reclaiming focus and recovering from digital addiction.")}
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6">{t("روابط سريعة", "Quick Links")}</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">{t("عن المنصة", "About")}</Link></li>
            <li><Link to="/blog" className="text-gray-400 hover:text-purple-400 transition-colors">{t("المدونة", "Blog")}</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-purple-400 transition-colors">{t("الأسئلة الشائعة", "FAQ")}</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">{t("اتصل بنا", "Contact Us")}</Link></li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-white font-bold mb-6">{t("الأدوات والاختبارات", "Tools & Tests")}</h4>
          <ul className="space-y-4">
            <li><Link to="/quiz/brain-rot" className="text-gray-400 hover:text-purple-400 transition-colors">{t("اختبار تعفن الدماغ", "Brain Rot Test")}</Link></li>
            <li><span className="text-gray-500 cursor-not-allowed">{t("إدمان الهاتف (قريباً)", "Phone Addiction (Soon)")}</span></li>
            <li><span className="text-gray-500 cursor-not-allowed">{t("عمر الدماغ (قريباً)", "Brain Age (Soon)")}</span></li>
            <li><span className="text-gray-500 cursor-not-allowed">{t("مدى الانتباه (قريباً)", "Attention Span (Soon)")}</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6">{t("النشرة البريدية", "Newsletter")}</h4>
          <p className="text-gray-400 text-sm mb-4">{t("اشترك للحصول على نصائح أسبوعية لتحسين تركيزك.", "Subscribe for weekly tips to improve your focus.")}</p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={t("بريدك الإلكتروني", "Your Email")} 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              {t("اشترك الآن", "Subscribe Now")}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">{t("سياسة الخصوصية", "Privacy Policy")}</Link>
          <Link to="/terms" className="hover:text-white transition-colors">{t("الشروط والأحكام", "Terms & Conditions")}</Link>
          <Link to="/disclaimer" className="hover:text-white transition-colors">{t("إخلاء المسؤولية", "Disclaimer")}</Link>
        </div>
        <p>© {new Date().getFullYear()} DopaStopp. {t("جميع الحقوق محفوظة.", "All rights reserved.")}</p>
      </div>
    </footer>
  );
};

export default Footer;
