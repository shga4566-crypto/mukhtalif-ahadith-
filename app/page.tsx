"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Search, Book, Tag, MoonStar, Settings, X, Type, BookOpen, ChevronRight, LayoutTemplate, Sparkles, User, Mail, Send, MessageCircle, Palette, Sun, Moon, Bell, BellRing, Info, Zap, LogOut, Share2, Check } from 'lucide-react';
import data from '../lib/data.json';
import appLogo from '../src/assets/images/app_logo_1779244033971.png';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'ps' | 'fa' | 'ar';
type FontSize = 'normal' | 'large' | 'xlarge';
type ThemePattern = 'geometric' | 'minimal' | 'ornate';
type ThemeColor = 'emerald' | 'amber' | 'rose';

const themes = {
  amber: {
    headerBg: 'from-[#1a120b] via-[#3a2a18] to-[#1a120b] border-b border-[#d4af37]/30 text-white',
    headerIconBg: 'bg-[#d4af37]/20 border-[#d4af37]/40 text-[#d4af37]',
    headerInputBg: 'bg-black/40 border-[#d4af37]/45 placeholder-[#d4af37]/60 text-[#f5e0a3] focus:ring-[#d4af37] focus:bg-black/60',
    btnActive: 'bg-[#d4af37] text-[#1a120b] shadow-lg shadow-[#d4af37]/20',
    btnInactive: 'text-amber-200/80 hover:text-white hover:bg-[#d4af37]/15 bg-black/30 border-amber-500/20',
    settingsBtn: 'bg-black/30 border-amber-500/20 text-amber-200 hover:text-white hover:bg-amber-900/50',
    bgLight: 'bg-amber-100/40',
    textMain: 'text-[#d4af37]',
    borderHover: 'hover:border-[#d4af37]',
    catActive: 'bg-gradient-to-r from-[#d4af37] to-[#bfa12a] text-amber-950 shadow-lg shadow-[#d4af37]/25',
    borderTop: 'from-[#d4af37] via-amber-400 to-[#d4af37]',
    tagBg: 'bg-amber-50 text-[#845e1a] border-[#d4af37]/25',
    iconText: 'text-[#d4af37]',
    bgLightSoft: 'bg-amber-50/65',
    borderSoft: 'border-amber-200/20',
    textDark: 'text-amber-950',
    borderSolid: 'border-[#d4af37]',
    iconColorLight: 'text-amber-400',
  },
  rose: {
    headerBg: 'from-[#220710] via-[#431221] to-[#220710] border-b border-rose-500/30 text-white',
    headerIconBg: 'bg-rose-500/20 border-rose-500/40 text-[#ffb3c6]',
    headerInputBg: 'bg-black/40 border-rose-500/40 placeholder-rose-300/60 text-[#ffccd5] focus:ring-rose-500 focus:bg-black/60',
    btnActive: 'bg-rose-500 text-white shadow-lg shadow-rose-500/25',
    btnInactive: 'text-rose-200/85 hover:text-white hover:bg-rose-500/20 bg-black/30 border-rose-950/20',
    settingsBtn: 'bg-black/30 border-rose-950/20 text-rose-200 hover:text-white hover:bg-rose-900/50',
    bgLight: 'bg-rose-50',
    textMain: 'text-rose-600',
    borderHover: 'hover:border-rose-500',
    catActive: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/30',
    borderTop: 'from-rose-500 via-pink-400 to-rose-500',
    tagBg: 'bg-rose-50 text-rose-850 border-rose-200/45',
    iconText: 'text-rose-500',
    bgLightSoft: 'bg-rose-50/40',
    borderSoft: 'border-rose-100/30',
    textDark: 'text-rose-950',
    borderSolid: 'border-rose-500',
    iconColorLight: 'text-rose-400',
  },
  emerald: {
    headerBg: 'from-[#042416] via-[#093c25] to-[#042416] border-b border-[#10b981]/30 text-white',
    headerIconBg: 'bg-[#10b981]/20 border-[#10b981]/40 text-[#10b981]',
    headerInputBg: 'bg-black/40 border-[#10b981]/40 placeholder-emerald-300/60 text-[#c1f2dd] focus:ring-[#10b981] focus:bg-black/60',
    btnActive: 'bg-[#10b981] text-teal-950 shadow-lg shadow-[#10b981]/25',
    btnInactive: 'text-emerald-200/85 hover:text-white hover:bg-[#10b981]/20 bg-black/30 border-emerald-950/20',
    settingsBtn: 'bg-black/30 border-emerald-900/20 text-emerald-200 hover:text-white hover:bg-emerald-900/50',
    bgLight: 'bg-emerald-50',
    textMain: 'text-emerald-700',
    borderHover: 'hover:border-[#10b981]',
    catActive: 'bg-gradient-to-r from-[#10b981] to-[#059669] text-[#022c1b] shadow-lg shadow-emerald-500/25',
    borderTop: 'from-[#10b981] via-emerald-400 to-[#10b981]',
    tagBg: 'bg-emerald-50 text-emerald-800 border-emerald-250/30',
    iconText: 'text-[#10b981]',
    bgLightSoft: 'bg-emerald-50/40',
    borderSoft: 'border-emerald-200/30',
    textDark: 'text-emerald-950',
    borderSolid: 'border-[#10b981]',
    iconColorLight: 'text-emerald-400',
  }
};

