"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Search, Book, Tag, MoonStar, Settings, X, Type, BookOpen, ChevronRight, LayoutTemplate, Sparkles, User, Mail, Send, MessageCircle, Palette, Sun, Moon, Bell, BellRing, Info, Zap, LogOut } from 'lucide-react';
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
    bgLight: 'bg-[#faf7f2]',
    textMain: 'text-[#9b7222]',
    borderHover: 'hover:border-[#d4af37]',
    catActive: 'bg-gradient-to-r from-[#d4af37] to-[#bfa12a] text-amber-950 shadow-lg shadow-[#d4af37]/25',
    borderTop: 'from-[#d4af37] via-amber-400 to-[#d4af37]',
    tagBg: 'bg-[#f5ebd6] text-[#6d4d12] border-amber-200/40',
    iconText: 'text-[#d4af37]',
    bgLightSoft: 'bg-[#f9f5ed]',
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
    bgLight: 'bg-[#fef6f8]',
    textMain: 'text-rose-700',
    borderHover: 'hover:border-rose-500',
    catActive: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/30',
    borderTop: 'from-rose-500 via-pink-400 to-rose-500',
    tagBg: 'bg-rose-100/70 text-rose-800 border-rose-200/40',
    iconText: 'text-rose-500',
    bgLightSoft: 'bg-rose-50/70',
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
    settingsBtn: 'bg-black/30 border-emerald-950/20 text-emerald-200 hover:text-white hover:bg-emerald-900/50',
    bgLight: 'bg-[#f4faf7]',
    textMain: 'text-[#046a38]',
    borderHover: 'hover:border-[#10b981]',
    catActive: 'bg-gradient-to-r from-[#10b981] to-[#059669] text-[#022c1b] shadow-lg shadow-emerald-500/25',
    borderTop: 'from-[#10b981] via-emerald-400 to-[#10b981]',
    tagBg: 'bg-emerald-50 text-[#0f5132] border-emerald-200/30',
    iconText: 'text-[#10b981]',
    bgLightSoft: 'bg-[#edf5f0]',
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

  // Safe deferred state initialization from localStorage after mounting
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    const savedNotify = localStorage.getItem('notificationActive') === 'true';
    
    const timeoutId = setTimeout(() => {
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeMode(savedTheme);
      }
      setNotificationActive(savedNotify);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const t = themes[themeColor];
  const isDark = themeMode === 'dark';

  const c = useMemo(() => {
    if (isDark) {
      if (themeColor === 'amber') {
        return {
          bgPage: 'bg-[#1c140d] text-[#f7e0bc]',
          bgCard: 'bg-[#291e14]',
          borderCard: 'border-[#4f3a27]',
          bgBadge: 'bg-[#37281a]',
          textCard: 'text-[#f7e0bc]',
          textMuted: 'text-amber-200/60',
          bgModal: 'bg-[#1c140d]',
          borderModal: 'border-[#4f3a27]',
          bgInput: 'bg-black/40 border-[#d4af37]/45',
        };
      } else if (themeColor === 'rose') {
        return {
          bgPage: 'bg-[#1f0910] text-[#ffccd5]',
          bgCard: 'bg-[#31101b]',
          borderCard: 'border-[#5c1c31]',
          bgBadge: 'bg-[#431424]',
          textCard: 'text-[#ffccd5]',
          textMuted: 'text-rose-200/60',
          bgModal: 'bg-[#1f0910]',
          borderModal: 'border-[#5c1c31]',
          bgInput: 'bg-black/40 border-rose-500/40',
        };
      } else {
        return {
          bgPage: 'bg-[#041d11] text-[#c1f2dd]',
          bgCard: 'bg-[#0a2e1d]',
          borderCard: 'border-[#155d3b]',
          bgBadge: 'bg-[#103f29]',
          textCard: 'text-[#c1f2dd]',
          textMuted: 'text-emerald-200/60',
          bgModal: 'bg-[#042416]',
          borderModal: 'border-[#10b981]/30',
          bgInput: 'bg-black/40 border-[#10b981]/40',
        };
      }
    } else {
      // Light Mode
      if (themeColor === 'amber') {
        return {
          bgPage: 'bg-[#faf6e8] text-amber-950',
          bgCard: 'bg-[#fffdf5] border-amber-200/60',
          borderCard: 'border-amber-200/60',
          bgBadge: 'bg-[#f5ebd6]',
          textCard: 'text-[#6d4d12]',
          textMuted: 'text-amber-900/60',
          bgModal: 'bg-white',
          borderModal: 'border-amber-200/65',
          bgInput: 'bg-white border-amber-300',
        };
      } else if (themeColor === 'rose') {
        return {
          bgPage: 'bg-[#fef4f6] text-rose-950',
          bgCard: 'bg-[#fff9fa] border-rose-200/60',
          borderCard: 'border-rose-200/60',
          bgBadge: 'bg-rose-100/70',
          textCard: 'text-rose-800',
          textMuted: 'text-rose-900/60',
          bgModal: 'bg-white',
          borderModal: 'border-rose-200/65',
          bgInput: 'bg-white border-rose-300',
        };
      } else {
        return {
          bgPage: 'bg-[#f0f8f4] text-emerald-950',
          bgCard: 'bg-[#fcfefe] border-emerald-200/60',
          borderCard: 'border-emerald-200/60',
          bgBadge: 'bg-emerald-50',
          textCard: 'text-[#0f5132]',
          textMuted: 'text-emerald-900/60',
          bgModal: 'bg-white',
          borderModal: 'border-emerald-200/65',
          bgInput: 'bg-white border-emerald-300',
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
      if (active && 'Notification' in window) {
        Notification.requestPermission();
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
    }

    // Interactive Toast Demonstration on Screen
    const randomHadith = data.hadiths[Math.floor(Math.random() * data.hadiths.length)];
    setTestNotificationToast({
      show: true,
      title: activeLang === 'ps' ? 'د نن ورځې خبرتیا (په هرو ۲۴ ساعتونو کې راځي)' : activeLang === 'fa' ? 'نمونه اعلان روزانه (هر ۲۴ ساعت)' : 'Daily Notification Triggered',
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
      case 'ornate': return 'bg-[url("https://www.transparenttextures.com/patterns/arabesque.png")] opacity-20';
      default: return '';
    }
  };

  const isRtl = activeLang === 'ar' || activeLang === 'fa' || activeLang === 'ps';

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
                د رسول الله ﷺ د مبارکو احادیثو پښتو، فارسي او عربي ټولګه. په دې نسخه کې پوره ۴۰ مبارک احادیث موندلی شئ.
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
            className={`relative overflow-hidden bg-gradient-to-br ${t.headerBg} shadow-2xl z-10 rounded-b-[2.5rem]`}
          >
            {/* Background Pattern */}
            <div className={`absolute inset-0 ${getPatternClass()}`}></div>
            <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent`}></div>

            <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
              
              {/* Sacred Bismillah Calligraphy */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center font-serif text-lg md:text-xl text-yellow-150/70 mb-5 tracking-widest selection:bg-transparent" 
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
                  <div className={`relative flex items-center justify-center w-16 h-16 backdrop-blur-md rounded-2xl shadow-lg border overflow-hidden bg-black/10 border-white/20 select-none shrink-0`}>
                    <Image 
                      src={appLogo} 
                      alt="د رسول الله مختلف احادیث Logo" 
                      className="w-full h-full object-cover"
                      placeholder="blur"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-tight drop-shadow-sm text-white" style={{ fontFamily: 'var(--font-amiri), serif' }}>
                      {activeLang === 'ps' ? 'د رسول الله مختلف احادیث' : activeLang === 'fa' ? 'احادیث مختلف رسول الله ﷺ' : 'أحاديث رسول الله ﷺ'}
                    </h1>
                    <p className="text-white/85 mt-2 text-xs md:text-sm font-medium uppercase tracking-widest drop-shadow-sm">
                      {activeLang === 'ps' ? 'د رسول الله ﷺ د مبارکو احادیثو ټولګه' : activeLang === 'fa' ? 'مجموعه احادیث مبارک و پر برکت پیامبر اکرم ﷺ' : 'مجموعة مباركة من أحاديث الرسول محمد ﷺ'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center gap-4 backdrop-blur-md bg-white/10 p-1.5 rounded-2xl border border-white/20 shadow-xl"
                >
                  {/* Language Selector */}
                  <div className={`flex p-0.5 rounded-xl bg-black/10`}>
                    {(['ps', 'fa', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                          activeLang === lang 
                            ? t.btnActive
                            : 'text-white/85 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {lang === 'ps' ? 'پښتو' : lang === 'fa' ? 'فارسی' : 'العربية'}
                      </button>
                    ))}
                  </div>

                  <div className="h-6 w-[1.5px] bg-white/25"></div>

                  {/* Settings Button - Right in the header where it belongs! */}
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-white hover:bg-white/15 active:scale-95 transition-all duration-300 text-sm font-bold bg-white/5 border border-white/10"
                    title={activeLang === 'ps' ? 'ترتیبات' : activeLang === 'fa' ? 'تنظیمات' : 'الإعدادات'}
                  >
                    <Settings className="w-4 h-4 animate-spin-slow text-yellow-250" />
                    <span className="text-xs uppercase tracking-wider">
                      {activeLang === 'ps' ? 'تنظیمات' : activeLang === 'fa' ? 'تنظیمات' : 'الإعدادات'}
                    </span>
                  </button>

                  <div className="h-6 w-[1.5px] bg-white/25"></div>

                  {/* Exit Application Button */}
                  <button 
                    onClick={() => setIsExitModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-white hover:bg-red-500/20 active:scale-95 transition-all duration-300 text-sm font-bold bg-white/5 border border-white/10"
                    title={activeLang === 'ps' ? 'وتل' : activeLang === 'fa' ? 'خروج' : 'خروج'}
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-xs uppercase tracking-wider">
                      {activeLang === 'ps' ? 'وتل' : activeLang === 'fa' ? 'خروج' : 'خروج'}
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
                  <Search className={`h-6 w-6 text-white/50 group-focus-within:text-white transition-colors`} />
                </div>
                <input
                  type="text"
                  placeholder={activeLang === 'ps' ? 'په احادیثو کې پلټنه وکړئ...' : activeLang === 'fa' ? 'در احادیث جستجو کنید...' : 'ابحث في الأحاديث...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full backdrop-blur-sm border ${t.headerInputBg} rounded-2xl py-4 ${isRtl ? 'pr-14 pl-5' : 'pl-14 pr-5'} focus:outline-none focus:ring-2 transition-all duration-300 text-lg shadow-inner`}
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
              className="mb-10 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
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
                  className={`rounded-3xl shadow-[0_6px_24px_rgb(0,0,0,0.02)] border overflow-hidden relative group ${
                    isDark ? `${c.bgCard} ${c.borderCard}` : 'bg-white border-neutral-100/90'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${t.borderTop} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="p-5 md:p-7 relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Header with Number */}
                      <div className={`flex justify-between items-center mb-5 border-b pb-3.5 ${isDark ? c.borderCard : 'border-neutral-100'}`}>
                        <div className="flex items-center gap-3.5">
                          <RubElHizb 
                            number={activeLang === 'ar' || activeLang === 'fa' || activeLang === 'ps' ? hadith.id.toLocaleString('fa-IR') : hadith.id} 
                            isDark={isDark} 
                            textMain={t.textMain} 
                          />
                          <span className={`text-xs md:text-sm font-bold ${t.textMain} px-3 py-1 rounded-full border ${isDark ? `${c.bgBadge} ${c.borderCard}` : `${t.bgLightSoft} ${t.borderSoft}`}`}>
                            {activeLang === 'ps' ? 'حدیث شمېره' : activeLang === 'fa' ? 'حدیث شماره' : 'Hadith'}
                          </span>
                        </div>
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
                          <span className="text-neutral-400 text-sm font-medium">{activeLang === 'ps' ? 'راوي:' : activeLang === 'fa' ? 'راوی:' : 'Narrator:'}</span>
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
                  {activeLang === 'ps' ? 'هیڅ پایله ونه موندل شوه' : activeLang === 'fa' ? 'هیچ نتیجه‌ای یافت نشد' : 'No results found'}
                </h3>
                <p className="text-neutral-500 font-medium">
                  {activeLang === 'ps' ? 'بله کلمه وپلټئ یا کټګوري بدله کړئ.' : activeLang === 'fa' ? 'کلمه دیگری را جستجو کنید یا دسته‌بندی را تغییر دهید.' : 'Try searching for a different keyword or category.'}
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
              className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-md"
              onClick={() => setIsSettingsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 max-h-[95vh] overflow-y-auto scrollbar-hide"
            >
              <div className={`${isDark ? `${c.bgModal} ${c.borderModal} text-white` : 'bg-white border border-neutral-100'} rounded-[2.5rem] shadow-2xl overflow-hidden`}>
                <div className={`flex items-center justify-between p-6 border-b ${isDark ? `${c.borderModal} bg-black/25` : 'border-neutral-100/80 bg-neutral-50/50'}`}>
                  <h3 className={`text-xl font-bold flex items-center gap-3 ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`}>
                    <div className={`${isDark ? `${c.bgBadge} text-amber-400` : `${t.bgLight}`} p-2 rounded-xl`}>
                      <Settings className={`w-5 h-5 ${isDark ? 'text-amber-400' : t.iconText}`} />
                    </div>
                    {activeLang === 'ps' ? 'تنظیمات' : activeLang === 'fa' ? 'تنظیمات' : 'Settings'}
                  </h3>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className={`p-2 rounded-full transition-all ${isDark ? 'text-zinc-400 hover:text-white hover:bg-neutral-900' : 'text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/50'}`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-8 space-y-8">
                  {/* Theme Mode Selector (Light/Dark) */}
                  <div>
                    <label className={`flex items-center gap-2 text-base font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`}>
                      <Sun className={`w-5 h-5 ${t.textMain}`} />
                      {activeLang === 'ps' ? 'اپلیکیشن رڼا که تیاره' : activeLang === 'fa' ? 'ظاهر برنامه (روشن / تاریک)' : 'Theme Mode'}
                    </label>
                    <div className={`flex p-1.5 rounded-2xl w-full border ${isDark ? `${c.bgBadge} ${c.borderModal}` : 'bg-neutral-100/80 border-neutral-200/50'}`}>
                      <button 
                        onClick={() => changeThemeMode('light')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                          themeMode === 'light' 
                            ? `${isDark ? `${c.bgCard} text-amber-400` : 'bg-white text-neutral-850'} shadow-md scale-[1.02]` 
                            : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        {activeLang === 'ps' ? 'رڼه روښانه' : activeLang === 'fa' ? 'روشن' : 'Light'}
                      </button>
                      <button 
                        onClick={() => changeThemeMode('dark')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                          themeMode === 'dark' 
                            ? `${isDark ? `${c.bgCard} text-amber-400` : 'bg-neutral-850 text-white'} shadow-md scale-[1.02]` 
                            : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        {activeLang === 'ps' ? 'توره تیاره' : activeLang === 'fa' ? 'تاریک' : 'Dark'}
                      </button>
                    </div>
                  </div>

                  {/* 24-Hour Daily Hadith Messages Option */}
                  <div className={`p-4 rounded-3xl border transition-all duration-300 ${isDark ? `${c.bgCard}/70 ${c.borderCard}` : 'bg-amber-50/50 border-amber-100'}`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex gap-2.5">
                        <div className={`p-2 rounded-xl scale-95 ${isDark ? `${c.bgBadge}/60` : 'bg-amber-100/60'}`}>
                          {notificationActive ? (
                            <BellRing className={`w-5 h-5 ${t.iconText}`} />
                          ) : (
                            <Bell className={`w-5 h-5 ${t.iconText}`} />
                          )}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`}>
                            {activeLang === 'ps' ? '۲۴ ساعته حدیث پیغامونه' : activeLang === 'fa' ? 'اعلان ۲۴ ساعته حدیث' : '24-Hour Hadith Alert'}
                          </h4>
                          <p className="text-xs text-neutral-550 mt-1 leading-relaxed">
                            {activeLang === 'ps' ? 'په ۲۴ ساعتونو کې یو تصادفي حدیث موبایل ته د نوټیفیکیشن په بڼه راځي.' : activeLang === 'fa' ? 'ارسال خودکار یک حدیث تصادفی به موبایل هر ۲۴ ساعت.' : 'Pick a random blessed hadith block as a lockscreen alert.'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => changeNotification(!notificationActive)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          notificationActive ? 'bg-amber-500' : 'bg-neutral-300'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            notificationActive ? (isRtl ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Instantly Test Push Message Button */}
                    <button
                      onClick={triggerDailyNotification}
                      className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl border border-dashed transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        isDark 
                          ? `${c.borderCard} hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 ${c.bgBadge}/50` 
                          : 'border-amber-200 hover:border-amber-500/50 text-amber-800 hover:text-amber-900 bg-amber-50'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      {activeLang === 'ps' ? 'خبرتیا وازموئ (همدا اوس حدیث واستوئ)' : activeLang === 'fa' ? 'آزمایش فوری اعلان (ارسال حدیث به دستگاه)' : 'Test Message Alert Now'}
                    </button>
                  </div>

                  {/* Theme Color Setting */}
                  <div>
                    <label className={`flex items-center gap-2 text-base font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`}>
                      <Palette className={`w-5 h-5 ${t.textMain}`} />
                      {activeLang === 'ps' ? 'د اپلیکیشن رنګ' : activeLang === 'fa' ? 'رنگ برنامه' : 'App Color'}
                    </label>
                    <div className="flex gap-4">
                      {(['amber', 'emerald', 'rose'] as ThemeColor[]).map((color) => (
                        <button
                          key={color}
                          onClick={() => setThemeColor(color)}
                          className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                            color === 'amber' ? 'bg-amber-500' : color === 'emerald' ? 'bg-teal-500' : 'bg-rose-500'
                          } ${themeColor === color ? 'border-white shadow-[0_0_0_2px_rgba(245,158,11,0.5)] scale-110' : 'border-transparent hover:scale-105'}`}
                          aria-label={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Font Size Setting */}
                  <div>
                    <label className={`flex items-center gap-2 text-base font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`}>
                      <Type className={`w-5 h-5 ${t.textMain}`} />
                      {activeLang === 'ps' ? 'د لیکلو کچه' : activeLang === 'fa' ? 'اندازه متن' : 'Text Size'}
                    </label>
                    <div className={`flex p-1.5 rounded-2xl w-full border ${isDark ? `${c.bgBadge} ${c.borderModal}` : 'bg-neutral-100/80 border-neutral-200/50'}`}>
                      {(['normal', 'large', 'xlarge'] as FontSize[]).map((size) => (
                        <button 
                          key={size}
                          onClick={() => setFontSize(size)}
                          className={`flex-1 flex justify-center py-3 rounded-xl font-bold transition-all duration-300 ${
                            fontSize === size 
                              ? `${isDark ? `${c.bgCard} text-amber-400` : `bg-white ${t.textMain}`} shadow-md scale-[1.02]` 
                              : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                        >
                          {size === 'normal' 
                            ? (activeLang === 'ps' ? 'عادي' : activeLang === 'fa' ? 'عادی' : 'Normal')
                            : size === 'large'
                            ? (activeLang === 'ps' ? 'لوی' : activeLang === 'fa' ? 'بزرگ' : 'Large')
                            : (activeLang === 'ps' ? 'خورا لوی' : activeLang === 'fa' ? 'خیلی بزرگ' : 'X-Large')
                          }
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Pattern Setting */}
                  <div>
                    <label className={`flex items-center gap-2 text-base font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`}>
                      <LayoutTemplate className={`w-5 h-5 ${t.textMain}`} />
                      {activeLang === 'ps' ? 'د شالید ډیزاین' : activeLang === 'fa' ? 'طرح پس‌زمینه' : 'Background Pattern'}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['minimal', 'geometric'] as ThemePattern[]).map((pattern) => (
                        <button
                          key={pattern}
                          onClick={() => setThemePattern(pattern)}
                          className={`py-4 rounded-2xl font-bold border-2 transition-all duration-300 ${
                            themePattern === pattern
                              ? (isDark ? `border-amber-500 ${c.bgCard} text-amber-400` : `${t.borderSolid} ${t.bgLight} ${t.textDark}`)
                              : `${isDark ? `${c.borderCard} ${c.bgBadge}/50 text-neutral-400` : 'border-neutral-200 bg-transparent text-neutral-500'} ${t.borderHover} hover:${t.textMain}`
                          }`}
                        >
                          {pattern === 'minimal' 
                            ? (activeLang === 'ps' ? 'ساده' : activeLang === 'fa' ? 'ساده' : 'Minimal')
                            : (activeLang === 'ps' ? 'هندسي' : activeLang === 'fa' ? 'هندسی' : 'Geometric')
                          }
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Owner Credit Badge with Developer Info and Disclaimer */}
                  <div className={`p-5 rounded-[2rem] border flex flex-col gap-4 transition-all duration-300 ${isDark ? `${c.bgCard} ${c.borderCard}` : 'bg-amber-50/45 border-amber-200/40 text-neutral-900'}`}>
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl ${isDark ? c.bgBadge : 'bg-amber-100/80'} text-amber-600 dark:text-amber-400`}>
                        <User className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold opacity-60">
                          {activeLang === 'ps' ? 'د جوړوونکي نوم' : activeLang === 'fa' ? 'سازنده برنامه' : 'App Developer'}
                        </div>
                        <div className="text-lg font-bold tracking-wide text-amber-600 dark:text-amber-400" style={{ fontFamily: 'var(--font-amiri), serif' }}>
                          {activeLang === 'ps' || activeLang === 'fa' ? 'طالب العلم ابوساجد' : 'طالب العلم ابوساجد'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Beautiful disclaimer with fallback translations */}
                    <div className={`text-xs md:text-sm font-medium leading-relaxed border-t pt-3 p-1 opacity-95 ${isDark ? 'border-neutral-800/80 text-neutral-300' : 'border-amber-200/40 text-amber-950/90'}`} dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: 'var(--font-amiri), serif' }}>
                      {activeLang === 'ps' ? (
                        "موږ د اپلیکیشن جوړولو کې پوره کوښښ کړی خو انسان عاجز دی که کومه ستونځه پکې وي موږ سره اړیکه ونیسئ مننه."
                      ) : activeLang === 'fa' ? (
                        "ما در ساخت این برنامه تلاش وافری نموده‌ایم، امّا انسان عاجز و ناتوان است. اگر در آن اشکالی مشاهده کردید، لطفاً با ما در تماس شوید. تشکر."
                      ) : (
                        "لقد بذلنا قصارى جهدنا في تطوير هذا التطبيق، ولكن الإنسان عاجز ومقصر، فإذا كانت هناك أي مشكلة يرجى الاتصال بنا، وشكراً لكم."
                      )}
                    </div>
                  </div>

                  {/* Developer Contact Section */}
                  <div className={`pt-6 border-t ${isDark ? c.borderModal : 'border-neutral-100'}`}>
                    <h4 className={`flex items-center gap-2 text-base font-bold mb-4 ${isDark ? 'text-zinc-100' : 'text-neutral-800'}`}>
                      <User className={`w-5 h-5 ${t.textMain}`} />
                      {activeLang === 'ps' ? 'له موږ سره اړیکه' : activeLang === 'fa' ? 'تماس با ما' : 'Contact Us'}
                    </h4>
                    <div className="space-y-3 font-sans text-sm">
                      <a href="mailto:shga4566@gmail.com" className={`flex items-center gap-3 p-3 rounded-xl border transition-colors w-full ${
                        isDark ? `${c.bgCard} hover:${c.bgBadge} ${c.borderCard} text-amber-100` : 'bg-neutral-50 hover:bg-neutral-100 border-transparent hover:border-neutral-200 text-neutral-700'
                      }`}>
                        <Mail className="w-5 h-5 text-neutral-500" />
                        <span className="font-semibold" dir="ltr">shga4566@gmail.com</span>
                      </a>
                      <a href="https://t.me/shga4566" target="_blank" rel="noreferrer" className={`flex items-center gap-3 p-3 rounded-xl border transition-colors w-full ${
                        isDark ? `${c.bgCard} hover:${c.bgBadge} ${c.borderCard} text-amber-100` : 'bg-neutral-50 hover:bg-blue-50 border-transparent hover:border-blue-200 text-neutral-700 hover:text-blue-600'
                      }`}>
                        <Send className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold" dir="ltr">Telegram</span>
                      </a>
                      <a href="https://wa.me/" target="_blank" rel="noreferrer" className={`flex items-center gap-3 p-3 rounded-xl border transition-colors w-full ${
                        isDark ? `${c.bgCard} hover:${c.bgBadge} ${c.borderCard} text-amber-100` : 'bg-neutral-50 hover:bg-green-50 border-transparent hover:border-green-200 text-neutral-700 hover:text-green-600'
                      }`}>
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold" dir="ltr">WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className={`w-full ${t.btnActive} hover:opacity-90 font-bold py-4 rounded-2xl transition-all shadow-lg mt-6`}
                  >
                    {activeLang === 'ps' ? 'پلي کول' : activeLang === 'fa' ? 'تایید' : 'Apply Settings'}
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
                  {activeLang === 'ps' ? 'له اپلیکیشن څخه وتل' : activeLang === 'fa' ? 'خروج از برنامه' : 'Exit Application'}
                </h3>
                
                <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-neutral-600'} leading-relaxed`} style={{ fontFamily: 'var(--font-amiri), serif' }}>
                  {activeLang === 'ps' ? 'ایا تاسو ډاډه یاست چې غواړئ له اپلیکیشن څخه بهر شئ؟' : activeLang === 'fa' ? 'آیا مطمئن هستید که می‌خواهید از برنامه خارج شوید؟' : 'Are you sure you want to leave and exit the application?'}
                </p>
                
                {/* Yes/No Buttons */}
                <div className="flex gap-4 w-full mt-4">
                  <button
                    onClick={() => {
                      setIsExitModalOpen(false);
                      if (typeof window !== 'undefined') {
                        try {
                          window.close();
                          window.location.href = 'about:blank';
                        } catch (e) {
                          console.log('Window close failed', e);
                        }
                      }
                    }}
                    className="flex-1 py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-95 transition-all shadow-lg shadow-red-600/20 active:scale-95 duration-200"
                  >
                    {activeLang === 'ps' ? 'هو' : activeLang === 'fa' ? 'بله' : 'Yes'}
                  </button>
                  
                  <button
                    onClick={() => setIsExitModalOpen(false)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold border transition-colors active:scale-95 duration-200 ${
                      isDark 
                        ? `${c.bgBadge} ${c.borderCard} text-zinc-300 hover:bg-[#4a351e]` 
                        : 'bg-neutral-100 hover:bg-[#eae8e0] text-neutral-800 border-neutral-200'
                    }`}
                  >
                    {activeLang === 'ps' ? 'نا' : activeLang === 'fa' ? 'نخیر' : 'No'}
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