const RubElHizb = ({ number, isDark, textMain }: { number: string | number; isDark: boolean; textMain: string }) => (
  <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 select-none shrink-0">
    <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:rotate-[135deg] ${isDark ? 'text-[#d4af37]' : textMain}`}>
      {/* Dynamic 8-point Islamic star with double offset borders for luxury depth */}
      <rect x="22" y="22" width="56" height="56" rx="6" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="3" />
      <rect x="22" y="22" width="56" height="56" rx="6" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="3" className="transform rotate-45 origin-center" />
      <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
    <span className={`relative z-10 font-bold text-center text-sm md:text-base ${isDark ? 'text-amber-200' : 'text-neutral-800'} font-mono`}>
      {number}
    </span>
  </div>
);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLang, setActiveLang] = useState<Language>('ps');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [themePattern, setThemePattern] = useState<ThemePattern>('geometric');
  const [themeColor, setThemeColor] = useState<ThemeColor>('amber');
  const [readingMode, setReadingMode] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Custom theme mode (light/dark)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  // Daily notification switch status
  const [notificationActive, setNotificationActive] = useState<boolean>(false);
  // Custom preview notification state
  const [testNotificationToast, setTestNotificationToast] = useState<{ show: boolean; title: string; body: string }>({
    show: false,
    title: '',
    body: '',
  });
  const [hasExited, setHasExited] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedHadithId, setCopiedHadithId] = useState<number | null>(null);



  const handleShare = async (hadith: any) => {
    const textToShare = `✨ ${hadith.text.ar}\n\n📖 ${hadith.text[activeLang]}\n\n📚 ${hadith.source.name} - ${hadith.source.ref}\n✍️ ${hadith.narrator[activeLang] || hadith.narrator['ar']}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: activeLang === 'ps' ? 'مبارک حدیث' : activeLang === 'fa' ? 'حدیث مبارک' : 'الحديث الشريف',
          text: textToShare,
        });
        return;
      } catch (err) {
        console.log('Share API error, trying copy instead', err);
      }
    }

    try {
      await navigator.clipboard.writeText(textToShare);
      setCopiedHadithId(hadith.id);
      setTimeout(() => {
        setCopiedHadithId(null);
      }, 2000);
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  };

  // Safe deferred state initialization from localStorage after mounting
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    const savedNotify = localStorage.getItem('notificationActive') === 'true';
    const timer = setTimeout(() => {
      setMounted(true);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeMode(savedTheme);
      }
      setNotificationActive(savedNotify);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Synchronize document element with dark class for Tailwind dark: prefixes and keep margins in sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      const body = window.document.body;
      if (themeMode === 'dark') {
        root.classList.add('dark');
        body.classList.add('dark');
        if (themeColor === 'amber') {
          body.style.backgroundColor = '#120a06';
        } else if (themeColor === 'rose') {
          body.style.backgroundColor = '#110207';
        } else {
          body.style.backgroundColor = '#020e08';
        }
      } else {
        root.classList.remove('dark');
        body.classList.remove('dark');
        body.style.backgroundColor = '#ffffff';
      }
    }
  }, [themeMode, themeColor]);

  const t = themes[themeColor];
  const isDark = themeMode === 'dark';

  const c = useMemo(() => {
    if (isDark) {
      if (themeColor === 'amber') {
        return {
          bgPage: 'bg-[#120a06] text-[#fbf0df]',
          bgCard: 'bg-[#1c130b] border-[#422e1a]',
          borderCard: 'border-[#422e1a]/80',
          bgBadge: 'bg-[#312011] text-amber-200',
          textCard: 'text-[#fbf0df]',
          textMuted: 'text-amber-200/50',
          bgModal: 'bg-[#180f07]',
          borderModal: 'border-[#5a4025]',
          bgInput: 'bg-black/45 border-[#422e1a] text-[#fbf0df]',
          headerBg: 'from-[#120a06] via-[#22160b] to-[#120a04] border-[#d4af37]/30 text-white',
          headerText: 'text-white',
          headerSubText: 'text-amber-300/80',
          headerBismillah: 'text-yellow-100/50',
          headerLogoBorder: 'border-[#d4af37]/45 bg-amber-950/45',
          headerLangBg: 'bg-black/40 border border-amber-950/40',
          btnActive: 'bg-gradient-to-r from-[#d4af37] via-[#f5cf53] to-[#d4af37] text-amber-950 shadow-md shadow-amber-500/10',
          btnInactive: 'text-amber-200/60 hover:text-white hover:bg-[#d4af37]/10',
          headerCardBg: 'bg-[#120a06]/70 border-[#d4af37]/20 text-[#fbf0df]',
          headerInputBg: 'bg-black/50 border-[#d4af37]/30 text-[#f5e0a3] placeholder-[#d4af37]/50 focus:ring-amber-500',
          textAccent: 'text-amber-400',
          textAccentHover: 'hover:text-amber-300',
          borderMain: 'border-[#422e1a]',
        };
      } else if (themeColor === 'rose') {
        return {
          bgPage: 'bg-[#110207] text-[#ffe5e9]',
          bgCard: 'bg-[#1f0910] border-[#4c1626]',
          borderCard: 'border-[#4c1626]/80',
          bgBadge: 'bg-[#340f1a] text-rose-200',
          textCard: 'text-[#ffe5e9]',
          textMuted: 'text-rose-200/50',
          bgModal: 'bg-[#1a050b]',
          borderModal: 'border-[#661e33]',
          bgInput: 'bg-black/45 border-[#4c1626] text-[#ffe5e9]',
          headerBg: 'from-[#110207] via-[#290b15] to-[#110207] border-rose-500/30 text-white',
          headerText: 'text-white',
          headerSubText: 'text-rose-300/80',
          headerBismillah: 'text-rose-200/50',
          headerLogoBorder: 'border-rose-450/45 bg-rose-950/45',
          headerLangBg: 'bg-black/40 border border-rose-950/40',
          btnActive: 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white shadow-[#ffb3c6]/10',
          btnInactive: 'text-rose-200/60 hover:text-white hover:bg-rose-500/10',
          headerCardBg: 'bg-[#110207]/70 border-rose-500/20 text-[#ffe5e9]',
          headerInputBg: 'bg-black/50 border-rose-500/30 text-[#ffd5de] placeholder-rose-400/50 focus:ring-rose-500',
          textAccent: 'text-rose-450',
          textAccentHover: 'hover:text-rose-350',
          borderMain: 'border-[#4c1626]',
        };
      } else {
        return {
          bgPage: 'bg-[#020e08] text-[#e0fbf0]',
          bgCard: 'bg-[#061d12] border-[#103d25]',
          borderCard: 'border-[#103d25]/80',
          bgBadge: 'bg-[#0a2919] text-emerald-200',
          textCard: 'text-[#e0fbf0]',
          textMuted: 'text-emerald-200/50',
          bgModal: 'bg-[#04140c]',
          borderModal: 'border-[#175233]',
          bgInput: 'bg-black/45 border-[#103d25] text-[#e0fbf0]',
          headerBg: 'from-[#020e08] via-[#0b291a] to-[#020e08] border-emerald-500/30 text-white',
          headerText: 'text-white',
          headerSubText: 'text-emerald-300/80',
          headerBismillah: 'text-emerald-200/50',
          headerLogoBorder: 'border-emerald-450/45 bg-emerald-950/45',
          headerLangBg: 'bg-black/40 border border-emerald-950/40',
          btnActive: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-teal-950 shadow-[#10b981]/10',
          btnInactive: 'text-emerald-200/60 hover:text-white hover:bg-[#10b981]/10',
          headerCardBg: 'bg-[#020e08]/70 border-emerald-500/20 text-[#e0fbf0]',
          headerInputBg: 'bg-black/50 border-emerald-500/30 text-[#e3fcf0] placeholder-[#10b981]/50 focus:ring-emerald-500',
          textAccent: 'text-emerald-400',
          textAccentHover: 'hover:text-emerald-350',
          borderMain: 'border-[#103d25]',
        };
      }
    } else {
      // Light Mode (High Contrast & Airy Elegance)
      if (themeColor === 'amber') {
        return {
          bgPage: 'bg-white text-neutral-900',
          bgCard: 'bg-white border-amber-200 shadow-[0_12px_45px_rgba(212,175,55,0.06)] hover:shadow-[0_12px_45px_rgba(212,175,55,0.1)] transition-all duration-300',
          borderCard: 'border-amber-250/50',
          bgBadge: 'bg-amber-100/40 text-amber-950',
          textCard: 'text-[#442c05]',
          textMuted: 'text-amber-800/60',
          bgModal: 'bg-white',
          borderModal: 'border-amber-300/70',
          bgInput: 'bg-white border-amber-300 text-amber-950',
          headerBg: 'from-white via-white to-white border-b border-amber-250/50 shadow-[0_10px_40px_rgba(212,175,55,0.06)] text-neutral-900',
          headerText: 'text-amber-950',
          headerSubText: 'text-amber-800/85',
          headerBismillah: 'text-amber-700/65',
          headerLogoBorder: 'border-amber-300 bg-white shadow-sm',
          headerLangBg: 'bg-amber-100/30 border border-amber-200/40',
          btnActive: 'bg-gradient-to-r from-amber-500 via-amber-450 to-amber-550 text-white shadow-md shadow-amber-600/20',
          btnInactive: 'text-amber-900/75 hover:text-amber-950 hover:bg-amber-300/15',
          headerCardBg: 'bg-white border border-amber-200/50 shadow-sm text-amber-950',
          headerInputBg: 'bg-white border-amber-250 text-amber-950 placeholder-amber-700/50 focus:ring-amber-500',
          textAccent: 'text-amber-700',
          textAccentHover: 'hover:text-amber-600',
          borderMain: 'border-amber-200',
        };
      } else if (themeColor === 'rose') {
        return {
          bgPage: 'bg-white text-neutral-900',
          bgCard: 'bg-white border-rose-200 shadow-[0_12px_45px_rgba(244,63,94,0.06)] hover:shadow-[0_12px_45px_rgba(244,63,94,0.1)] transition-all duration-300',
          borderCard: 'border-rose-250/50',
          bgBadge: 'bg-rose-100/40 text-rose-950',
          textCard: 'text-[#500e1e]',
          textMuted: 'text-rose-800/60',
          bgModal: 'bg-white',
          borderModal: 'border-rose-300/70',
          bgInput: 'bg-white border-rose-300 text-rose-950',
          headerBg: 'from-white via-white to-white border-b border-rose-250/50 shadow-[0_10px_40px_rgba(244,63,94,0.06)] text-neutral-900',
          headerText: 'text-rose-950',
          headerSubText: 'text-rose-800/85',
          headerBismillah: 'text-rose-700/65',
          headerLogoBorder: 'border-rose-300 bg-white shadow-sm',
          headerLangBg: 'bg-rose-100/30 border border-rose-200/40',
          btnActive: 'bg-gradient-to-r from-rose-500 via-rose-450 to-rose-550 text-white shadow-md shadow-rose-600/25',
          btnInactive: 'text-rose-900/75 hover:text-rose-955 hover:bg-rose-300/15',
          headerCardBg: 'bg-white border border-rose-200/50 shadow-sm text-rose-955',
          headerInputBg: 'bg-white border-rose-250 text-rose-950 placeholder-rose-700/50 focus:ring-rose-500',
          textAccent: 'text-rose-700',
          textAccentHover: 'hover:text-rose-600',
          borderMain: 'border-rose-200',
        };
      } else {
        return {
          bgPage: 'bg-white text-neutral-900',
          bgCard: 'bg-white border-emerald-200 shadow-[0_12px_45px_rgba(16,185,129,0.06)] hover:shadow-[0_12px_45px_rgba(16,185,129,0.1)] transition-all duration-300',
          borderCard: 'border-emerald-250/50',
          bgBadge: 'bg-emerald-100/40 text-[#074224]',
          textCard: 'text-[#06331c]',
          textMuted: 'text-emerald-850/60',
          bgModal: 'bg-white',
          borderModal: 'border-emerald-300/70',
          bgInput: 'bg-white border-emerald-300 text-emerald-950',
          headerBg: 'from-white via-white to-white border-b border-emerald-250/50 shadow-[0_10px_40px_rgba(16,185,129,0.06)] text-neutral-900',
          headerText: 'text-emerald-950',
          headerSubText: 'text-emerald-800/85',
          headerBismillah: 'text-emerald-700/65',
          headerLogoBorder: 'border-emerald-300 bg-white shadow-sm',
          headerLangBg: 'bg-emerald-100/30 border border-[#10b981]/20',
          btnActive: 'bg-gradient-to-r from-emerald-500 via-emerald-450 to-emerald-555 text-white shadow-md shadow-emerald-600/25',
          btnInactive: 'text-emerald-900/75 hover:text-emerald-955 hover:bg-emerald-300/15',
          headerCardBg: 'bg-white border border-emerald-200/50 shadow-sm text-emerald-955',
          headerInputBg: 'bg-white border-emerald-250 text-emerald-950 placeholder-emerald-700/50 focus:ring-emerald-500',
          textAccent: 'text-emerald-700',
          textAccentHover: 'hover:text-emerald-600',
          borderMain: 'border-emerald-200',
        };
      }
    }
  }, [isDark, themeColor]);

  // Set local storage values on modification
  const changeThemeMode = (mode: 'light' | 'dark') => {
    setThemeMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
    }
  };

  const changeNotification = (active: boolean) => {
    setNotificationActive(active);
    if (typeof window !== 'undefined') {
      localStorage.setItem('notificationActive', active ? 'true' : 'false');
      
      if (active) {
        // Safe check for native notification API
        try {
          if ('Notification' in window) {
            Notification.requestPermission().catch(() => {});
          }
        } catch (e) {
          console.log('Native notifications blocked in sandbox, using simulated notifications.', e);
        }

        // Show immediate beautiful simulated notification toast to verify operation
        const randomHadith = data.hadiths[Math.floor(Math.random() * data.hadiths.length)];
        setTestNotificationToast({
          show: true,
          title: activeLang === 'ps' ? '۲۴ ساعته حدیث خبرتیاوې فعالې شوې' : activeLang === 'fa' ? 'اعلان‌های ۲۴ ساعته فعال شد' : 'الاشعارات اليومية مفعلة',
          body: activeLang === 'ps' ? 'سیسټم فعال شو! هره ورځ به تاسو ته یو مبارک حدیث استول کیږي.' : activeLang === 'fa' ? 'سیستم فعال شد! هر روز یک حدیث مبارک به شما ارسال خواهد شد.' : 'تم تفعيل الخدمة بنجاح! سيتم إرسال حديث شريف يومياً.',
        });
        
        setTimeout(() => {
          setTestNotificationToast(p => ({ ...p, show: false }));
        }, 5000);
      }
    }
  };

  // Automated 24-hour background simulated notification trigger
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastCheck = localStorage.getItem('lastNotificationTime');
      const now = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;
      
      if (lastCheck) {
        const diff = now - parseInt(lastCheck);
        if (diff >= oneDayMs && localStorage.getItem('notificationActive') === 'true') {
          const randomHadith = data.hadiths[Math.floor(Math.random() * data.hadiths.length)];
          setTimeout(() => {
            setTestNotificationToast({
              show: true,
              title: activeLang === 'ps' ? 'د ۲۴ ساعتونو وروستی حدیث' : activeLang === 'fa' ? 'نعمت ۲۴ ساعت حدیث روزانه' : 'الحديث اليومي لـ ٢٤ ساعة',
              body: randomHadith.text[activeLang] || randomHadith.text['ps'],
            });
          }, 100);
          localStorage.setItem('lastNotificationTime', now.toString());
        }
      } else {
        localStorage.setItem('lastNotificationTime', now.toString());
      }
    }
  }, [activeLang]);

  // Immediate notification trigger for test button
  const triggerDailyNotification = () => {
    if (typeof window !== 'undefined') {
      try {
        // Native Web Notification
        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            const randomHadith = data.hadiths[Math.floor(Math.random() * data.hadiths.length)];
            const text = randomHadith.text[activeLang] || randomHadith.text['ps'];
            new Notification(activeLang === 'ps' ? 'د نن ورځې مبارک حدیث ﷺ' : activeLang === 'fa' ? 'حدیث مبارک امروز' : 'الحديث الشريف اليومي ﷺ', {
              body: text,
            });
          } else {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                const randomHadith = data.hadiths[Math.floor(Math.random() * data.hadiths.length)];
                const text = randomHadith.text[activeLang] || randomHadith.text['ps'];
                new Notification(activeLang === 'ps' ? 'د نن ورځې مبارک حدیث ﷺ' : activeLang === 'fa' ? 'حدیث مبارک امروز' : 'الحديث الشريف اليومي ﷺ', {
                  body: text,
                });
              }
            });
          }
        }
      } catch (e) {
        console.log('Native notification construction skipped due to browser container restrictions.', e);
      }
    }

    // Interactive Toast Demonstration on Screen
    const randomHadith = data.hadiths[Math.floor(Math.random() * data.hadiths.length)];
    setTestNotificationToast({
      show: true,
      title: activeLang === 'ps' ? 'د نن ورځې خبرتیا (په هرو ۲4 ساعتونو کې راځي)' : activeLang === 'fa' ? 'نمونه اعلان روزانه (هر ۲4 ساعت)' : activeLang === 'ar' ? 'إشعار اليوم (يصل كل ٢٤ ساعة)' : 'Daily Notification Triggered',
      body: randomHadith.text[activeLang] || randomHadith.text['ps'],
    });

    setTimeout(() => {
      setTestNotificationToast(p => ({ ...p, show: false }));
    }, 7000);
  };

  // Filter hadiths based on search term and category
  const filteredHadiths = useMemo(() => {
    return data.hadiths.filter((hadith) => {
      const category = data.categories.find(c => c.id === hadith.category_id);
      
      const searchMatch = 
        hadith.text[activeLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        hadith.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (category && category.name[activeLang].toLowerCase().includes(searchTerm.toLowerCase()));

      const categoryMatch = activeCategory === null || hadith.category_id === activeCategory;

      return searchMatch && categoryMatch;
    });
  }, [searchTerm, activeCategory, activeLang]);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-xl md:text-2xl leading-relaxed';
      case 'xlarge': return 'text-2xl md:text-3xl leading-relaxed';
      default: return 'text-lg md:text-xl leading-relaxed';
    }
  };

  const getArabicFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-3xl md:text-4xl leading-loose';
      case 'xlarge': return 'text-4xl md:text-5xl leading-loose';
      default: return 'text-2xl md:text-3xl leading-loose';
    }
  };

  const getPatternClass = () => {
    switch (themePattern) {
      case 'geometric': return 'bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]';
      case 'ornate': return 'bg-[linear-gradient(45deg,#ffffff11_25%,transparent_25%),linear-gradient(-45deg,#ffffff11_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ffffff11_75%),linear-gradient(-45deg,transparent_75%,#ffffff11_75%)] [background-size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px] opacity-25';
      default: return '';
    }
  };

  const isRtl = activeLang === 'ar' || activeLang === 'fa' || activeLang === 'ps';

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0e0703] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (hasExited) {
    return (
      <div className={`min-h-screen ${c.bgPage} flex flex-col items-center justify-center p-6 text-center`} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center mb-6 border border-amber-500/30">
            <MoonStar className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`} style={{ fontFamily: 'var(--font-amiri), serif' }}>
            {activeLang === 'ps' ? 'په خیر لاړئ' : activeLang === 'fa' ? 'به سلامت' : activeLang === 'ar' ? 'في أمان الله' : 'Goodbye'}
          </h1>
          <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-neutral-500'} mb-8 leading-relaxed`}>
            {activeLang === 'ps' ? 'تاسو له اپلیکیشن څخه بریالي بهر شوئ. تاسو کولی شئ دا پاڼه وتړئ.' : activeLang === 'fa' ? 'شما با موفقیت از برنامه خارج شدید. اکنون می‌توانید این صفحه را ببندید.' : activeLang === 'ar' ? 'لقد غادرت التطبيق بنجاح. يمكنك إغلاق هذه الصفحة الآن.' : 'You have exited the application. You can safely close this page.'}
          </p>
          <button
            onClick={() => setHasExited(false)}
            className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
              isDark ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20' : 'bg-neutral-900 hover:bg-neutral-800 text-white'
            }`}
          >
            {activeLang === 'ps' ? 'بېرته اپلیکیشن ته تلل' : activeLang === 'fa' ? 'بازگشت به برنامه' : activeLang === 'ar' ? 'العودة للتطبيق' : 'Return to App'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${c.bgPage} font-sans selection:bg-[#d4af37]/30 flex flex-col`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Welcome Splash / Entrance Screen */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05, filter: "blur(12px)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 select-none bg-[#0e0703]/95"
          >
            {/* Islamic Geometric Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#d4af3715_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-80" />
            
            {/* Glowing Islamic Frame Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
              className="w-full max-w-lg bg-gradient-to-br from-[#2a1b10] via-[#1a0f07] to-[#120a04] border border-[#d4af37]/40 p-8 rounded-[3rem] shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden flex flex-col items-center text-center gap-6"
            >
              {/* Top glowing line decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              
              {/* Logo with double glowing borders */}
              <div className="relative w-24 h-24 p-1.5 rounded-full border-2 border-dashed border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-black/40 flex items-center justify-center">
                <Image 
                  src={appLogo} 
                  alt="Hadith Application Logo" 
                  className="w-18 h-18 object-contain rounded-full"
                  priority
                />
              </div>

              {/* Calligraphy Callout */}
              <div className="text-amber-200/80 font-serif text-xl tracking-widest mt-2 select-none" style={{ fontFamily: 'var(--font-amiri), serif' }}>
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>

              {/* Major Welcome Text */}
              <h1 
                className="text-3xl md:text-3xl font-extrabold text-[#f3d078] leading-normal font-serif drop-shadow-md select-text"
                style={{ fontFamily: 'var(--font-amiri), serif' }}
              >
                داحادیثوټواګی ته ښه راغلاست
              </h1>

              <p className="text-amber-100/70 text-sm md:text-base leading-relaxed max-w-sm" style={{ fontFamily: 'var(--font-amiri), serif' }}>
                د رسول الله ﷺ د مبارکو احادیثو پښتو، فارسي او عربي ټولګه. په دې نسخه کې پوره {data.hadiths.length.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])} مبارک احادیث موندلی شئ.
              </p>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent my-1" />

              {/* Enter Button */}
              <button
                onClick={() => setShowWelcome(false)}
                className="w-full py-4 px-8 rounded-2xl font-bold text-lg text-[#1a120b] bg-gradient-to-r from-[#d4af37] via-[#f3d078] to-[#d4af37] hover:brightness-110 shadow-lg shadow-[#d4af37]/20 border border-[#fee6a3] cursor-pointer transition-all duration-350 flex items-center justify-center gap-3 active:scale-95 group"
              >
                <Sparkles className="w-5 h-5 text-amber-950 group-hover:animate-spin" />
                <span>داخلېدل</span>
                <ChevronRight className="w-5 h-5 text-amber-950 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Little copyright/blessing line */}
              <div className="text-[10px] text-amber-300/40 select-none uppercase tracking-widest mt-1">
                صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Mock Mobile Notification Lockscreen Toast */}
      <AnimatePresence>
        {testNotificationToast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: isRtl ? -50 : 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 ${isRtl ? 'left-6' : 'right-6'} z-50 max-w-sm w-full bg-neutral-900/95 backdrop-blur-md rounded-2xl border border-neutral-800 text-white p-4 shadow-2xl flex items-start gap-4`}
          >
            <div className="bg-amber-500 rounded-xl p-2.5 flex items-center justify-center shadow-lg">
              <MoonStar className="text-neutral-950 w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-sans">
                  {activeLang === 'ps' ? 'نوې خبرتیا' : activeLang === 'fa' ? 'اعلان جدید' : 'إشعار الحديث'}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {activeLang === 'ps' ? 'همدا اوس' : activeLang === 'fa' ? 'اکنون' : 'الآن'}
                </span>
              </div>
              <h4 className="text-sm font-bold leading-snug">{testNotificationToast.title}</h4>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">{testNotificationToast.body}</p>
            </div>
            <button 
              onClick={() => setTestNotificationToast(p => ({ ...p, show: false }))}
              className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-850"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Section container */}
      <div className="flex-1 flex flex-col">
        {/* Header / Hero Section */}
      <AnimatePresence>
        {!readingMode && (
          <motion.header 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
            className={`relative overflow-hidden bg-gradient-to-br ${c.headerBg} shadow-2xl z-10 rounded-b-[2.5rem]`}
          >
            {/* Background Pattern */}
            <div className={`absolute inset-0 ${getPatternClass()}`}></div>
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/40' : 'from-[#10b981]/5'} to-transparent`}></div>

            <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
              
              {/* Sacred Bismillah Calligraphy */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-center font-serif text-lg md:text-xl ${c.headerBismillah} mb-5 tracking-widest selection:bg-transparent`}
                style={{ fontFamily: 'var(--font-amiri), serif' }}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </motion.div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-5"
                >
                  <div className={`relative flex items-center justify-center w-16 h-16 backdrop-blur-md rounded-2xl shadow-lg border overflow-hidden select-none shrink-0 ${c.headerLogoBorder}`}>
                    <Image 
                      src={appLogo} 
                      alt="د رسول الله مختلف احادیث Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className={`text-3xl md:text-5xl font-bold font-serif tracking-tight drop-shadow-sm transition-colors ${c.headerText}`} style={{ fontFamily: 'var(--font-amiri), serif' }}>
                      {activeLang === 'ps' ? 'د رسول الله مختلف احادیث' : activeLang === 'fa' ? 'احادیث مختلف رسول الله ﷺ' : 'أحاديث رسول الله ﷺ'}
                    </h1>
                    <p className={`mt-2 text-xs md:text-sm font-semibold uppercase tracking-widest drop-shadow-sm transition-colors ${c.headerSubText}`}>
                      {activeLang === 'ps' ? 'د رسول الله ﷺ د مبارکو احادیثو ټولګه' : activeLang === 'fa' ? 'مجموعه احادیث مبارک و پر برکت پیامبر اکرم ﷺ' : 'مجموعة مباركة من أحاديث الرسول محمد ﷺ'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`flex flex-wrap items-center justify-center md:justify-end gap-3 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/85 border-amber-250/50'}`}
                >
                  {/* Language Selector */}
                  <div className={`flex p-0.5 rounded-xl ${c.headerLangBg}`}>
                    {(['ps', 'fa', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                          activeLang === lang 
                            ? c.btnActive
                            : `${isDark ? 'text-amber-100/70 hover:text-white hover:bg-white/10' : 'text-neutral-600 hover:text-neutral-900 hover:bg-amber-100/20'}`
                        }`}
                      >
                        {lang === 'ps' ? 'پښتو' : lang === 'fa' ? 'فارسی' : 'العربية'}
                      </button>
                    ))}
                  </div>

                  <div className={`h-6 w-[1.5px] ${isDark ? 'bg-white/20' : 'bg-neutral-300'}`}></div>

                  {/* Settings Button - Right in the header where it belongs! */}
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all duration-300 border shadow-sm ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20' 
                        : 'bg-white border-amber-250/40 text-amber-950 hover:bg-amber-50'
                    }`}
                    title={activeLang === 'ps' ? 'ترتیبات' : activeLang === 'fa' ? 'تنظیمات' : 'الإعدادات'}
                  >
                    <Settings className={`w-4 h-4 animate-spin-slow ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span className="text-xs uppercase tracking-wider">
                      {activeLang === 'ps' ? 'تنظیمات' : activeLang === 'fa' ? 'تنظیمات' : 'الإعدادات'}
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Search Bar */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative max-w-2xl group"
              >
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-5' : 'left-0 pl-5'} flex items-center pointer-events-none`}>
                  <Search className={`h-6 w-6 transition-colors ${isDark ? 'text-white/40 group-focus-within:text-white' : 'text-[#845e1a]/50 group-focus-within:text-[#442c05]'}`} />
                </div>
                <input
                  type="text"
                  placeholder={activeLang === 'ps' ? 'په احادیثو کې پلټنه وکړئ...' : activeLang === 'fa' ? 'در احادیث جستجو کنید...' : 'ابحث في الأحاديث...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full backdrop-blur-sm border ${c.headerInputBg} rounded-2xl py-4 ${isRtl ? 'pr-14 pl-5' : 'pl-14 pr-5'} focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 transition-all duration-300 text-lg shadow-inner`}
                />
              </motion.div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-10">
        
        {/* Floating Reading Mode Toggle / Immersive Control Island */}
        {readingMode && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-6 z-40 flex justify-center mb-8"
          >
            <div className={`flex items-center gap-2 p-1.5 rounded-full shadow-2xl border backdrop-blur-md ${isDark ? 'bg-neutral-900/90 text-white border-[#1e2924]' : 'bg-white/95 text-neutral-800 border-neutral-200/50'} pointer-events-auto`}>
              <button
                onClick={() => setReadingMode(false)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-400 hover:text-white transition-all`}
              >
                <ChevronRight className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
                {activeLang === 'ps' ? 'تړل' : activeLang === 'fa' ? 'بستن' : 'إغلاق'}
              </button>

              <div className="h-6 w-[1px] bg-neutral-300 dark:bg-neutral-700 mx-1"></div>

              {/* Quick Language Switcher Inside Immersive Mode */}
              <div className="flex gap-0.5 p-0.5 rounded-full bg-black/5 dark:bg-white/5">
                {(['ps', 'fa', 'ar'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeLang === lang 
                        ? 'bg-amber-500 text-white shadow-md' 
                        : 'text-neutral-500 hover:text-neutral-200'
                    }`}
                  >
                    {lang === 'ps' ? 'پښتو' : lang === 'fa' ? 'فارسی' : 'العربية'}
                  </button>
                ))}
              </div>

              <div className="h-6 w-[1px] bg-neutral-300 dark:bg-neutral-700 mx-1"></div>

              {/* Immersive Settings Trigger */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-amber-500 dark:text-amber-400 font-bold flex items-center gap-1 transition-colors`}
                title={activeLang === 'ps' ? 'ترتیبات' : activeLang === 'fa' ? 'تنظیمات' : 'الإعدادات'}
              >
                <Settings className="w-5 h-5 animate-spin-slow" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Categories Section */}
        <AnimatePresence>
          {!readingMode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className={`sticky top-0 z-30 mb-10 overflow-x-auto pb-4 pt-3 -mx-4 px-4 md:mx-0 md:px-4 scrollbar-hide backdrop-blur-md transition-all duration-300 border-b shadow-sm ${
                isDark 
                  ? themeColor === 'amber' ? 'bg-[#120a06]/92 border-[#422e1a]/40 shadow-stone-950/20'
                    : themeColor === 'rose' ? 'bg-[#110207]/92 border-[#4c1626]/40 shadow-rose-950/20'
                    : 'bg-[#020e08]/92 border-[#103d25]/40 shadow-emerald-950/20'
                  : themeColor === 'amber' ? 'bg-white/92 border-amber-200/40 shadow-amber-900/5'
                    : themeColor === 'rose' ? 'bg-white/92 border-rose-200/45 shadow-rose-900/5'
                    : 'bg-white/92 border-emerald-200/40 shadow-emerald-900/5'
              }`}
            >
              <div className="flex items-center justify-between mb-4 gap-4">
                <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`}>
                  <LayoutTemplate className={`w-5 h-5 ${t.textMain}`} />
                  {activeLang === 'ps' ? 'موضوعات' : activeLang === 'fa' ? 'موضوعات احادیث' : 'مواضيع الأحاديث'}
                  <span className="text-xs font-mono font-medium opacity-60 bg-black/5 dark:bg-white/5 py-1 px-2.5 rounded-full">
                    {filteredHadiths.length} {activeLang === 'ps' ? 'حدیثونه' : activeLang === 'fa' ? 'حدیث یافت شد' : 'أحاديث'}
                  </span>
                </h2>
                
                {/* Unified Control Bar for Desktop / Mobile */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setReadingMode(true)}
                    className={`text-xs font-bold flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl transition-all shadow-sm ${
                      isDark ? `${c.bgBadge} ${c.borderCard} text-amber-300 hover:opacity-90` : `${t.bgLight} ${t.textMain} hover:bg-opacity-80`
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {activeLang === 'ps' ? 'د لوستلو بڼه' : activeLang === 'fa' ? 'حالت مطالعه' : 'وضع القراءة'}
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    activeCategory === null 
                      ? `${t.catActive} scale-[1.02]` 
                      : `${isDark ? `${c.bgCard} text-amber-200 ${c.borderCard}` : 'bg-white text-neutral-600 border border-neutral-200'} ${t.borderHover} hover:${t.textMain} hover:shadow-sm`
                  }`}
                >
                  {activeLang === 'ps' ? 'ټول احادیث' : activeLang === 'fa' ? 'همه احادیث' : 'كل الأحاديث'}
                </button>
                {data.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      activeCategory === category.id 
                        ? `${t.catActive} scale-[1.02]` 
                        : `${isDark ? `${c.bgCard} text-amber-200 ${c.borderCard}` : 'bg-white text-neutral-600 border border-neutral-200'} ${t.borderHover} hover:${t.textMain} hover:shadow-sm`
                    }`}
                  >
                    {category.name[activeLang]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hadith List */}
        {/* Hadith List: Grid layout to fit two side-by-side on desktop/tablets and stacked compactly on mobile */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          <AnimatePresence mode="popLayout">
            {filteredHadiths.length > 0 ? (
              filteredHadiths.map((hadith, index) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: index * 0.05 }}
                  key={hadith.id} 
                  id={`hadith-card-${hadith.id}`}
                  className={`rounded-3xl shadow-[0_6px_24px_rgb(0,0,0,0.02)] border overflow-hidden relative group ${
                    isDark ? `${c.bgCard} ${c.borderCard}` : 'bg-white border-neutral-100/90'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${t.borderTop} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="p-5 md:p-7 relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Header with Number and Share Button */}
                      <div className={`flex justify-between items-center mb-5 border-b pb-3.5 ${isDark ? c.borderCard : 'border-neutral-100'}`}>
                        <div className="flex items-center gap-3.5">
                          <RubElHizb 
                            number={activeLang === 'ar' || activeLang === 'fa' || activeLang === 'ps' ? hadith.id.toLocaleString('fa-IR') : hadith.id} 
                            isDark={isDark} 
                            textMain={t.textMain} 
                          />
                          <span className={`text-xs md:text-sm font-bold ${t.textMain} px-3 py-1 rounded-full border ${isDark ? `${c.bgBadge} ${c.borderCard}` : `${t.bgLightSoft} ${t.borderSoft}`}`}>
                            {activeLang === 'ps' ? 'حدیث شمېره' : activeLang === 'fa' ? 'حدیث شماره' : activeLang === 'ar' ? 'حديث رقم' : 'Hadith'}
                          </span>
                        </div>
                        
                        {/* Share & Copy Action */}
                        <button
                          onClick={() => handleShare(hadith)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-90 border select-none ${
                            copiedHadithId === hadith.id
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-500 font-bold animate-pulse'
                              : isDark 
                                ? 'bg-white/5 border-white/5 text-amber-200 hover:text-white hover:bg-white/10' 
                                : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                          }`}
                          title={activeLang === 'ps' ? 'شریکول' : activeLang === 'fa' ? 'اشتراک‌گذاری' : 'مشاركة'}
                        >
                          {copiedHadithId === hadith.id ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-500 animate-bounce" />
                              <span>
                                {activeLang === 'ps' ? 'کاپي شو!' : activeLang === 'fa' ? 'کپی شد!' : activeLang === 'ar' ? 'تم النسخ!' : 'Copied!'}
                              </span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                              <span>
                                {activeLang === 'ps' ? 'شریکول' : activeLang === 'fa' ? 'اشتراک‌گذاری' : activeLang === 'ar' ? 'مشاركة' : 'Share'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Arabic text always shown if not active lang */}
                      {activeLang !== 'ar' && (
                        <div 
                          className={`mb-6 text-right font-serif drop-shadow-sm leading-relaxed ${isDark ? 'text-[#f5e0a3]' : 'text-[#845e1a] bg-[#faf7f0]/60 p-4 rounded-xl border border-amber-200/20'} ${fontSize === 'xlarge' ? 'text-3xl leading-loose' : fontSize === 'large' ? 'text-2xl leading-loose' : 'text-xl leading-relaxed'}`} 
                          dir="rtl"
                          style={{ fontFamily: 'var(--font-amiri), serif' }}
                        >
                          {hadith.text.ar}
                        </div>
                      )}
                      
                      {/* Active Translation */}
                      <div 
                        className={`font-medium ${isDark ? 'text-amber-100' : 'text-neutral-700'} ${activeLang === 'ar' ? `font-serif ${getArabicFontSizeClass()} ${isDark ? 'text-[#f5e0a3]' : 'text-[#634511]'} text-center` : getFontSizeClass()}`}
                        style={{ 
                          fontFamily: activeLang === 'ps' || activeLang === 'fa' || activeLang === 'ar' 
                            ? 'var(--font-amiri), serif' 
                            : 'inherit',
                          lineHeight: activeLang === 'ps' || activeLang === 'fa' ? '2.0' : 'inherit'
                        }}
                      >
                        {hadith.text[activeLang]}
                      </div>

                      {/* Decorative Signature / Sign: د رسول الله ﷺ مبارک حدیث */}
                      <div className={`flex flex-col items-center justify-center mt-6 pt-3.5 border-t border-dashed ${isDark ? c.borderCard : 'border-neutral-100'}`}>
                        <div className="flex items-center gap-2.5">
                          <div className={`h-[1px] w-8 bg-gradient-to-r from-transparent ${isDark ? 'via-[#4a351e]' : 'via-neutral-400/20'} to-transparent`}></div>
                          <span className={`text-xs font-bold flex items-center gap-1.5 ${t.textMain} tracking-wide`}>
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                            {activeLang === 'ps' ? 'د رسول الله ﷺ مبارک حدیث' : activeLang === 'fa' ? 'حدیث مبارک رسول الله ﷺ' : 'أحاديث رسول الله ﷺ'}
                          </span>
                          <div className={`h-[1px] w-8 bg-gradient-to-r from-transparent ${isDark ? 'via-[#4a351e]' : 'via-neutral-400/20'} to-transparent`}></div>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-6 flex flex-col gap-4 pt-5 border-t ${isDark ? c.borderCard : 'border-neutral-100/80'}`}>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className={`flex items-center gap-2 border px-4 py-2 rounded-xl shadow-sm ${
                          isDark ? `${c.bgBadge} ${c.borderCard} text-amber-100` : `${t.bgLightSoft} ${t.borderSoft} ${t.textDark}`
                        }`}>
                          <Book className={`w-5 h-5 ${t.iconText}`} />
                          <span className="font-bold">
                            {activeLang === 'ps' || activeLang === 'fa' 
                              ? `${hadith.source.name} شریف` 
                              : activeLang === 'ar' 
                                ? `${hadith.source.name} الشريف`
                                : hadith.source.name === 'بخاري' 
                                  ? 'Bukhari Sharif' 
                                  : hadith.source.name === 'مسلم' 
                                    ? 'Muslim Sharif' 
                                    : hadith.source.name === 'ترمذي'
                                      ? 'Tirmidhi Sharif'
                                      : `${hadith.source.name} Sharif`
                            }
                          </span>
                          <span className="opacity-70 font-semibold text-xs py-0.5 px-1.5 rounded bg-black/5">
                            {hadith.source.ref.replace('Hadith', activeLang === 'ps' || activeLang === 'fa' ? 'حدیث' : activeLang === 'ar' ? 'حديث' : 'Hadith')}
                          </span>
                        </div>
                        
                        <div className={`flex items-center gap-2 border shadow-sm px-4 py-2 rounded-xl ${
                          isDark ? `${c.bgBadge} ${c.borderCard} text-amber-100` : 'text-neutral-700 bg-white border-neutral-200'
                        }`}>
                          <span className="text-neutral-400 text-sm font-medium">{activeLang === 'ps' ? 'راوي:' : activeLang === 'fa' ? 'راوی:' : activeLang === 'ar' ? 'الراوي:' : 'Narrator:'}</span>
                          <span 
                            className="font-bold"
                            style={{ fontFamily: activeLang === 'ps' || activeLang === 'fa' || activeLang === 'ar' ? 'var(--font-amiri), serif' : 'inherit' }}
                          >
                            {(() => {
                              const baseName = hadith.narrator[activeLang as Language] || hadith.narrator['ar'];
                              if (activeLang === 'ar') return `${baseName} (رضي الله عنه)`;
                              if (activeLang === 'fa' || activeLang === 'ps') return `${baseName} (رضی الله عنه)`;
                              return `${baseName} (R.A.)`;
                            })()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {hadith.tags.map(tag => (
                          <span 
                            key={tag} 
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold shadow-sm border ${
                              isDark ? `${c.bgCard} ${c.borderCard} text-amber-200` : `${t.tagBg}`
                            }`}
                            style={{ fontFamily: activeLang === 'ps' || activeLang === 'fa' || activeLang === 'ar' ? 'var(--font-amiri), serif' : 'inherit' }}
                          >
                            <Tag className="w-3.5 h-3.5 opacity-60" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center py-32 rounded-[2.5rem] border shadow-sm ${
                  isDark ? 'bg-[#121816] border-[#1e2924]' : 'bg-white border-neutral-100'
                }`}
              >
                <div className={`w-24 h-24 rounded-[1.5rem] rotate-3 flex items-center justify-center mx-auto mb-6 shadow-inner border ${
                  isDark ? 'bg-[#151d1a] border-[#1e2924]' : `${t.bgLight} ${t.borderSoft}`
                }`}>
                  <Search className={`w-10 h-10 ${t.iconColorLight} -rotate-3`} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-800'}`}>
                  {activeLang === 'ps' ? 'هیڅ پایله ونه موندل شوه' : activeLang === 'fa' ? 'هیچ نتیجه‌ای یافت نشد' : activeLang === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
                </h3>
                <p className="text-neutral-500 font-medium">
                  {activeLang === 'ps' ? 'بله کلمه وپلټئ یا کټګوري بدله کړئ.' : activeLang === 'fa' ? 'کلمه دیگری را جستجو کنید یا دسته‌بندی را تغییر دهید.' : activeLang === 'ar' ? 'جرّب البحث عن كلمة أخرى أو تغيير التصنيف.' : 'Try searching for a different keyword or category.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      </div>

      {/* Settings Modal overlay */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
              onClick={() => setIsSettingsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 max-h-[92vh] overflow-y-auto scrollbar-hide"
            >
              <div className={`${isDark ? `${c.bgModal}/95 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]` : 'bg-white/95 border border-amber-200 shadow-[0_25px_60px_rgba(139,94,22,0.15)]'} rounded-[2.5rem] backdrop-blur-xl overflow-hidden transition-all duration-300`}>
                
                {/* Header Banner Section */}
                <div className={`flex items-center justify-between p-6 border-b pb-5 relative overflow-hidden ${isDark ? 'border-white/10 bg-black/30' : 'border-amber-200/50 bg-amber-50/50'}`}>
                  {/* Backdrop glowing pattern */}
                  <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <h3 className={`text-xl font-bold flex items-center gap-3.5 ${isDark ? 'text-zinc-100' : 'text-amber-950'}`}>
                    <div className={`${isDark ? 'bg-amber-500/15 border border-amber-500/30' : 'bg-amber-550/10 border border-amber-550/20'} p-2.5 rounded-2xl flex items-center justify-center`}>
                      <Settings className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-700'} animate-spin-slow`} />
                    </div>
                    <span className="font-serif tracking-wide" style={{ fontFamily: 'var(--font-amiri), serif' }}>
                      {activeLang === 'ps' ? 'د اپلیکیشن تنظیمات' : activeLang === 'fa' ? 'تنظیمات برنامه' : activeLang === 'ar' ? 'إعدادات التطبيق' : 'Settings'}
                    </span>
                  </h3>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className={`p-2 rounded-full transition-all border active:scale-90 ${isDark ? 'text-zinc-400 border-white/5 hover:text-white hover:bg-white/10' : 'text-amber-900/65 border-amber-200/30 hover:text-amber-950 hover:bg-amber-500/10'}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 md:p-8 space-y-7">
                  
                  {/* Theme Mode Selector (Light/Dark) */}
                  <div className="group">
                    <label className={`flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-zinc-300' : 'text-amber-900'}`}>
                      <Moon className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                      {activeLang === 'ps' ? 'روښانه / تیاره حالت' : activeLang === 'fa' ? 'حالت ظاهر (روشن / تاریک)' : activeLang === 'ar' ? 'مظهر الشاشة (داكن / فاتح)' : 'Theme Mode'}
                    </label>
                    <div className={`flex p-1 rounded-2xl w-full border transition-all duration-300 ${isDark ? 'bg-[#000000]/40 border-white/10' : 'bg-amber-100/30 border-amber-200/50'}`}>
                      <button 
                        onClick={() => changeThemeMode('light')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-350 active:scale-95 ${
                          themeMode === 'light' 
                            ? `${isDark ? 'bg-[#1c130b] text-amber-300 border border-[#422e1a] shadow-lg' : 'bg-white text-amber-950 border border-amber-200/60 shadow-md'} scale-[1.02]` 
                            : `${isDark ? 'text-zinc-400 hover:text-white' : 'text-amber-900/60 hover:text-amber-900'}`
                        }`}
                      >
                        <Sun className={`w-4 h-4 transition-transform group-hover:rotate-12 ${themeMode === 'light' ? 'text-amber-500' : ''}`} />
                        {activeLang === 'ps' ? 'رڼه روښانه' : activeLang === 'fa' ? 'روشن' : activeLang === 'ar' ? 'مظهر فاتح' : 'Light'}
                      </button>
                      <button 
                        onClick={() => changeThemeMode('dark')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-350 active:scale-95 ${
                          themeMode === 'dark' 
                            ? `${isDark ? 'bg-[#1c130b] text-amber-300 border border-[#d4af37]/30 shadow-lg' : 'bg-[#110207] text-white border border-rose-500/20 shadow-md'} scale-[1.02]` 
                            : `${isDark ? 'text-zinc-400 hover:text-white' : 'text-amber-900/60 hover:text-amber-900'}`
                        }`}
                      >
                        <Moon className={`w-4 h-4 ${themeMode === 'dark' ? 'text-amber-400' : ''}`} />
                        {activeLang === 'ps' ? 'توره تیاره' : activeLang === 'fa' ? 'تاریک' : activeLang === 'ar' ? 'مظهر داكن' : 'Dark'}
                      </button>
                    </div>
                  </div>

                  {/* 24-Hour Daily Hadith Messages Option */}
                  <div className={`p-4.5 rounded-[2rem] border transition-all duration-300 relative overflow-hidden ${isDark ? `bg-black/20 border-white/10` : 'bg-amber-50/50 border-amber-200/60'}`}>
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex gap-3">
                        <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-amber-100 border border-amber-200/40 text-amber-800'}`}>
                          {notificationActive ? (
                            <BellRing className={`w-5 h-5 text-amber-500 animate-bounce`} />
                          ) : (
                            <Bell className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-amber-700'}`} />
                          )}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${isDark ? 'text-zinc-100' : 'text-amber-950'}`}>
                            {activeLang === 'ps' ? '۲۴ ساعته حدیث خبرتیاوې' : activeLang === 'fa' ? 'اعلان ۲۴ ساعته حدیث' : activeLang === 'ar' ? 'تنبيه الحديث التلقائي' : '24h Hadith Alerts'}
                          </h4>
                          <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-amber-900/75'}`}>
                            {activeLang === 'ps' ? 'په هرو ۲۴ ساعتونو کې یو تصادفي حدیث ستاسو موبایل ته د الرټ په بڼه استول کیږي.' : activeLang === 'fa' ? 'ارسال خودکار یک حدیث تصادفی به موبایل شما هر ۲۴ ساعت.' : activeLang === 'ar' ? 'يتم إرسال حديث شريف عشوائي كإشعار منبثق على جهازك كل ٢٤ ساعة.' : 'Receive a selected hadith notification automatically.'}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => changeNotification(!notificationActive)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                          notificationActive ? 'bg-amber-500 shadow-md shadow-amber-500/20' : 'bg-neutral-300 dark:bg-zinc-700'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${
                            notificationActive ? (isRtl ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Instantly Test Push Message Button */}
                    <button
                      onClick={triggerDailyNotification}
                      className={`w-full text-xs font-bold py-3 px-3 rounded-xl border border-dashed transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 ${
                        isDark 
                          ? 'border-white/15 hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 bg-white/5' 
                          : 'border-amber-300 hover:border-amber-500/50 text-amber-800 hover:text-amber-950 bg-white shadow-sm'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      {activeLang === 'ps' ? 'خبرتیا وازموئ (همدا اوس حدیث واستوئ)' : activeLang === 'fa' ? 'آزمایش فوری اعلان (ارسال حدیث)' : activeLang === 'ar' ? 'تجربة الرّسالة الفورية الآن' : 'Test Alert Now'}
                    </button>
                  </div>

                  {/* Theme Color Setting */}
                  <div>
                    <label className={`flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider mb-3.5 ${isDark ? 'text-zinc-300' : 'text-amber-900'}`}>
                      <Palette className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                      {activeLang === 'ps' ? 'د اپلیکیشن ځانګړی رنګ' : activeLang === 'fa' ? 'رنگ تم برنامه' : activeLang === 'ar' ? 'لون مظهر التطبيق' : 'App Accent Color'}
                    </label>
                    <div className="flex gap-4">
                      {(['amber', 'emerald', 'rose'] as ThemeColor[]).map((color) => (
                        <button
                          key={color}
                          onClick={() => setThemeColor(color)}
                          className={`w-11 h-11 rounded-full border-4 transition-all duration-300 relative group active:scale-90 ${
                            color === 'amber' ? 'bg-amber-500 shadow-inner' : color === 'emerald' ? 'bg-[#10b981]' : 'bg-rose-500'
                          } ${themeColor === color ? 'border-white dark:border-zinc-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-110' : 'border-transparent hover:scale-105'}`}
                          aria-label={color}
                        >
                          {themeColor === color && (
                            <motion.span 
                              layoutId="activeColorBorder"
                              className="absolute -inset-1.5 rounded-full border-2 border-amber-500 pointer-events-none opacity-80"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size Setting */}
                  <div>
                    <label className={`flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-zinc-300' : 'text-amber-900'}`}>
                      <Type className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                      {activeLang === 'ps' ? 'د متن او احادیثو کچه' : activeLang === 'fa' ? 'اندازه خط و متون' : activeLang === 'ar' ? 'تنسيق حجم الخطوط' : 'Hadith Text Size'}
                    </label>
                    <div className={`flex p-1 rounded-2xl w-full border transition-all duration-300 ${isDark ? 'bg-[#000000]/40 border-white/10' : 'bg-amber-100/30 border-amber-200/50'}`}>
                      {(['normal', 'large', 'xlarge'] as FontSize[]).map((size) => (
                        <button 
                          key={size}
                          onClick={() => setFontSize(size)}
                          className={`flex-1 flex justify-center py-2.5 rounded-xl font-bold text-xs transition-all duration-300 active:scale-95 ${
                            fontSize === size 
                              ? `${isDark ? 'bg-[#1c130b] text-amber-300 border border-white/5' : `bg-white text-amber-950 border border-amber-200/50`} shadow-md scale-[1.02]` 
                              : 'text-neutral-500 hover:text-neutral-600 dark:hover:text-zinc-200'
                          }`}
                        >
                          {size === 'normal' 
                            ? (activeLang === 'ps' ? 'عادي اصلي' : activeLang === 'fa' ? 'عادی' : activeLang === 'ar' ? 'افتراضي' : 'Normal')
                            : size === 'large'
                            ? (activeLang === 'ps' ? 'لوی' : activeLang === 'fa' ? 'بزرگ' : activeLang === 'ar' ? 'كبير' : 'Large')
                            : (activeLang === 'ps' ? 'خورا لوی' : activeLang === 'fa' ? 'بسیار بزرگ' : activeLang === 'ar' ? 'ضخم جداً' : 'X-Large')
                          }
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Pattern Setting */}
                  <div>
                    <label className={`flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-zinc-300' : 'text-amber-900'}`}>
                      <LayoutTemplate className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                      {activeLang === 'ps' ? 'د شالید ځانګړی ډیزاین' : activeLang === 'fa' ? 'طرح و نقش پس‌زمینه' : activeLang === 'ar' ? 'نقوش شاشات الخلفية' : 'Background Texture'}
                    </label>
                    <div className="grid grid-cols-2 gap-3.5">
                      {(['minimal', 'geometric'] as ThemePattern[]).map((pattern) => (
                        <button
                          key={pattern}
                          onClick={() => setThemePattern(pattern)}
                          className={`py-3 rounded-xl font-bold text-xs border transition-all duration-300 active:scale-95 ${
                            themePattern === pattern
                              ? (isDark ? `border-amber-500/70 bg-[#1c130b] text-amber-300` : `border-amber-500/80 bg-amber-50 text-amber-950 shadow-sm`)
                              : `${isDark ? `border-white/5 bg-transparent text-neutral-400` : 'border-neutral-200 bg-transparent text-neutral-500'} hover:border-amber-500/40 hover:text-amber-600`
                          }`}
                        >
                          {pattern === 'minimal' 
                            ? (activeLang === 'ps' ? 'ساده او پاک' : activeLang === 'fa' ? 'ساده و مدرن' : activeLang === 'ar' ? 'خلفية بسيطة' : 'Minimal')
                            : (activeLang === 'ps' ? 'سپېڅلی هندسي' : activeLang === 'fa' ? 'نقوش هندسی' : activeLang === 'ar' ? 'زخرفة هندسية' : 'Geometric')
                          }
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Owner Credit Card with Regal Islamic Framing & Borders */}
                  <div className={`p-5 rounded-[2rem] border relative overflow-hidden flex flex-col gap-4 shadow-inner transition-all duration-300 ${
                    isDark 
                      ? 'bg-[#1c130b]/80 border-[#d4af37]/35 text-white shadow-black/40' 
                      : 'bg-gradient-to-br from-[#faf7ea] via-[#f7ebd4] to-[#fcfaf3] border-amber-300/60 text-amber-950 shadow-amber-900/5'
                  }`}>
                    {/* Corner decorative circles representing islamic card designs */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
                    <div className="absolute left-0 bottom-0 w-14 h-14 bg-gradient-to-tr from-amber-500/10 via-amber-200/0 to-transparent rounded-tr-full pointer-events-none" />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Developer Avatar Wrapper */}
                      <div className={`p-3 rounded-full shrink-0 flex items-center justify-center border-2 border-amber-500/30 ${isDark ? 'bg-amber-950/40 text-amber-400 shadow-md' : 'bg-white text-amber-700 shadow-md'}`}>
                        <User className="w-5 h-5 animate-pulse" />
                      </div>
                      
                      <div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-amber-400/80' : 'text-amber-800/80'}`}>
                          {activeLang === 'ps' ? 'د جوړوونکي نوم' : activeLang === 'fa' ? 'نام سازنده برنامه' : 'Developer Name'}
                        </div>
                        <div className="text-xl font-extrabold tracking-wide text-amber-600 dark:text-amber-400" style={{ fontFamily: 'var(--font-amiri), serif' }}>
                          {activeLang === 'ps' || activeLang === 'fa' ? 'طالب العلم ابوساجد' : 'طالب العلم ابوساجد'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Elegant Arabic Divider */}
                    <div className="w-full flex items-center justify-center gap-3 py-1 scale-95 opacity-80 select-none">
                      <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-[#d4af37]/40' : 'via-amber-400/40'} to-transparent`} />
                      <span className={`text-[10px] font-serif ${isDark ? 'text-amber-300/40' : 'text-amber-800/40'}`}>♛</span>
                      <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-[#d4af37]/40' : 'via-amber-400/40'} to-transparent`} />
                    </div>

                    {/* Developer Humility Script */}
                    <div className={`text-sm leading-relaxed text-center px-1 font-serif select-text ${isDark ? 'text-zinc-200' : 'text-amber-950'}`} dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: 'var(--font-amiri), serif' }}>
                      {activeLang === 'ps' ? (
                        "موږ د عاجز بنده په توګه دا ستاینلیک جوړ کړی، په دې هیله چې که کومه تېروتنه وي له موږ سره اړیکه ونیسئ. مننه."
                      ) : activeLang === 'fa' ? (
                        "ما به عنوان بنده‌ای ناتوان تلاش در ساخت این اثر کرده‌ایم. اگر اشتباهی مشاهده کردید، لطفاً با ما در تماس شوید. تشکر."
                      ) : (
                        "لقد بذلنا جهدنا المتواضع في بناء هذا العمل الشرّيف، نرجو منكم مراسلتنا في حال وجود أي خطأ أو تقصير، جزاكم الله خيراً."
                      )}
                    </div>
                  </div>

                  {/* Developer Contact Section */}
                  <div className={`pt-5 border-t ${isDark ? 'border-white/10' : 'border-neutral-200/80'}`}>
                    <h4 className={`flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider mb-4.5 ${isDark ? 'text-zinc-300' : 'text-amber-950'}`}>
                      <User className="w-4 h-4 text-amber-500" />
                      {activeLang === 'ps' ? 'له جوړوونکي سره همکاري او تماس' : activeLang === 'fa' ? 'راه‌های ارتباطی با ما' : activeLang === 'ar' ? 'اتصل بمطور التطبيق' : 'Contact Developer'}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs">
                      <a href="mailto:shga4566@gmail.com" className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 shadow-sm active:scale-95 ${
                        isDark ? 'bg-white/5 hover:bg-white/10 border-white/5 text-amber-100' : 'bg-neutral-50 hover:bg-amber-100/30 border-neutral-200/50 hover:border-amber-250 text-amber-950'
                      }`}>
                        <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="font-bold truncate" dir="ltr">shga4566@gmail.com</span>
                      </a>
                      
                      <a href="https://t.me/shga4566" target="_blank" rel="noreferrer" className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 shadow-sm active:scale-95 ${
                        isDark ? 'bg-white/5 hover:bg-white/10 border-white/5 text-amber-100' : 'bg-neutral-50 hover:bg-blue-50 border-neutral-200/50 hover:border-blue-200 text-amber-950 hover:text-blue-750'
                      }`}>
                        <Send className="w-4 h-4 text-blue-500 shrink-0 animate-pulse" />
                        <span className="font-bold shrink-0">Telegram Channel</span>
                      </a>
                    </div>
                  </div>

                  {/* Close & Apply Block Button */}
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className={`w-full ${c.btnActive} hover:brightness-105 active:scale-[0.98] font-bold py-4 rounded-2xl transition-all shadow-xl text-sm font-sans tracking-wider mt-5 flex items-center justify-center gap-2`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {activeLang === 'ps' ? 'بندول او پلي کول' : activeLang === 'fa' ? 'ذخیره تنظیمات' : activeLang === 'ar' ? 'تطبيق وحفظ الإعدادات' : 'Apply & Close'}
                    </span>
                  </button>
                  
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Exit Confirmation Dialog */}
      <AnimatePresence>
        {isExitModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExitModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity" 
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md w-auto z-55 p-6 rounded-[2rem] border overflow-hidden ${
                isDark ? `${c.bgCard} ${c.borderCard}` : 'bg-white border-neutral-150'
              } shadow-2xl`}
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 rounded-full bg-red-500/10 text-red-500">
                  <LogOut className="w-8 h-8" />
                </div>
                
                <h3 className={`text-xl font-bold ${isDark ? 'text-zinc-50' : 'text-neutral-900'}`} style={{ fontFamily: 'var(--font-amiri), serif' }}>
                  {activeLang === 'ps' ? 'له اپلیکیشن څخه وتل' : activeLang === 'fa' ? 'خروج از برنامه' : activeLang === 'ar' ? 'الخروج من التطبيق' : 'Exit Application'}
                </h3>
                
                <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-neutral-600'} leading-relaxed`} style={{ fontFamily: 'var(--font-amiri), serif' }}>
                  {activeLang === 'ps' ? 'ایا تاسو ډاډه یاست چې غواړئ له اپلیکیشن څخه بهر شئ؟' : activeLang === 'fa' ? 'آیا مطمئن هستید که می‌خواهید از برنامه خارج شوید؟' : activeLang === 'ar' ? 'هل أنت متأكد من رغبتك في مغادرة التطبيق وإغلاقه؟' : 'Are you sure you want to leave and exit the application?'}
                </p>
                
                {/* Yes/No Buttons */}
                <div className="flex gap-4 w-full mt-4">
                  <button
                    onClick={() => {
                      setIsExitModalOpen(false);
                      setHasExited(true);
                      if (typeof window !== 'undefined') {
                        try {
                          window.close();
                        } catch (e) {
                          console.log('Window close failed', e);
                        }
                      }
                    }}
                    className="flex-1 py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-95 transition-all shadow-lg shadow-red-600/20 active:scale-95 duration-200"
                  >
                    {activeLang === 'ps' ? 'هو' : activeLang === 'fa' ? 'بله' : activeLang === 'ar' ? 'نعم' : 'Yes'}
                  </button>
                  
                  <button
                    onClick={() => setIsExitModalOpen(false)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold border transition-colors active:scale-95 duration-200 ${
                      isDark 
                        ? `${c.bgBadge} ${c.borderCard} text-zinc-300 hover:bg-[#4a351e]` 
                        : 'bg-neutral-100 hover:bg-[#eae8e0] text-neutral-800 border-neutral-200'
                    }`}
                  >
                    {activeLang === 'ps' ? 'نا' : activeLang === 'fa' ? 'نخیر' : activeLang === 'ar' ? 'لا' : 'No'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


