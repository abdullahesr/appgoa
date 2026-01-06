import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  Zap, 
  Cpu, 
  Activity, 
  Cpu as GpuIcon, 
  Wifi, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  RefreshCcw,
  Terminal,
  Trophy,
  Activity as PulseIcon,
  Languages,
  LineChart,
  HardDrive,
  Sliders,
  Trash2,
  Volume2,
  VolumeX,
  AlertTriangle,
  BatteryMedium,
  Thermometer,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  Lock,
  Flame,
  Palette,
  X,
  FileDown,
  FileUp,
  FilePlus2,
  Clock,
  Globe,
  Award,
  Sparkles,
  Wind,
  Bolt,
  ArrowLeft,
  ArrowRight,
  MousePointer2
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Legend
} from 'recharts';
import { FpsMode, SystemStats, OptimizationLog, Profile, SessionReport } from './types';

type Language = 'tr' | 'en';
type Theme = 'cyan' | 'amber' | 'crimson' | 'emerald';

const themes: Record<Theme, Record<string, string>> = {
  cyan: {
    main: 'cyan',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    accent: 'accent-cyan-500',
    bg: 'bg-cyan-500',
    hoverBg: 'hover:bg-cyan-400',
    shadow: 'shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    stopColor: '#22d3ee',
  },
  amber: {
    main: 'amber',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    accent: 'accent-amber-500',
    bg: 'bg-amber-500',
    hoverBg: 'hover:bg-amber-400',
    shadow: 'shadow-[0_0_15px_rgba(251,191,36,0.4)]',
    stopColor: '#fbbf24',
  },
  crimson: {
    main: 'crimson',
    text: 'text-rose-500',
    border: 'border-rose-500/30',
    accent: 'accent-rose-500',
    bg: 'bg-rose-600',
    hoverBg: 'hover:bg-rose-500',
    shadow: 'shadow-[0_0_15px_rgba(225,29,72,0.4)]',
    stopColor: '#f43f5e',
  },
  emerald: {
    main: 'emerald',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    accent: 'accent-emerald-500',
    bg: 'bg-emerald-500',
    hoverBg: 'hover:bg-emerald-400',
    shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.4)]',
    stopColor: '#34d399',
  },
};


const translations = {
  tr: {
    subtitle: "MOBİL PERFORMANS PAKETİ",
    fpsChart: "PERFORMANS GRAFİĞİ",
    hwChart: "DONANIM PERFORMANS İZLEME",
    liveData: "CANLI VERİ",
    boostBtn: "BOOST'U ETKİNLEŞTİR",
    stopBoost: "BOOST'U DURDUR",
    optimizing: "OPTİMİZE EDİLİYOR...",
    optimized: "OPTİMİZE EDİLDİ",
    shieldTitle: "GÜVENLİ MOTOR DURUMU",
    optLabel: "Optimizasyon",
    inputLagLabel: "Giriş Gecikmesi",
    active: "AKTİF",
    passive: "DEVRE DIŞI",
    minimum: "MİNİMUM",
    normal: "NORMAL",
    logTitle: "SİSTEM GÜNLÜKLERİ",
    logEmpty: "Başlatılmaya hazır...",
    boostSuccess: "90-240 Fps Tool Aktif: {mode} FPS moduna kilitlendi",
    boostStart: "Hiper-optimizasyon başlatılıyor...",
    boostStop: "Optimizasyon durduruldu. Rapor oluşturuluyor...",
    customTarget: "Özel Hedef FPS",
    cleanRam: "RAM TEMİZLE",
    deepCleanBtn: "DERİN TEMİZLİK",
    cleaning: "TEMİZLENİYOR...",
    deepCleaning: "DERİN TEMİZLİK...",
    ramCleanStart: "RAM temizleme işlemi başlatıldı...",
    deepCleanStart: "Derin temizlik başlatıldı...",
    ramCleanSuccess: "RAM başarıyla temizlendi: {amount}MB boşaltıldı",
    deepCleanSuccess: "Derin temizlik tamamlandı: {amount}MB boşaltıldı",
    networkOptimizeBtn: "AĞI OPTİMİZE ET",
    optimizingNetwork: "AĞ OPTİMİZE EDİLİYOR...",
    networkCleanStart: "Ağ optimizasyonu başlatıldı...",
    networkCleanSuccess: "Ağ optimize edildi: Gecikme {amount}ms düşürüldü",
    systemCapacity: "SİSTEM KARARLILIĞI",
    stabilityWarning: "KRİTİK: DÜŞÜK KARARLILIK",
    highFpsWarning: "DİKKAT: 125 FPS üstü sistem ömrünü etkileyebilir ve aşırı ısınmaya yol açabilir!",
    autoTunerLabel: "AUTO-TUNER",
    autoMode: "OTOMATİK",
    thermalThrottling: "TERMAL KORUMA: FPS Düşürüldü",
    thermalThrottlingDetail: "Termal Koruma: Sıcaklık {temp}°C'yi aştı. FPS, {from} değerinden {to} değerine düşürüldü.",
    cpuThrottling: "CPU KISITLANDI",
    cpuThrottlingDetail: "KRİTİK: Yüksek sıcaklık veya düşük kararlılık nedeniyle CPU performansı kısıtlandı.",
    thermalOptimal: "Termal değerler normale döndü.",
    limitTitle: "SİSTEM LİMİTLERİ",
    maxFpsLimit: "Max FPS Sınırı",
    maxCpuLimit: "Max CPU Kullanımı (%)",
    maxGpuLimit: "Max GPU Kullanımı (%)",
    gpuOverclock: "GPU Hız Aşırtma (%)",
    gpuOverclockStatus: "HIZ AŞIRTMA",
    gpuOverclockWarning: "UYARI: Hız aşırtma kararsızlığa yol açabilir!",
    limitHit: "LİMİT AKTİF",
    thermalAlertTitle: "ACİL DURUM: YÜKSEK SICAKLIK",
    thermalAlertDesc: "Auto-Tuner donanımı korumak için performansı kısıtladı.",
    themeSelectorTitle: "TEMA SEÇ",
    profileManagerTitle: "PROFİL YÖNETİCİSİ",
    saveProfileBtn: "PROFİLİ KAYDET",
    loadProfileBtn: "Yükle",
    deleteProfileBtn: "Sil",
    profileNamePlaceholder: "Profil adı (örn: Valorant)",
    profileLoaded: "Profil yüklendi: {name}",
    profileSaved: "Profil kaydedildi: {name}",
    sessionReportTitle: "OTURUM PERFORMANS RAPORU",
    sessionDuration: "Süre",
    avgFps: "Ortalama FPS",
    maxTemp: "Maks. Sıcaklık",
    minCapacity: "Min. Kararlılık",
    thermalEvents: "Termal Olaylar",
    closeBtn: "Kapat",
    gameVersion: "OYUN VERSİYONU",
    versionSpecificPatches: "{version} versiyonuna özel yamalar uygulanıyor...",
    simulationTitle: "DONANIM SİMÜLASYON AYARLARI",
    cpuSimLabel: "CPU Çekirdek Sim.",
    gpuSimLabel: "GPU Mimarisi",
    ramSimLabel: "RAM Hızı",
    thermalModelLabel: "Gelişmiş Termal Model",
    realisticLoadLabel: "Gerçekçi Yük Sim.",
    cpuOptions: { Default: 'Varsayılan', Performance: 'Performans', 'High-End': 'Yüksek Sınıf' },
    gpuOptions: { Standard: 'Standart', Advanced: 'Gelişmiş', 'Desktop Class': 'Masaüstü Sınıfı' },
    ramOptions: { Standard: 'Standart', Performance: 'Performans', Gaming: 'Oyun' },
    performanceScoreTitle: "PERFORMANS PUANI",
    achievementTitle: "BAŞARIMLAR",
    achievementUnlocked: "Başarım Kazanıldı!",
    powerPlanTitle: "GÜÇ PLANI",
    powerPlanApplied: "Güç Planı Uygulandı: {plan}",
    powerPlanOptions: { Saver: 'Tasarruf', Balanced: 'Dengeli', Performance: 'Performans' },
    coolerTitle: "SOĞUTMA SİSTEMİ",
    coolerOptions: { Stock: 'Stok Fan', Liquid: 'Sıvı Soğutma', Thermoelectric: 'Termoelektrik' },
    patchAlreadyActive: "{version} versiyonu için yama zaten aktif.",
    patchInitiated: "{version} için yama işlemi başlatılıyor...",
    patchAnalyze: "{version} için oyun dosyaları analiz ediliyor...",
    patchApplyFixes: "{version} için uyumluluk düzeltmeleri uygulanıyor...",
    patchSuccess: "{version} için yama başarıyla uygulandı.",
    achievements: {
      first_boost: { name: "İlk Güçlendirme!", desc: "BOOST özelliğini ilk kez etkinleştir." },
      overclocker: { name: "Hız Aşırtma Uzmanı", desc: "GPU hız aşırtmayı %15'in üzerine çıkar." },
      ice_man: { name: "Buz Adam", desc: "Sıcaklığı 10 dakika 50°C altında tut." },
      profiler: { name: "Profil Profesörü", desc: "3 veya daha fazla profil kaydet." }
    },
    deepCleanSteps: [
      "Sanal bellek birleştiriliyor...",
      "Shader önbelleği temizleniyor...",
      "İşlemci çekirdekleri yeniden senkronize ediliyor..."
    ],
    tooltips: {
      selectMode: "Modu Seç:",
      toggleSound: "Sesi Aç/Kapat",
      switchLang: "Dili Değiştir (TR/EN)",
      customFps: "Manuel FPS Limiti"
    },
    steps: [
      "Bellek (RAM) önbelleği temizleniyor...",
      "Gecikme azaltma anahtarları optimize ediliyor...",
      "Oyun süreçlerine yüksek öncelik veriliyor...",
      "Sanal GPU bufferları yapılandırılıyor...",
      "FPS kararlılık yamaları enjekte ediliyor...",
      "Arka plan servisleri askıya alınıyor..."
    ],
    networkLogSteps: [
      "DNS önbelleği temizleniyor...",
      "TCP/IP yığınları optimize ediliyor...",
      "Oyun veri paketlerine öncelik tanınıyor..."
    ],
    features: [
      { title: "Güvenli Motor", desc: "Anti-cheat korumalı motor ile güvenli oyun." },
      { title: "Oto-Tuner", desc: "Termal değerlere göre otomatik ayarlama." },
      { title: "Rank Hazır", desc: "Rekabetçi oyunlar için düşük giriş gecikmesi." }
    ],
    tutorial: {
        next: "İleri",
        prev: "Geri",
        finish: "Bitir",
        steps: [
            { title: "Hoş Geldiniz!", text: "Bu hızlı tur, uygulamanın temel özelliklerinde size yol gösterecek." },
            { title: "FPS Modları", text: "İstediğiniz performans modunu buradan seçin. OTOMATİK mod, sistem sıcaklığına göre kendini ayarlar." },
            { title: "Ana Yükseltme", text: "Optimizasyonu başlatmak için bu düğmeyi kullanın. Aktifken, durdurmak için tekrar basın." },
            { title: "Canlı İstatistikler", text: "Sisteminizin performansını (FPS, CPU, Sıcaklık vb.) buradan anlık olarak izleyin." },
            { title: "Gelişmiş Kontroller", text: "Performansı daha da hassas ayarlamak için RAM temizleme ve ağ optimizasyonu gibi araçları kullanın." }
        ]
    },
    loadingScreen: {
      title: "SİSTEM BAŞLATILIYOR",
      messages: [
        "Donanım analizi yapılıyor...",
        "Sensörler kalibre ediliyor...",
        "Profiller yükleniyor...",
        "Arayüz sonlandırılıyor..."
      ]
    },
    performanceScoreBreakdown: "PERFORMANS PUANI ANALİZİ",
    overallScore: "Genel Puan",
    scoreWeighting: "Puan Ağırlığı",
    fpsFactor: "FPS",
    tempFactor: "Sıcaklık",
    stabilityFactor: "Kararlılık",
    pingFactor: "Gecikme",
    modeSelectorLabel: "PERFORMANS MODU",
    deviceProfileTitle: "CİHAZ PROFİLİ",
    brand: "Marka",
    model: "Model",
    customDevice: "Özel Cihaz / Manuel Ayar",
    deviceProfileLoaded: "{name} profili yüklendi. Ayarlar cihaza göre optimize edildi."
  },
  en: {
    subtitle: "MOBILE PERFORMANCE SUITE",
    fpsChart: "PERFORMANCE GRAPH",
    hwChart: "HARDWARE PERFORMANCE MONITOR",
    liveData: "LIVE DATA",
    boostBtn: "ACTIVATE BOOST",
    stopBoost: "STOP BOOST",
    optimizing: "OPTIMIZING...",
    optimized: "OPTIMIZED",
    shieldTitle: "SECURE ENGINE STATUS",
    optLabel: "Optimization",
    inputLagLabel: "Input Lag",
    active: "ACTIVE",
    passive: "DISABLED",
    minimum: "MINIMUM",
    normal: "NORMAL",
    logTitle: "SYSTEM LOGS",
    logEmpty: "Ready to initiate...",
    boostSuccess: "90-240 Fps Tool Active: Locked at {mode} FPS",
    boostStart: "Initializing hyper-optimization...",
    boostStop: "Optimization stopped. Generating report...",
    customTarget: "Custom Target FPS",
    cleanRam: "CLEAN RAM",
    deepCleanBtn: "DEEP CLEAN",
    cleaning: "CLEANING...",
    deepCleaning: "DEEP CLEANING...",
    ramCleanStart: "RAM cleaning initiated...",
    deepCleanStart: "Deep cleaning initiated...",
    ramCleanSuccess: "RAM cleaned successfully: {amount}MB released",
    deepCleanSuccess: "Deep clean complete: {amount}MB released",
    networkOptimizeBtn: "OPTIMIZE NETWORK",
    optimizingNetwork: "OPTIMIZING NETWORK...",
    networkCleanStart: "Network optimization initiated...",
    networkCleanSuccess: "Network optimized: Latency reduced by {amount}ms",
    systemCapacity: "SYSTEM STABILITY",
    stabilityWarning: "CRITICAL: LOW STABILITY",
    highFpsWarning: "WARNING: Above 125 FPS may impact system lifespan and lead to overheating!",
    autoTunerLabel: "AUTO-TUNER",
    autoMode: "AUTO",
    thermalThrottling: "THERMAL PROTECTION: FPS Reduced",
    thermalThrottlingDetail: "Thermal Protection: Temp exceeded {temp}°C. FPS reduced from {from} to {to}.",
    cpuThrottling: "CPU THROTTLED",
    cpuThrottlingDetail: "CRITICAL: CPU performance throttled due to high temp or low stability.",
    thermalOptimal: "Thermal values returned to optimal range.",
    limitTitle: "SYSTEM LIMITS",
    maxFpsLimit: "Max FPS Limit",
    maxCpuLimit: "Max CPU Usage (%)",
    maxGpuLimit: "Max GPU Usage (%)",
    gpuOverclock: "GPU Overclock (%)",
    gpuOverclockStatus: "OVERCLOCKED",
    gpuOverclockWarning: "WARNING: Overclocking may cause instability!",
    limitHit: "LIMIT HIT",
    thermalAlertTitle: "EMERGENCY: HIGH TEMPERATURE",
    thermalAlertDesc: "Auto-Tuner throttled performance to protect hardware.",
    themeSelectorTitle: "SELECT THEME",
    profileManagerTitle: "PROFILE MANAGER",
    saveProfileBtn: "SAVE PROFILE",
    loadProfileBtn: "Load",
    deleteProfileBtn: "Delete",
    profileNamePlaceholder: "Profile name (e.g., Valorant)",
    profileLoaded: "Profile loaded: {name}",
    profileSaved: "Profile saved: {name}",
    sessionReportTitle: "SESSION PERFORMANCE REPORT",
    sessionDuration: "Duration",
    avgFps: "Average FPS",
    maxTemp: "Max Temperature",
    minCapacity: "Min Stability",
    thermalEvents: "Thermal Events",
    closeBtn: "Close",
    gameVersion: "GAME VERSION",
    versionSpecificPatches: "Applying {version} specific patches...",
    simulationTitle: "HARDWARE SIMULATION SETTINGS",
    cpuSimLabel: "CPU Core Sim",
    gpuSimLabel: "GPU Architecture",
    ramSimLabel: "RAM Speed",
    thermalModelLabel: "Advanced Thermal Model",
    realisticLoadLabel: "Realistic Load Sim",
    cpuOptions: { Default: 'Default', Performance: 'Performance', 'High-End': 'High-End' },
    gpuOptions: { Standard: 'Standard', Advanced: 'Advanced', 'Desktop Class': 'Desktop Class' },
    ramOptions: { Standard: 'Standard', Performance: 'Performance', Gaming: 'Gaming' },
    performanceScoreTitle: "PERFORMANCE SCORE",
    achievementTitle: "ACHIEVEMENTS",
    achievementUnlocked: "Achievement Unlocked!",
    powerPlanTitle: "POWER PLAN",
    powerPlanApplied: "Power Plan Applied: {plan}",
    powerPlanOptions: { Saver: 'Saver', Balanced: 'Balanced', Performance: 'Performance' },
    coolerTitle: "COOLING SYSTEM",
    coolerOptions: { Stock: 'Stock Fan', Liquid: 'Liquid Cooling', Thermoelectric: 'Thermoelectric' },
    patchAlreadyActive: "Patch for version {version} is already active.",
    patchInitiated: "Initiating patch for {version}...",
    patchAnalyze: "Analyzing game files for {version}...",
    patchApplyFixes: "Applying compatibility fixes for {version}...",
    patchSuccess: "Patch for version {version} applied successfully.",
    achievements: {
      first_boost: { name: "First Boost!", desc: "Activate the BOOST feature for the first time." },
      overclocker: { name: "Overclock Specialist", desc: "Push GPU Overclock above 15%." },
      ice_man: { name: "Ice Man", desc: "Keep temp below 50°C for 10 minutes." },
      profiler: { name: "Profile Professor", desc: "Save 3 or more custom profiles." }
    },
    deepCleanSteps: [
      "Defragmenting virtual memory blocks...",
      "Flushing shader cache...",
      "Re-syncing processor core timings..."
    ],
    tooltips: {
      selectMode: "Select Mode:",
      toggleSound: "Toggle Sound",
      switchLang: "Switch Language (TR/EN)",
      customFps: "Manual FPS Limit"
    },
    steps: [
      "Clearing standby memory cache...",
      "Optimizing registry keys for low latency...",
      "Prioritizing gaming processes (High)...",
      "Overclocking virtual GPU buffers...",
      "Injecting FPS stability patches...",
      "Cleaning background services..."
    ],
    networkLogSteps: [
      "Flushing DNS cache...",
      "Optimizing TCP/IP stacks...",
      "Prioritizing game data packets..."
    ],
    features: [
      { title: "Safe Engine", desc: "Anti-cheat protected engine for safe play." },
      { title: "Auto-Tuner", desc: "Automated adjustments based on thermals." },
      { title: "Rank Ready", desc: "Reduced input lag for competitive gaming." }
    ],
    tutorial: {
        next: "Next",
        prev: "Previous",
        finish: "Finish",
        steps: [
            { title: "Welcome!", text: "This quick tour will guide you through the key features of the app." },
            { title: "FPS Modes", text: "Select your desired performance mode here. AUTO mode adjusts automatically based on system temperature." },
            { title: "Main Boost", text: "Use this button to start the optimization. When active, press it again to stop." },
            { title: "Live Stats", text: "Monitor your system's performance (FPS, CPU, Temp, etc.) in real-time here." },
            { title: "Advanced Tools", text: "Use tools like RAM Clean and Network Optimization to fine-tune performance further." }
        ]
    },
    loadingScreen: {
      title: "INITIALIZING SYSTEM",
      messages: [
        "Analyzing hardware...",
        "Calibrating sensors...",
        "Loading profiles...",
        "Finalizing UI..."
      ]
    },
    performanceScoreBreakdown: "PERFORMANCE SCORE BREAKDOWN",
    overallScore: "Overall Score",
    scoreWeighting: "Score Weighting",
    fpsFactor: "FPS",
    tempFactor: "Temperature",
    stabilityFactor: "Stability",
    pingFactor: "Ping",
    modeSelectorLabel: "PERFORMANCE MODE",
    deviceProfileTitle: "DEVICE PROFILE",
    brand: "Brand",
    model: "Model",
    customDevice: "Custom Device / Manual Tune",
    deviceProfileLoaded: "{name} profile loaded. Settings optimized for your device."
  }
};

const deviceProfiles: Record<string, Record<string, { name: string; ram: number; maxFps: number; recommendedMode: FpsMode; }>> = {
  Asus: {
    'ROG Phone 5': { name: 'Asus ROG Phone 5', ram: 16, maxFps: 240, recommendedMode: FpsMode.ULTRA },
    'ROG Phone 6': { name: 'Asus ROG Phone 6', ram: 16, maxFps: 240, recommendedMode: FpsMode.ULTRA },
    'Zenfone 8': { name: 'Asus Zenfone 8', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
  },
  Google: {
    'Pixel 6': { name: 'Google Pixel 6', ram: 8, maxFps: 90, recommendedMode: FpsMode.PRO },
    'Pixel 6 Pro': { name: 'Google Pixel 6 Pro', ram: 12, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Pixel 7': { name: 'Google Pixel 7', ram: 8, maxFps: 90, recommendedMode: FpsMode.PRO },
    'Pixel 7 Pro': { name: 'Google Pixel 7 Pro', ram: 12, maxFps: 120, recommendedMode: FpsMode.EXTREME },
  },
  Huawei: {
    'P50 Pro': { name: 'Huawei P50 Pro', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'P40 Pro': { name: 'Huawei P40 Pro', ram: 8, maxFps: 90, recommendedMode: FpsMode.PRO },
    'Mate 40 Pro': { name: 'Huawei Mate 40 Pro', ram: 8, maxFps: 90, recommendedMode: FpsMode.PRO },
    'Nova 9': { name: 'Huawei Nova 9', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Y9a': { name: 'Huawei Y9a', ram: 6, maxFps: 60, recommendedMode: FpsMode.NORMAL },
    'P30 Lite': { name: 'Huawei P30 Lite', ram: 4, maxFps: 60, recommendedMode: FpsMode.NORMAL },
  },
  Infinix: {
    'Zero Ultra': { name: 'Infinix Zero Ultra', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Note 12 VIP': { name: 'Infinix Note 12 VIP', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Hot 20S': { name: 'Infinix Hot 20S', ram: 8, maxFps: 120, recommendedMode: FpsMode.NORMAL },
    'Smart 6': { name: 'Infinix Smart 6', ram: 2, maxFps: 60, recommendedMode: FpsMode.NORMAL },
  },
  Motorola: {
    'Edge 30 Ultra': { name: 'Motorola Edge 30 Ultra', ram: 12, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    'Edge+ (2022)': { name: 'Motorola Edge+ (2022)', ram: 8, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    'Moto G82': { name: 'Motorola Moto G82', ram: 6, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Moto G Stylus (2022)': { name: 'Moto G Stylus (2022)', ram: 6, maxFps: 90, recommendedMode: FpsMode.NORMAL },
    'Moto E32': { name: 'Motorola Moto E32', ram: 4, maxFps: 90, recommendedMode: FpsMode.NORMAL },
  },
  Nokia: {
    'XR20': { name: 'Nokia XR20', ram: 6, maxFps: 60, recommendedMode: FpsMode.NORMAL },
    'G50': { name: 'Nokia G50', ram: 4, maxFps: 60, recommendedMode: FpsMode.NORMAL },
    'X20': { name: 'Nokia X20', ram: 8, maxFps: 60, recommendedMode: FpsMode.NORMAL },
  },
  OnePlus: {
    'Nord 2': { name: 'OnePlus Nord 2', ram: 8, maxFps: 90, recommendedMode: FpsMode.PRO },
    '8T': { name: 'OnePlus 8T', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    '9': { name: 'OnePlus 9', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    '9 Pro': { name: 'OnePlus 9 Pro', ram: 12, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    '10 Pro': { name: 'OnePlus 10 Pro', ram: 12, maxFps: 240, recommendedMode: FpsMode.ULTRA },
    '10T': { name: 'OnePlus 10T', ram: 16, maxFps: 240, recommendedMode: FpsMode.ULTRA },
  },
  Oppo: {
    'Reno 8 Pro': { name: 'Oppo Reno 8 Pro', ram: 12, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Reno 8': { name: 'Oppo Reno 8', ram: 8, maxFps: 90, recommendedMode: FpsMode.PRO },
    'Find X5 Pro': { name: 'Oppo Find X5 Pro', ram: 12, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    'A76': { name: 'Oppo A76', ram: 6, maxFps: 90, recommendedMode: FpsMode.NORMAL },
  },
  Realme: {
    'GT Master': { name: 'Realme GT Master Edition', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'GT 2 Pro': { name: 'Realme GT 2 Pro', ram: 12, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    'GT Neo 3T': { name: 'Realme GT Neo 3T', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    '9 Pro+': { name: 'Realme 9 Pro+', ram: 8, maxFps: 90, recommendedMode: FpsMode.PRO },
    '8 Pro': { name: 'Realme 8 Pro', ram: 6, maxFps: 90, recommendedMode: FpsMode.NORMAL },
  },
  Redmi: {
    'Note 8': { name: 'Redmi Note 8', ram: 4, maxFps: 90, recommendedMode: FpsMode.NORMAL },
    'Note 9 Pro': { name: 'Redmi Note 9 Pro', ram: 6, maxFps: 90, recommendedMode: FpsMode.NORMAL },
    'Note 10 Pro': { name: 'Redmi Note 10 Pro', ram: 6, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Note 11': { name: 'Redmi Note 11', ram: 6, maxFps: 90, recommendedMode: FpsMode.NORMAL },
    'Note 11 Pro+': { name: 'Redmi Note 11 Pro+', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'K40': { name: 'Redmi K40', ram: 8, maxFps: 125, recommendedMode: FpsMode.PRO },
    'K50 Gaming': { name: 'Redmi K50 Gaming', ram: 12, maxFps: 240, recommendedMode: FpsMode.EXTREME }
  },
  Reeder: {
    'S19 Max Pro': { name: 'Reeder S19 Max Pro', ram: 6, maxFps: 60, recommendedMode: FpsMode.NORMAL },
    'S19 Max': { name: 'Reeder S19 Max', ram: 4, maxFps: 60, recommendedMode: FpsMode.NORMAL },
    'P13 Blue Max': { name: 'Reeder P13 Blue Max', ram: 4, maxFps: 60, recommendedMode: FpsMode.NORMAL },
  },
  Samsung: {
    'A52': { name: 'Samsung Galaxy A52', ram: 6, maxFps: 90, recommendedMode: FpsMode.NORMAL },
    'A53': { name: 'Samsung Galaxy A53', ram: 8, maxFps: 120, recommendedMode: FpsMode.NORMAL },
    'A71': { name: 'Samsung Galaxy A71', ram: 6, maxFps: 90, recommendedMode: FpsMode.NORMAL },
    'M31': { name: 'Samsung Galaxy M31', ram: 6, maxFps: 60, recommendedMode: FpsMode.NORMAL },
    'S20 FE': { name: 'Samsung Galaxy S20 FE', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'S21 Ultra': { name: 'Samsung Galaxy S21 Ultra', ram: 12, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    'S22 Ultra': { name: 'Samsung Galaxy S22 Ultra', ram: 12, maxFps: 240, recommendedMode: FpsMode.ULTRA },
    'S23 Ultra': { name: 'Samsung Galaxy S23 Ultra', ram: 12, maxFps: 240, recommendedMode: FpsMode.ULTRA },
    'Z Fold 4': { name: 'Samsung Galaxy Z Fold 4', ram: 12, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    'Note 20 Ultra': { name: 'Samsung Note 20 Ultra', ram: 12, maxFps: 125, recommendedMode: FpsMode.EXTREME },
  },
  Sony: {
    'Xperia 1 IV': { name: 'Sony Xperia 1 IV', ram: 12, maxFps: 120, recommendedMode: FpsMode.EXTREME },
    'Xperia 5 III': { name: 'Sony Xperia 5 III', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Xperia 10 IV': { name: 'Sony Xperia 10 IV', ram: 6, maxFps: 60, recommendedMode: FpsMode.NORMAL },
  },
  Tecno: {
      'Camon 19 Pro': { name: 'Tecno Camon 19 Pro', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
      'Pova 4': { name: 'Tecno Pova 4', ram: 8, maxFps: 90, recommendedMode: FpsMode.NORMAL },
      'Spark 9 Pro': { name: 'Tecno Spark 9 Pro', ram: 4, maxFps: 60, recommendedMode: FpsMode.NORMAL },
  },
  Vivo: {
    'X80 Pro': { name: 'Vivo X80 Pro', ram: 12, maxFps: 120, recommendedMode: FpsMode.EXTREME },
    'V25 Pro': { name: 'Vivo V25 Pro', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'V23': { name: 'Vivo V23', ram: 8, maxFps: 90, recommendedMode: FpsMode.PRO },
    'Y35': { name: 'Vivo Y35', ram: 8, maxFps: 90, recommendedMode: FpsMode.NORMAL },
  },
  Xiaomi: {
    'Mi 10T Pro': { name: 'Xiaomi Mi 10T Pro', ram: 8, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    'Mi 11': { name: 'Xiaomi Mi 11', ram: 8, maxFps: 125, recommendedMode: FpsMode.EXTREME },
    '12 Pro': { name: 'Xiaomi 12 Pro', ram: 12, maxFps: 240, recommendedMode: FpsMode.ULTRA },
    '12T Pro': { name: 'Xiaomi 12T Pro', ram: 12, maxFps: 240, recommendedMode: FpsMode.ULTRA },
    'Poco X3 Pro': { name: 'Poco X3 Pro', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Poco F3': { name: 'Poco F3', ram: 8, maxFps: 120, recommendedMode: FpsMode.PRO },
    'Poco F4 GT': { name: 'Poco F4 GT', ram: 12, maxFps: 240, recommendedMode: FpsMode.EXTREME },
    'Black Shark 4': { name: 'Black Shark 4', ram: 12, maxFps: 240, recommendedMode: FpsMode.EXTREME },
    'Black Shark 5 Pro': { name: 'Black Shark 5 Pro', ram: 16, maxFps: 240, recommendedMode: FpsMode.ULTRA },
  },
};


const Snowfall: React.FC = () => {
    const snowflakes = useMemo(() => 
        Array.from({ length: 50 }).map((_, i) => {
            const style = {
                left: `${Math.random() * 100}vw`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `snowfall ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
            };
            return <div key={i} className="fixed top-0 bg-white rounded-full z-[99] shadow-[0_0_10px_#fff] pointer-events-none" style={style}></div>;
        })
    , []);

    return <>{snowflakes}</>;
};

const LoadingScreen: React.FC<{ onFinished: () => void; t: any; theme: Theme }> = ({ onFinished, t, theme }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');

  useEffect(() => {
    const fullMessage = t.loadingScreen.messages[messageIndex];
    let currentText = '';
    let charIndex = 0;
    setTypedMessage('');

    const typingInterval = setInterval(() => {
      if (charIndex < fullMessage.length) {
        currentText += fullMessage[charIndex];
        setTypedMessage(currentText);
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [messageIndex, t.loadingScreen.messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.ceil(Math.random() * 2);
        if (newProgress >= 100) {
          clearInterval(interval);
          setGlitch(false);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onFinished, 500);
          }, 500);
          return 100;
        }

        if (newProgress >= 25 && messageIndex < 1) setMessageIndex(1);
        else if (newProgress >= 50 && messageIndex < 2) setMessageIndex(2);
        else if (newProgress >= 85 && messageIndex < 3) setMessageIndex(3);

        setGlitch(Math.random() > 0.85);

        return newProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onFinished, messageIndex]);
  
  const CornerBracket: React.FC<{ position: string; delay: string }> = ({ position, delay }) => {
      let classes = `absolute w-8 h-8 border-cyan-400/50 animate-scan-in`;
      if (position.includes('top')) classes += ' top-4';
      if (position.includes('bottom')) classes += ' bottom-4';
      if (position.includes('left')) classes += ' left-4';
      if (position.includes('right')) classes += ' right-4';
      if (position === 'top-left') classes += ' border-t-2 border-l-2';
      if (position === 'top-right') classes += ' border-t-2 border-r-2';
      if (position === 'bottom-left') classes += ' border-b-2 border-l-2';
      if (position === 'bottom-right') classes += ' border-b-2 border-r-2';
      return <div className={classes} style={{ animationDelay: delay }}/>;
  }

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-900 transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'} overflow-hidden`}>
      <div className="absolute inset-0 loading-bg" />
      <div className="grid-overlay" />
      <CornerBracket position="top-left" delay="0s" />
      <CornerBracket position="top-right" delay="0.1s" />
      <CornerBracket position="bottom-left" delay="0.2s" />
      <CornerBracket position="bottom-right" delay="0.3s" />
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" strokeWidth="2" className="text-slate-700/50" stroke="currentColor" fill="transparent" />
            <circle
                cx="60"
                cy="60"
                r="54"
                strokeWidth="2"
                className="text-cyan-400"
                stroke="currentColor"
                fill="transparent"
                strokeLinecap="round"
                style={{
                    strokeDasharray: 2 * Math.PI * 54,
                    strokeDashoffset: (2 * Math.PI * 54) * (1 - progress / 100),
                    transition: 'stroke-dashoffset 0.1s linear',
                    filter: `drop-shadow(0 0 5px #22d3ee)`
                }}
            />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`font-orbitron text-5xl font-bold text-white ${glitch ? 'text-glitch' : ''}`}>
            {progress}%
          </span>
        </div>
      </div>
      <div className="mt-8 text-center z-10">
        <h2 className="font-orbitron text-lg uppercase tracking-widest text-slate-300">{t.loadingScreen.title}</h2>
        <p className="text-sm text-slate-500 mt-2 transition-opacity duration-300 h-5 font-mono typing-cursor">{typedMessage}</p>
      </div>
      <div className="absolute bottom-4 text-xs text-slate-600 font-mono">
        SYS_INIT_v2.1
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('cyan');
  const [selectedMode, setSelectedMode] = useState<number>(FpsMode.AUTO);
  const [selectedVersion, setSelectedVersion] = useState('GLOBAL');
  const [appliedVersion, setAppliedVersion] = useState('GLOBAL');
  const [isPatching, setIsPatching] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isDeepCleaning, setIsDeepCleaning] = useState(false);
  const [isOptimizingNetwork, setIsOptimizingNetwork] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [isAutoTunerActive, setIsAutoTunerActive] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showThermalAlert, setShowThermalAlert] = useState(false);
  const [ramCleanEffect, setRamCleanEffect] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [systemActive, setSystemActive] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const themeSelectorRef = useRef<HTMLDivElement>(null);
  
  // Performance Score Modal State
  const [isScoreDetailsOpen, setIsScoreDetailsOpen] = useState(false);
  const [renderScoreDetails, setRenderScoreDetails] = useState(false);

  // Device Profile State
  const [selectedBrand, setSelectedBrand] = useState(() => {
    try {
      const savedDevice = localStorage.getItem('selectedDevice');
      return savedDevice ? JSON.parse(savedDevice).brand : 'CUSTOM';
    } catch (e) {
      return 'CUSTOM';
    }
  });

  const [selectedModel, setSelectedModel] = useState(() => {
    try {
      const savedDevice = localStorage.getItem('selectedDevice');
      return savedDevice ? JSON.parse(savedDevice).model : '';
    } catch (e) {
      return '';
    }
  });
  
  const openScoreDetails = useCallback(() => {
    setRenderScoreDetails(true);
    setTimeout(() => setIsScoreDetailsOpen(true), 10);
  }, []);

  const closeScoreDetails = useCallback(() => {
    setIsScoreDetailsOpen(false);
    setTimeout(() => setRenderScoreDetails(false), 300);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target as Node)) {
        setIsThemeSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const [maxFpsLimit, setMaxFpsLimit] = useState<number>(240);
  const [maxCpuLimit, setMaxCpuLimit] = useState<number>(95);
  const [maxGpuLimit, setMaxGpuLimit] = useState<number>(95);
  const [gpuOverclock, setGpuOverclock] = useState<number>(0);

  // Simulation State
  const [cpuSim, setCpuSim] = useState('Default');
  const [gpuSim, setGpuSim] = useState('Standard');
  const [ramSim, setRamSim] = useState('Standard');
  const [advThermal, setAdvThermal] = useState(false);
  const [realLoad, setRealLoad] = useState(false);
  const [cooler, setCooler] = useState('Stock');
  const [powerPlan, setPowerPlan] = useState('Balanced');
  
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    try {
      const savedProfiles = localStorage.getItem('userProfiles');
      return savedProfiles ? JSON.parse(savedProfiles) : [];
    } catch (e) {
      console.error("Failed to load profiles from local storage", e);
      return [];
    }
  });
  const [newProfileName, setNewProfileName] = useState("");

  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  const sessionDataRef = useRef({ startTime: 0, frames: 0, totalFps: 0, maxTemp: 0, minCapacity: 100, thermalThrottles: 0 });

  const [logs, setLogs] = useState<OptimizationLog[]>([]);
  const [stats, setStats] = useState<SystemStats & { fpsDisplay: string }>({ cpu: 0, gpu: 0, ram: 0, ping: 0, fps: 0.0, fpsDisplay: "0.0", capacity: 100, temp: 25, isFpsLimited: false, isCpuLimited: false, isGpuLimited: false, isCpuThrottled: false });
  const [history, setHistory] = useState<any[]>([]);
  
  const [performanceScore, setPerformanceScore] = useState({ grade: 'N/A', color: 'text-slate-400' });
  const [achievements, setAchievements] = useState<Set<string>>(new Set());
  const [unlockedQueue, setUnlockedQueue] = useState<string[]>([]);
  const tempUnder50Duration = useRef(0);
  
  const [visibleLines, setVisibleLines] = useState({ fps: true, cpu: false, temp: false });
  
  const [performanceScoreDetails, setPerformanceScoreDetails] = useState({
    overall: 0,
    grade: 'N/A',
    factors: {
        fps: { score: 0, value: "0.0", weight: 40 },
        temp: { score: 0, value: 25, weight: 30 },
        capacity: { score: 0, value: 100, weight: 20 },
        ping: { score: 0, value: 0, weight: 10 },
    }
  });

  const t = useMemo(() => translations[lang], [lang]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('userProfiles', JSON.stringify(profiles));
    } catch (e) {
      console.error("Failed to save profiles to local storage", e);
    }
  }, [profiles]);

  useEffect(() => {
    try {
      const device = { brand: selectedBrand, model: selectedModel };
      localStorage.setItem('selectedDevice', JSON.stringify(device));
    } catch (e) {
      console.error("Failed to save selected device to local storage", e);
    }
  }, [selectedBrand, selectedModel]);


  useEffect(() => {
    const tutorialSeen = localStorage.getItem('fpsToolTutorialSeen');
    if (!tutorialSeen) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    localStorage.setItem('fpsToolTutorialSeen', 'true');
    setShowTutorial(false);
  };

  const playSound = useCallback((type: 'click' | 'boost' | 'success' | 'flush' | 'warning' | 'emergency' | 'achievement') => {
    if (isMuted) return;
    if (!audioCtxRef.current) { audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(); }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    // Sound engine implementation...
  }, [isMuted]);
  
  const unlockAchievement = useCallback((id: string) => {
    if (achievements.has(id)) return;
    playSound('achievement');
    setAchievements(prev => new Set(prev).add(id));
    setUnlockedQueue(prev => [...prev, id]);
  }, [playSound, achievements]);

  const addLog = useCallback((message: string, status: 'pending' | 'success' | 'warning' = 'success') => {
    const newLog: OptimizationLog = { id: Math.random().toString(36).substr(2, 9), message, status, timestamp: new Date().toLocaleTimeString() };
    setLogs(prev => [newLog, ...prev].slice(0, 15));
  }, []);

  useEffect(() => {
    if (selectedBrand === 'CUSTOM') {
      setSelectedModel('');
      return;
    }
    const models = Object.keys(deviceProfiles[selectedBrand] || {});
    const currentModelIsValidForBrand = models.includes(selectedModel);

    if (models.length > 0 && !currentModelIsValidForBrand) {
      setSelectedModel(models[0]);
    } else if (models.length === 0) {
      setSelectedModel('');
    }
  }, [selectedBrand, selectedModel]);


  useEffect(() => {
    if (selectedBrand !== 'CUSTOM' && selectedModel) {
      const profile = deviceProfiles[selectedBrand]?.[selectedModel];
      if (profile) {
        setMaxFpsLimit(profile.maxFps);
        setSelectedMode(profile.recommendedMode);
        if (!isLoading) { // Don't log on initial load
          addLog(t.deviceProfileLoaded.replace('{name}', profile.name), 'success');
          playSound('success');
        }
      }
    }
  }, [selectedModel, selectedBrand, addLog, playSound, t.deviceProfileLoaded, isLoading]);


  useEffect(() => {
    const handlePowerPlan = (plan: string) => {
        let limits = { fps: 240, cpu: 95, gpu: 95 };
        if (plan === 'Saver') limits = { fps: 60, cpu: 70, gpu: 70 };
        if (plan === 'Balanced') limits = { fps: 120, cpu: 90, gpu: 90 };
        setMaxFpsLimit(limits.fps); setMaxCpuLimit(limits.cpu); setMaxGpuLimit(limits.gpu);
        const planName = t.powerPlanOptions[plan as keyof typeof t.powerPlanOptions];
        if (!isLoading) { // Don't log on initial load
            addLog(t.powerPlanApplied.replace('{plan}', planName), 'success');
        }
    };
    handlePowerPlan(powerPlan);
  }, [powerPlan, t.powerPlanOptions, t.powerPlanApplied, isLoading, addLog]);

  useEffect(() => {
    if (!systemActive) return;

    const interval = setInterval(() => {
      setStats(prev => {
        let rawFps, fpsDisplay, isFpsLimited = false;
        
        // --- Hardware Simulation Modifiers ---
        let cpuEfficiency = 1.0;
        if (cpuSim === 'Performance') cpuEfficiency = 0.95; else if (cpuSim === 'High-End') cpuEfficiency = 0.9;

        let gpuPower = 0, gpuHeatFactor = 1.0;
        if (gpuSim === 'Advanced') { gpuPower = 5; gpuHeatFactor = 1.1; } 
        else if (gpuSim === 'Desktop Class') { gpuPower = 12; gpuHeatFactor = 1.25; }

        let ramEfficiency = 1.0;
        if (ramSim === 'Performance') ramEfficiency = 0.95; else if (ramSim === 'Gaming') ramEfficiency = 0.9;
        
        const cpuFluctuation = realLoad ? 8 : 4;
        const gpuFluctuation = realLoad ? 10 : 6;
        
        let tempModifier = 1.0;
        if (cooler === 'Liquid') tempModifier = 0.85; else if (cooler === 'Thermoelectric') tempModifier = 0.65;
        
        const tempFluctuation = (advThermal ? 8 : 6) * tempModifier;
        const tempSensitivity = ((advThermal ? 1.5 : 1.2) * tempModifier) * gpuHeatFactor;
        
        const baseTemp = 35 + (prev.fps / 240) * 45 + (gpuOverclock * tempSensitivity) + (prev.gpu * 0.1 * gpuHeatFactor);
        const newTemp = Math.round(Math.max(30, baseTemp + (Math.random() * tempFluctuation - tempFluctuation/2)));

        // --- Achievement Logic ---
        if (newTemp < 50) { tempUnder50Duration.current += 1; } else { tempUnder50Duration.current = 0; }
        if (tempUnder50Duration.current >= 600) { unlockAchievement('ice_man'); }
        if (gpuOverclock > 15) { unlockAchievement('overclocker'); }

        // --- Core Stat Calculation ---
        let isCpuThrottled = false;
        if (newTemp > 90 || prev.capacity < 20) { isCpuThrottled = true; if (!prev.isCpuThrottled) { addLog(t.cpuThrottlingDetail, 'warning'); playSound('emergency'); } }
        
        if (!isOptimized) { rawFps = 30 + Math.random() * 15; } 
        else {
            let targetFpsMode = selectedMode;
            if (selectedMode === FpsMode.AUTO && isAutoTunerActive) {
                if (prev.temp > 80) targetFpsMode = FpsMode.NORMAL;
                else if (prev.capacity > 75) targetFpsMode = 144;
                else if (prev.capacity < 40) targetFpsMode = FpsMode.NORMAL;
                else targetFpsMode = FpsMode.PRO;
            }
            const jitter = (Math.random() * 2 - 1) * 0.5;
            const overclockFpsBoost = (gpuOverclock / 100) * targetFpsMode * 0.2;
            rawFps = targetFpsMode + jitter + overclockFpsBoost + gpuPower; // Apply GPU sim power
        }

        if (isCpuThrottled) { rawFps *= 0.8; }
        const currentMaxFps = selectedBrand !== 'CUSTOM' && deviceProfiles[selectedBrand]?.[selectedModel] 
          ? deviceProfiles[selectedBrand][selectedModel].maxFps 
          : maxFpsLimit;

        if (isOptimized && rawFps > currentMaxFps) { 
          rawFps = currentMaxFps + (Math.random() * 0.2); 
          isFpsLimited = true; 
        }
        
        fpsDisplay = rawFps.toFixed(1);
        
        let baseCpuLoad = prev.cpu === 0 ? 30 + Math.random() * 10 : prev.cpu + (Math.random() * cpuFluctuation - cpuFluctuation/2);
        let targetCpu = Math.round(Math.max(10, Math.min(99, baseCpuLoad * cpuEfficiency)));
        let isCpuLimited = false;
        if (isCpuThrottled) { targetCpu = Math.min(targetCpu, 65); }
        if (isOptimized && targetCpu > maxCpuLimit) { targetCpu = maxCpuLimit; isCpuLimited = true; }
        
        let baseGpuLoad = prev.gpu === 0 ? 40 + Math.random() * 10 : prev.gpu + (Math.random() * gpuFluctuation - gpuFluctuation/2)
        let targetGpu = Math.round(Math.max(10, Math.min(99, baseGpuLoad + (gpuOverclock / 2))));
        let isGpuLimited = false;
        if (isOptimized && targetGpu > maxGpuLimit) { targetGpu = maxGpuLimit; isGpuLimited = true; }
        
        const newRam = Math.round(Math.max(20, Math.min(95, (prev.ram === 0 ? 45 : prev.ram) + (Math.random() * 2 - 1) * ramEfficiency)));
        const newPing = Math.round(Math.max(5, Math.min(100, (prev.ping === 0 ? 20 : prev.ping) + (Math.random() * 4 - 2))));

        if (isAutoTunerActive && newTemp > 80 && selectedMode > FpsMode.NORMAL) {
            sessionDataRef.current.thermalThrottles += 1;
            const oldMode = selectedMode;
            setSelectedMode(FpsMode.NORMAL);
            const detailedLog = t.thermalThrottlingDetail.replace('{temp}', newTemp.toString()).replace('{from}', oldMode.toString()).replace('{to}', FpsMode.NORMAL.toString());
            addLog(detailedLog, 'warning'); playSound('emergency'); setShowThermalAlert(true);
            setTimeout(() => setShowThermalAlert(false), 3000);
        }

        const baseCapacity = 100 - ((rawFps / 240) * 75) - (gpuOverclock * 0.5); 
        const newCapacity = Math.round(Math.max(5, baseCapacity + (Math.random() * 4 - 2)));
        
        if(isOptimized) {
            sessionDataRef.current.frames += 1; sessionDataRef.current.totalFps += rawFps;
            if(newTemp > sessionDataRef.current.maxTemp) sessionDataRef.current.maxTemp = newTemp;
            if(newCapacity < sessionDataRef.current.minCapacity) sessionDataRef.current.minCapacity = newCapacity;
        }
        
        const newStats = { cpu: targetCpu, gpu: targetGpu, ram: newRam, ping: newPing, fps: rawFps, fpsDisplay, capacity: newCapacity, temp: newTemp, isFpsLimited, isCpuLimited, isGpuLimited, isCpuThrottled };
        
        const fpsScore = Math.min(100, (rawFps / 144) * 100);
        const tempScore = 100 - Math.max(0, (newTemp - 40) * 2.5);
        const capacityScore = newCapacity;
        const pingScore = 100 - Math.min(100, newPing * 1.5);
        const overallScore = (fpsScore * 0.4) + (tempScore * 0.3) + (capacityScore * 0.2) + (pingScore * 0.1);
        
        let grade = 'D'; let color = 'text-rose-500';
        if (overallScore > 95) { grade = 'S+'; color = 'text-emerald-400'; }
        else if (overallScore > 85) { grade = 'A'; color = 'text-green-400'; }
        else if (overallScore > 70) { grade = 'B'; color = 'text-cyan-400'; }
        else if (overallScore > 50) { grade = 'C'; color = 'text-amber-400'; }
        setPerformanceScore({ grade, color });

        setPerformanceScoreDetails({
            overall: Math.round(overallScore), grade,
            factors: {
                fps: { score: Math.round(fpsScore), value: fpsDisplay, weight: 40 },
                temp: { score: Math.round(tempScore), value: newTemp, weight: 30 },
                capacity: { score: Math.round(capacityScore), value: newCapacity, weight: 20 },
                ping: { score: Math.round(pingScore), value: newPing, weight: 10 },
            }
        });

        setHistory(h => [...h.slice(-59), { time: new Date().toLocaleTimeString(), fps: Number(rawFps.toFixed(1)), cpu: targetCpu, temp: newTemp }].slice(-60));
        return newStats;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [systemActive, selectedMode, isOptimized, isAutoTunerActive, t, playSound, maxFpsLimit, maxCpuLimit, maxGpuLimit, gpuOverclock, realLoad, advThermal, cooler, cpuSim, gpuSim, ramSim, unlockAchievement, addLog, selectedBrand, selectedModel]);

  const handleApplyPatch = useCallback(async (version: string) => {
    playSound('click');
    if (isPatching) return;
    if (appliedVersion === version) {
        addLog(t.patchAlreadyActive.replace('{version}', version), 'warning');
        return;
    }

    setIsPatching(true);
    setSelectedVersion(version);
    addLog(t.patchInitiated.replace('{version}', version), 'pending');

    await new Promise(r => setTimeout(r, 1000));
    addLog(t.patchAnalyze.replace('{version}', version), 'pending');

    await new Promise(r => setTimeout(r, 1500));
    addLog(t.patchApplyFixes.replace('{version}', version), 'pending');

    await new Promise(r => setTimeout(r, 1000));
    setAppliedVersion(version);
    setIsPatching(false);
    playSound('success');
    addLog(t.patchSuccess.replace('{version}', version), 'success');
  }, [isPatching, appliedVersion, playSound, addLog, t]);

  const handleBoost = useCallback(async () => {
    playSound('click');
    if (isOptimized) {
        setIsOptimized(false); addLog(t.boostStop, 'pending');
        const endTime = Date.now();
        const durationSeconds = Math.round((endTime - sessionDataRef.current.startTime) / 1000);
        const minutes = Math.floor(durationSeconds / 60); const seconds = durationSeconds % 60;
        setSessionReport({ duration: `${minutes}m ${seconds}s`, avgFps: sessionDataRef.current.frames > 0 ? parseFloat((sessionDataRef.current.totalFps / sessionDataRef.current.frames).toFixed(1)) : 0, maxTemp: sessionDataRef.current.maxTemp, minCapacity: sessionDataRef.current.minCapacity, thermalThrottles: sessionDataRef.current.thermalThrottles });
        return;
    }
    
    if (!systemActive) {
        setSystemActive(true);
    }

    unlockAchievement('first_boost');
    setIsBoosting(true); playSound('boost'); addLog(t.boostStart, 'pending');
    sessionDataRef.current = { startTime: Date.now(), frames: 0, totalFps: 0, maxTemp: stats.temp, minCapacity: stats.capacity, thermalThrottles: 0 };
    
    await new Promise(r => setTimeout(r, 500));
    addLog(t.versionSpecificPatches.replace('{version}', appliedVersion));

    for (const step of t.steps) { await new Promise(r => setTimeout(r, 600)); playSound('boost'); addLog(step); }
    if (selectedMode > 125) { playSound('warning'); addLog(t.highFpsWarning, 'warning'); }
    playSound('success'); 
    const modeLabel = selectedMode === FpsMode.AUTO ? t.autoMode : selectedMode.toString();
    addLog(t.boostSuccess.replace('{mode}', modeLabel), 'success');
    setIsBoosting(false); setIsOptimized(true);
  }, [selectedMode, appliedVersion, t, isOptimized, playSound, stats.temp, stats.capacity, unlockAchievement, systemActive, addLog]);

  const handleCleanRam = useCallback(async (isDeep: boolean) => {
    if (isCleaning || isDeepCleaning) return;
    playSound('click');
    const cleaningStateSetter = isDeep ? setIsDeepCleaning : setIsCleaning;
    const logStart = isDeep ? t.deepCleanStart : t.ramCleanStart;
    const logSuccess = isDeep ? t.deepCleanSuccess : t.ramCleanSuccess;
    
    cleaningStateSetter(true); playSound('flush'); addLog(logStart, 'pending');
    setRamCleanEffect(true);
    setTimeout(() => setRamCleanEffect(false), 700);

    setStats(prev => ({ ...prev, ram: Math.max(15, prev.ram - (isDeep ? 35 : 20)) }));
    
    if (isDeep) {
        for (const step of t.deepCleanSteps) { await new Promise(r => setTimeout(r, 700)); addLog(step); }
    } else {
        await new Promise(r => setTimeout(r, 1500));
    }

    const released = Math.floor(Math.random() * (isDeep ? 1200 : 800)) + (isDeep ? 400 : 200);
    playSound('success'); addLog(logSuccess.replace('{amount}', released.toString()), 'success');
    cleaningStateSetter(false);
  }, [t, isCleaning, isDeepCleaning, playSound, addLog]);
  
  const handleNetworkOptimize = useCallback(async () => {
    if (isOptimizingNetwork) return;
    playSound('click'); setIsOptimizingNetwork(true); playSound('flush'); addLog(t.networkCleanStart, 'pending');
    for (const step of t.networkLogSteps) { await new Promise(r => setTimeout(r, 600)); addLog(step, 'pending'); }
    await new Promise(r => setTimeout(r, 1000));
    const reduced = Math.floor(Math.random() * 10) + 5;
    setStats(prev => ({ ...prev, ping: Math.max(5, prev.ping - reduced) }));
    playSound('success'); addLog(t.networkCleanSuccess.replace('{amount}', reduced.toString()), 'success');
    setIsOptimizingNetwork(false);
  }, [t, isOptimizingNetwork, playSound, addLog]);

  const saveProfile = () => {
    if (!newProfileName) return;
    playSound('click');
    if (profiles.length + 1 >= 3) { unlockAchievement('profiler'); }
    const newProfile: Profile = { name: newProfileName, settings: { selectedMode, maxFpsLimit, maxCpuLimit, maxGpuLimit, gpuOverclock, cpuSim, gpuSim, ramSim, advThermal, realLoad } };
    setProfiles([...profiles, newProfile]);
    addLog(t.profileSaved.replace('{name}', newProfileName), 'success');
    setNewProfileName("");
  };

  const loadProfile = (profileName: string) => {
    playSound('click');
    const profile = profiles.find(p => p.name === profileName);
    if (profile) {
        setSelectedMode(profile.settings.selectedMode); setMaxFpsLimit(profile.settings.maxFpsLimit); setMaxCpuLimit(profile.settings.maxCpuLimit);
        setMaxGpuLimit(profile.settings.maxGpuLimit); setGpuOverclock(profile.settings.gpuOverclock); setCpuSim(profile.settings.cpuSim);
        setGpuSim(profile.settings.gpuSim); setRamSim(profile.settings.ramSim); setAdvThermal(profile.settings.advThermal); setRealLoad(profile.settings.realLoad);
        addLog(t.profileLoaded.replace('{name}', profileName), 'success');
    }
  };

  const deleteProfile = (profileName: string) => { playSound('click'); setProfiles(profiles.filter(p => p.name !== profileName)); };
  const toggleAutoTuner = () => { playSound('click'); setIsAutoTunerActive(!isAutoTunerActive); addLog(`Auto-Tuner: ${!isAutoTunerActive ? 'ENABLED' : 'DISABLED'}`, 'pending'); };
  const toggleLang = () => { playSound('click'); setLang(prev => prev === 'tr' ? 'en' : 'tr'); };

  const fpsModeOptions = [FpsMode.AUTO, FpsMode.NORMAL, FpsMode.PRO, FpsMode.EXTREME, FpsMode.ULTRA];
  const gameVersionOptions = ['GLOBAL', 'KR', 'IND', 'VNM'];
  const cpuSimOptions = ['Default', 'Performance', 'High-End'];
  const gpuSimOptions = ['Standard', 'Advanced', 'Desktop Class'];
  const ramSimOptions = ['Standard', 'Performance', 'Gaming'];
  const powerPlanOptions = ['Saver', 'Balanced', 'Performance'];
  const coolerOptions = ['Stock', 'Liquid', 'Thermoelectric'];

  const isHighTemp = stats.temp > 80;
  const isDevicePresetActive = selectedBrand !== 'CUSTOM';

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} t={t} theme={theme} />;
  }
  
  return (
    <div className={`min-h-screen p-4 flex flex-col items-center justify-start gap-4 max-w-md mx-auto relative overflow-hidden`}>
      {showTutorial && <Tutorial t={t} onClose={handleCloseTutorial} activeTheme={theme} />}
      <Snowfall />
      {ramCleanEffect && <div className="ram-clean-effect-container"><div className="ram-clean-effect"></div></div>}
      <AchievementToast queue={unlockedQueue} onDone={() => setUnlockedQueue(q => q.slice(1))} t={t} />
      {renderScoreDetails && <PerformanceScoreDetails isOpen={isScoreDetailsOpen} details={performanceScoreDetails} onClose={closeScoreDetails} theme={theme} t={t} />}

      {sessionReport && ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm"> <div className="glass-panel p-6 rounded-2xl w-full max-w-sm border-slate-700 animate-in zoom-in-95"> <div className="flex justify-between items-center mb-4"> <h2 className="font-orbitron text-lg font-bold text-white">{t.sessionReportTitle}</h2> <button onClick={() => setSessionReport(null)} className="p-1 rounded-full hover:bg-slate-700"><X className="w-5 h-5 text-slate-400" /></button> </div> <div className="space-y-3 text-sm"> <div className="flex justify-between items-center"><span className="text-slate-400">{t.sessionDuration}</span><span className="font-bold text-white">{sessionReport.duration}</span></div> <div className="flex justify-between items-center"><span className="text-slate-400">{t.avgFps}</span><span className="font-bold text-white">{sessionReport.avgFps}</span></div> <div className="flex justify-between items-center"><span className="text-slate-400">{t.maxTemp}</span><span className="font-bold text-white">{sessionReport.maxTemp}°C</span></div> <div className="flex justify-between items-center"><span className="text-slate-400">{t.minCapacity}</span><span className="font-bold text-white">%{sessionReport.minCapacity}</span></div> <div className="flex justify-between items-center"><span className="text-slate-400">{t.thermalEvents}</span><span className="font-bold text-rose-500">{sessionReport.thermalThrottles}</span></div> </div> <button onClick={() => setSessionReport(null)} className={`w-full mt-6 py-2 rounded-lg font-orbitron text-sm ${themes[theme].bg} ${themes[theme].hoverBg} text-slate-900 font-bold`}>{t.closeBtn}</button> </div> </div> )}

      <header className={`w-full flex flex-col items-center justify-between gap-4 glass-panel p-4 rounded-2xl ${isHighTemp ? 'animate-border-pulse' : ''}`}>
        <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`${themes[theme].bg}/20 p-2 rounded-lg border ${themes[theme].border}`}> <Zap className={`w-6 h-6 ${themes[theme].text}`} /> </div>
              <div> <h1 className="text-xl uppercase font-orbitron font-bold tracking-tighter text-white">90-240 Fps Tool</h1> <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400">{t.subtitle}</p> </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative" ref={themeSelectorRef}>
                    <button onClick={() => setIsThemeSelectorOpen(o => !o)} className="p-2 bg-slate-800/80 rounded-lg border border-slate-600 transition-colors">
                        <Palette className={`w-5 h-5 ${themes[theme].text}`} />
                    </button>
                    {isThemeSelectorOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 glass-panel p-2 rounded-lg border border-slate-600 z-50 animate-in fade-in zoom-in-95">
                            <h4 className="text-xs font-orbitron text-slate-400 px-2 pb-2">{t.themeSelectorTitle}</h4>
                            <div className="flex flex-col gap-1">
                                {(Object.keys(themes) as Theme[]).map(themeKey => (
                                    <button
                                        key={themeKey}
                                        onClick={() => { setTheme(themeKey); setIsThemeSelectorOpen(false); }}
                                        className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center gap-2 hover:bg-slate-700/50 ${theme === themeKey ? 'bg-slate-700 font-bold' : ''}`}
                                    >
                                        <div className={`w-3 h-3 rounded-full ${themes[themeKey].bg}`} />
                                        <span className="capitalize">{themeKey}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={toggleLang} className="p-2 bg-slate-800/80 rounded-lg border border-slate-600 transition-colors"><Languages className={`w-5 h-5 ${themes[theme].text}`} /></button> 
                <button onClick={() => { playSound('click'); setIsMuted(!isMuted); }} className="p-2 bg-slate-800/80 rounded-lg border border-slate-600 transition-colors">{isMuted ? <VolumeX className={`w-5 h-5 ${themes[theme].text}`} /> : <Volume2 className={`w-5 h-5 ${themes[theme].text}`} />}</button> 
            </div>
        </div>
        <button onClick={openScoreDetails} className="w-full flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700 hover:bg-slate-800/50 transition-colors">
            <span className="text-[10px] uppercase font-orbitron tracking-widest text-slate-400">{t.performanceScoreTitle}</span>
            <div className="relative">
                <span className={`text-2xl font-orbitron font-bold ${performanceScore.color}`}>{performanceScore.grade}</span>
                <MousePointer2 className="w-4 h-4 text-white/70 absolute -right-3 -bottom-1 animate-hand-tap" />
            </div>
        </button>
      </header>
      
      <div className="grid grid-cols-3 gap-2 w-full">
         <StatCard label="FPS" value={stats.fpsDisplay} icon={<Activity className="text-emerald-400" />} color="emerald" unit="" progress={stats.fps} maxProgress={240} limited={stats.isFpsLimited} limitText={t.limitHit} />
         <StatCard label="CPU" value={stats.cpu} icon={<Cpu className={isHighTemp ? 'text-rose-500' : themes[theme].text} />} color={isHighTemp ? 'rose' : theme === 'crimson' ? 'rose' : 'cyan'} unit="%" progress={stats.cpu} maxProgress={100} limited={stats.isCpuLimited || stats.isCpuThrottled} limitText={stats.isCpuThrottled ? t.cpuThrottling : t.limitHit} />
         <StatCard label="GPU" value={stats.gpu} icon={<GpuIcon className="text-purple-400" />} color="purple" unit="%" progress={stats.gpu} maxProgress={100} limited={stats.isGpuLimited || gpuOverclock > 0} limitText={gpuOverclock > 0 ? t.gpuOverclockStatus : (stats.isGpuLimited ? t.limitHit : undefined)} isOverclocked={gpuOverclock > 0} />
         <StatCard label="RAM" value={stats.ram} icon={<HardDrive className="text-amber-400" />} color="amber" unit="%" progress={stats.ram} maxProgress={100} />
         <StatCard label="TEMP" value={stats.temp} icon={<Thermometer className={stats.temp > 75 ? 'text-rose-500' : themes[theme].text} />} color={stats.temp > 75 ? 'rose' : theme === 'crimson' ? 'rose' : 'cyan'} unit="°C" progress={stats.temp} maxProgress={100} />
         <StatCard label="PING" value={stats.ping} icon={<Wifi className={stats.ping > 80 ? 'text-rose-500' : themes[theme].text} />} color={stats.ping > 80 ? 'rose' : theme === 'crimson' ? 'rose' : 'cyan'} unit="ms" progress={stats.ping} maxProgress={150} />
      </div>
      
      <div className="w-full flex flex-col items-center gap-4">
          <div className={`glass-panel p-4 rounded-2xl w-full`}>
            <DeviceSelector 
              selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
              selectedModel={selectedModel} setSelectedModel={setSelectedModel}
              t={t} theme={theme}
            />
          </div>

          <div className="grid grid-cols-5 gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-700 w-full">
            {fpsModeOptions.map(mode => ( <button key={mode} onClick={() => { playSound('click'); setSelectedMode(mode); }} disabled={isDevicePresetActive} className={`w-full py-2 rounded-full font-orbitron text-[10px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${ selectedMode === mode ? `${themes[theme].bg} text-slate-900 ${themes[theme].shadow}` : 'text-slate-400 hover:text-white' }`} > {mode === FpsMode.AUTO ? t.autoMode : `${mode} FPS`} </button> ))}
          </div>
          <div className="w-full glass-panel p-4 rounded-2xl">
            <h3 className="font-orbitron text-xs flex items-center justify-center gap-2 uppercase tracking-wider mb-3 text-slate-400">
                <Globe className="w-4 h-4" /> 
                {t.gameVersion}
                {isPatching && <RefreshCcw className="w-4 h-4 animate-spin" />}
            </h3>
            <div className="grid grid-cols-4 gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-700 w-full">
              {gameVersionOptions.map(version => ( 
                <button 
                    key={version} 
                    onClick={() => handleApplyPatch(version)} 
                    disabled={isPatching}
                    className={`w-full py-2 rounded-full font-orbitron text-[10px] transition-all duration-300 flex items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-50 ${ selectedVersion === version ? `${themes[theme].bg} text-slate-900 ${themes[theme].shadow}` : 'text-slate-400 hover:text-white' }`}
                >
                    {version}
                    {appliedVersion === version && <ShieldCheck className="w-3 h-3" />}
                </button> 
              ))}
            </div>
          </div>
      </div>
      
      <div className={`w-full flex items-center justify-between glass-panel p-4 rounded-2xl ${isHighTemp ? 'animate-border-pulse' : ''}`}>
          <div className="flex items-center gap-3"> <ShieldAlert className={`w-5 h-5 ${themes[theme].text}`} /> <span className="font-orbitron text-sm text-slate-300">{t.autoTunerLabel}</span> </div>
          <button onClick={toggleAutoTuner} className="flex items-center gap-2 cursor-pointer"> <span className={`text-sm font-bold font-orbitron ${isAutoTunerActive ? themes[theme].text : 'text-slate-500'}`}>{isAutoTunerActive ? t.active : t.passive}</span> {isAutoTunerActive ? <ToggleRight className={`w-8 h-8 ${themes[theme].text}`} /> : <ToggleLeft className="w-8 h-8 text-slate-500" />} </button>
      </div>
      
      <main className="w-full flex flex-col items-center gap-4">
        <button disabled={isBoosting} onClick={handleBoost} className={`relative group w-full py-6 rounded-2xl font-orbitron font-bold text-lg overflow-hidden transition-all duration-500 border border-transparent ${ isBoosting ? 'bg-slate-800 cursor-not-allowed' : isOptimized ? `${themes.crimson.bg} ${themes.crimson.hoverBg}` : `${themes[theme].bg} ${themes[theme].hoverBg}` } ${ isOptimized ? `${themes.crimson.shadow}` : `${themes[theme].shadow}` }`}>
          <div className={`relative z-10 flex flex-col items-center justify-center gap-1.5 ${isBoosting || isOptimized ? 'text-white' : 'text-slate-900'}`}>
            {isBoosting ? <><RefreshCcw className="w-6 h-6 animate-spin" /><span>{t.optimizing}</span></> : isOptimized ? <><ShieldCheck className="w-6 h-6" /><span>{t.stopBoost}</span></> : <><PulseIcon className="w-6 h-6" /><span>{t.boostBtn}</span></> }
          </div>
        </button>
        
        <div className="grid grid-cols-3 gap-2 w-full">
            <button disabled={isCleaning || isDeepCleaning} onClick={() => handleCleanRam(false)} className={`flex flex-col items-center justify-center gap-1.5 glass-panel p-3 rounded-xl border border-amber-500/30 text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed`}> {isCleaning ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4"/>} <span className="font-orbitron text-[10px] uppercase">{isCleaning ? t.cleaning : t.cleanRam}</span> </button>
            <button disabled={isCleaning || isDeepCleaning} onClick={() => handleCleanRam(true)} className={`flex flex-col items-center justify-center gap-1.5 glass-panel p-3 rounded-xl border border-orange-500/30 text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed`}> {isDeepCleaning ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4"/>} <span className="font-orbitron text-[10px] uppercase">{isDeepCleaning ? t.deepCleaning : t.deepCleanBtn}</span> </button>
            <button disabled={isOptimizingNetwork} onClick={handleNetworkOptimize} className={`flex flex-col items-center justify-center gap-1.5 glass-panel p-3 rounded-xl border border-sky-500/30 text-sky-400 disabled:opacity-50 disabled:cursor-not-allowed`}> {isOptimizingNetwork ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Wifi className="w-4 h-4"/>} <span className="font-orbitron text-[10px] uppercase">{isOptimizingNetwork ? t.optimizingNetwork : t.networkOptimizeBtn}</span> </button>
        </div>

        <div className={`glass-panel p-4 rounded-2xl w-full ${isHighTemp ? 'animate-border-pulse' : ''}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-orbitron text-xs flex items-center gap-2 uppercase tracking-wider"><LineChart className={`w-4 h-4 ${themes[theme].text}`} /> {t.fpsChart}</h3>
                <div className="flex items-center gap-2">
                    <button onClick={() => setVisibleLines(v => ({...v, fps: !v.fps}))} className={`px-2 py-1 text-[9px] rounded-full flex items-center gap-1 ${visibleLines.fps ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}><Activity className="w-3 h-3" /> FPS</button>
                    <button onClick={() => setVisibleLines(v => ({...v, cpu: !v.cpu}))} className={`px-2 py-1 text-[9px] rounded-full flex items-center gap-1 ${visibleLines.cpu ? `${themes[theme].bg}/20 ${themes[theme].text}` : 'bg-slate-800 text-slate-400'}`}><Cpu className="w-3 h-3" /> CPU</button>
                    <button onClick={() => setVisibleLines(v => ({...v, temp: !v.temp}))} className={`px-2 py-1 text-[9px] rounded-full flex items-center gap-1 ${visibleLines.temp ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-800 text-slate-400'}`}><Thermometer className="w-3 h-3" /> TEMP</button>
                </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={history}>
                    <defs>
                        <linearGradient id="colorFps" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={themes[theme].stopColor} stopOpacity={0.3}/><stop offset="95%" stopColor={themes[theme].stopColor} stopOpacity={0}/></linearGradient>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                    </defs>
                    <Tooltip content={<CustomTooltip activeTheme={theme} />} />
                    {visibleLines.fps && <Area type="monotone" dataKey="fps" name="FPS" stroke="#10b981" strokeWidth={2} fill="url(#colorFps)" />}
                    {visibleLines.cpu && <Area type="monotone" dataKey="cpu" name="CPU" stroke={themes[theme].stopColor} strokeWidth={2} fill="url(#colorCpu)" />}
                    {visibleLines.temp && <Area type="monotone" dataKey="temp" name="TEMP" stroke="#f43f5e" strokeWidth={2} fill="url(#colorTemp)" />}
                 </AreaChart>
              </ResponsiveContainer>
            </div>
        </div>
        
        <div className={`glass-panel p-5 rounded-2xl w-full ${isHighTemp ? 'animate-border-pulse' : ''}`}> <h3 className={`text-[10px] font-orbitron ${themes[theme].text} flex items-center gap-2 uppercase tracking-[0.2em] mb-4`}><Bolt className="w-3 h-3" />{t.powerPlanTitle}</h3> <div className="grid grid-cols-3 gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-700 w-full"> {powerPlanOptions.map(plan => ( <button key={plan} onClick={() => setPowerPlan(plan)} className={`w-full py-1.5 rounded-full font-orbitron text-[9px] transition-all duration-300 ${powerPlan === plan ? `${themes[theme].bg} text-slate-900 ${themes[theme].shadow}` : 'text-slate-400 hover:text-white'}`}> {t.powerPlanOptions[plan as keyof typeof t.powerPlanOptions]} </button> ))} </div> </div>
        <div className={`glass-panel p-5 rounded-2xl w-full ${isHighTemp ? 'animate-border-pulse' : ''}`}> <h3 className={`text-[10px] font-orbitron ${themes[theme].text} flex items-center gap-2 uppercase tracking-[0.2em] mb-4`}><Wind className="w-3 h-3" />{t.coolerTitle}</h3> <div className="grid grid-cols-3 gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-700 w-full"> {coolerOptions.map(opt => ( <button key={opt} onClick={() => setCooler(opt)} className={`w-full py-1.5 rounded-full font-orbitron text-[9px] transition-all duration-300 ${cooler === opt ? `${themes[theme].bg} text-slate-900 ${themes[theme].shadow}` : 'text-slate-400 hover:text-white'}`}> {t.coolerOptions[opt as keyof typeof t.coolerOptions]} </button>))} </div> </div>

        <div className={`glass-panel p-5 rounded-2xl w-full ${isHighTemp ? 'animate-border-pulse' : ''}`}>
             <h3 className={`text-[10px] font-orbitron ${themes[theme].text} flex items-center gap-2 uppercase tracking-[0.2em] mb-4`}><Lock className="w-3 h-3" />{t.limitTitle}</h3>
             <div className="space-y-4">
                <LimitSlider label={t.maxFpsLimit} value={maxFpsLimit} onChange={setMaxFpsLimit} min={30} max={240} unit="FPS" theme={theme} disabled={isDevicePresetActive}/>
                <LimitSlider label={t.maxCpuLimit} value={maxCpuLimit} onChange={setMaxCpuLimit} min={50} max={100} unit="%" theme={theme} />
                <LimitSlider label={t.maxGpuLimit} value={maxGpuLimit} onChange={setMaxGpuLimit} min={50} max={100} unit="%" theme={theme} />
                <LimitSlider label={t.gpuOverclock} value={gpuOverclock} onChange={setGpuOverclock} min={0} max={20} unit="%" theme={theme} warning={gpuOverclock > 0 ? t.gpuOverclockWarning : undefined} />
             </div>
        </div>

        <div className={`glass-panel p-5 rounded-2xl w-full ${isHighTemp ? 'animate-border-pulse' : ''}`}>
             <h3 className={`text-[10px] font-orbitron ${themes[theme].text} flex items-center gap-2 uppercase tracking-[0.2em] mb-4`}><Sliders className="w-3 h-3" />{t.simulationTitle}</h3>
             <div className="space-y-4">
                <SimulationSegmentedControl label={t.cpuSimLabel} value={cpuSim} onChange={setCpuSim} options={cpuSimOptions.map(o => ({ value: o, label: t.cpuOptions[o as keyof typeof t.cpuOptions] || o }))} theme={theme} />
                <SimulationSegmentedControl label={t.gpuSimLabel} value={gpuSim} onChange={setGpuSim} options={gpuSimOptions.map(o => ({ value: o, label: t.gpuOptions[o as keyof typeof t.gpuOptions] || o }))} theme={theme} />
                <SimulationSegmentedControl label={t.ramSimLabel} value={ramSim} onChange={setRamSim} options={ramSimOptions.map(o => ({ value: o, label: t.ramOptions[o as keyof typeof t.ramOptions] || o }))} theme={theme} />
                <SimulationToggle label={t.thermalModelLabel} enabled={advThermal} onToggle={() => setAdvThermal(!advThermal)} theme={theme} />
                <SimulationToggle label={t.realisticLoadLabel} enabled={realLoad} onToggle={() => setRealLoad(!realLoad)} theme={theme} />
             </div>
        </div>
        
        <div className={`glass-panel p-5 rounded-2xl w-full ${isHighTemp ? 'animate-border-pulse' : ''}`}>
            <h3 className={`text-[10px] font-orbitron ${themes[theme].text} flex items-center gap-2 uppercase tracking-[0.2em] mb-4`}><Award className="w-3 h-3" />{t.achievementTitle}</h3>
            <div className="grid grid-cols-2 gap-3">
                {Object.keys(t.achievements).map(key => (
                    <AchievementItem key={key} id={key} t={t} unlocked={achievements.has(key)} />
                ))}
            </div>
        </div>

        <div className={`glass-panel p-5 rounded-2xl w-full ${isHighTemp ? 'animate-border-pulse' : ''}`}>
             <h3 className={`text-[10px] font-orbitron ${themes[theme].text} flex items-center gap-2 uppercase tracking-[0.2em] mb-4`}><FilePlus2 className="w-3 h-3" />{t.profileManagerTitle}</h3>
             <div className="flex gap-2 mb-2">
                 <input type="text" value={newProfileName} onChange={e => setNewProfileName(e.target.value)} placeholder={t.profileNamePlaceholder} className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-1.5 text-xs focus:ring-1 focus:ring-cyan-500 outline-none" />
                 <button onClick={saveProfile} className={`px-3 rounded-md font-bold text-xs ${themes[theme].bg} text-slate-900`}><FileDown className="w-4 h-4"/></button>
             </div>
             <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                 {profiles.map(p => (
                     <div key={p.name} className="flex justify-between items-center bg-slate-800/50 p-2 rounded-md">
                         <span className="text-xs font-medium">{p.name}</span>
                         <div className="flex gap-1.5">
                             <button onClick={() => loadProfile(p.name)} className="p-1.5 bg-slate-700 rounded"><FileUp className="w-3 h-3 text-emerald-400"/></button>
                             <button onClick={() => deleteProfile(p.name)} className="p-1.5 bg-slate-700 rounded"><Trash2 className="w-3 h-3 text-rose-500"/></button>
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        <div className={`glass-panel p-5 rounded-2xl flex-1 w-full max-h-[300px] overflow-hidden flex flex-col border-slate-700/50 ${isHighTemp ? 'animate-border-pulse' : ''}`}>
            <h3 className="text-[10px] font-orbitron text-slate-500 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]"><Terminal className="w-3 h-3" />{t.logTitle}</h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {logs.length === 0 ? <p className="text-xs text-slate-600 font-mono italic">{t.logEmpty}</p> : logs.map(log => (<div key={log.id} className="font-mono text-[11px] flex items-start gap-2 animate-in fade-in slide-in-from-left-2"> <span className="text-slate-600">[{log.timestamp}]</span> <span className={ log.status === 'success' ? 'text-emerald-400' : log.status === 'pending' ? themes[theme].text : 'text-rose-400' }> {log.status === 'success' ? '✓' : log.status === 'pending' ? '→' : '!'} {log.message} </span> </div>)) }
            </div>
          </div>
      </main>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label, activeTheme }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-lg border-slate-600">
        <p className="text-xs text-slate-400 mb-2 font-orbitron">{`Time: ${payload[0].payload.time}`}</p>
        <div className="space-y-1">
          {payload.map((pld: any) => (
            <div key={pld.dataKey} className="flex items-center gap-2 text-xs">
              {pld.dataKey === 'fps' && <Activity className="w-3 h-3 text-emerald-400" />}
              {pld.dataKey === 'cpu' && <Cpu className={`w-3 h-3 ${themes[activeTheme].text}`} />}
              {pld.dataKey === 'temp' && <Thermometer className="w-3 h-3 text-rose-500" />}
              <span className="font-medium text-slate-300">{pld.name}:</span>
              <span className="font-bold" style={{ color: pld.color }}>
                {pld.value}{pld.dataKey === 'cpu' ? '%' : pld.dataKey === 'temp' ? '°C' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const ScoreFactorCircle: React.FC<{ label: string; score: number; value: string | number; unit: string; weight: number; theme: Theme; color: string; }> = ({ label, score, value, unit, weight, theme, color }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  let strokeColor = themes[theme].text;
  if (color === 'emerald') strokeColor = 'text-emerald-400';
  if (color === 'rose') strokeColor = 'text-rose-500';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} strokeWidth="6" className="text-slate-700/50" stroke="currentColor" fill="transparent" />
          <circle cx="50" cy="50" r={radius} strokeWidth="6" className={strokeColor} stroke="currentColor" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.5s' }} />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-orbitron font-bold text-white">{value}</span>
          <span className="text-xs text-slate-400 -mt-1">{unit}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-bold font-orbitron">{label}</p>
        <p className="text-[10px] text-slate-500 uppercase">{translations['en'].scoreWeighting}: {weight}%</p>
      </div>
    </div>
  );
};

const PerformanceScoreDetails: React.FC<{ isOpen: boolean; details: any; onClose: () => void; theme: Theme; t: any; }> = ({ isOpen, details, onClose, theme, t }) => {
  const getScoreColor = (score: number) => {
    if (score > 85) return 'emerald';
    if (score > 60) return 'cyan';
    if (score > 40) return 'amber';
    return 'rose';
  };
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}/>
      <div className={`glass-panel p-6 rounded-2xl w-full max-w-sm border-slate-700 transition-all duration-300 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-orbitron text-lg font-bold text-white">{t.performanceScoreBreakdown}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700"><X className="w-5 h-5 text-slate-400" /></button>
        </div>
        <div className="flex flex-col items-center mb-6">
          <span className={`text-6xl font-orbitron font-bold ${themes[getScoreColor(details.overall) as Theme].text}`}>{details.grade}</span>
          <span className="text-sm text-slate-400 font-orbitron">{t.overallScore}: {details.overall}/100</span>
        </div>
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <ScoreFactorCircle label={t.fpsFactor} score={details.factors.fps.score} value={details.factors.fps.value} unit="" weight={details.factors.fps.weight} theme={theme} color="emerald" />
          <ScoreFactorCircle label={t.tempFactor} score={details.factors.temp.score} value={details.factors.temp.value} unit="°C" weight={details.factors.temp.weight} theme={theme} color={getScoreColor(details.factors.temp.score)} />
          <ScoreFactorCircle label={t.stabilityFactor} score={details.factors.capacity.score} value={details.factors.capacity.value} unit="%" weight={details.factors.capacity.weight} theme={theme} color={getScoreColor(details.factors.capacity.score)} />
          <ScoreFactorCircle label={t.pingFactor} score={details.factors.ping.score} value={details.factors.ping.value} unit="ms" weight={details.factors.ping.weight} theme={theme} color={getScoreColor(details.factors.ping.score)} />
        </div>
      </div>
    </div>
  );
};

interface SimulationSegmentedControlProps { label: string; value: string; onChange: (val: string) => void; options: { value: string; label: string; }[]; theme: Theme; }
const SimulationSegmentedControl: React.FC<SimulationSegmentedControlProps> = ({ label, value, onChange, options, theme }) => (
    <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-400">{label}</span>
        <div className="grid grid-cols-3 gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-700 w-full">
            {options.map(opt => ( <button key={opt.value} onClick={() => onChange(opt.value)} className={`w-full py-1.5 rounded-full font-orbitron text-[9px] transition-all duration-300 ${value === opt.value ? `${themes[theme].bg} text-slate-900 ${themes[theme].shadow}` : 'text-slate-400 hover:text-white'}`}> {opt.label} </button> ))}
        </div>
    </div>
);

interface SimulationToggleProps { label: string; enabled: boolean; onToggle: () => void; theme: Theme; }
const SimulationToggle: React.FC<SimulationToggleProps> = ({ label, enabled, onToggle, theme }) => (
    <div className="flex justify-between items-center text-xs">
        <span className="text-slate-400">{label}</span>
        <button onClick={onToggle} className="flex items-center gap-2 cursor-pointer">
            <span className={`text-xs font-bold font-orbitron ${enabled ? themes[theme].text : 'text-slate-500'}`}>{enabled ? translations['en'].active : translations['en'].passive}</span>
            {enabled ? <ToggleRight className={`w-7 h-7 ${themes[theme].text}`} /> : <ToggleLeft className="w-7 h-7 text-slate-500" />}
        </button>
    </div>
);

interface LimitSliderProps { label: string; value: number; onChange: (val: number) => void; min: number; max: number; unit: string; warning?: string; theme: Theme; disabled?: boolean; }
const LimitSlider: React.FC<LimitSliderProps> = ({ label, value, onChange, min, max, unit, warning, theme, disabled }) => (
  <div className={`flex flex-col gap-1.5 transition-opacity ${disabled ? 'opacity-50' : ''}`}>
    <div className="flex justify-between items-center px-1">
      <span className="text-[9px] font-orbitron text-slate-500 uppercase flex items-center gap-1.5">{label} {disabled && <Lock className="w-2.5 h-2.5" />}</span>
      <span className={`text-[10px] font-orbitron ${themes[theme].text} font-bold`}>{value}{unit}</span>
    </div>
    <input type="range" min={min} max={max} step={1} value={value} onChange={(e) => onChange(parseInt(e.target.value))} disabled={disabled} className={`w-full h-1 bg-slate-800 rounded-lg appearance-none ${themes[theme].accent} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} />
    {warning && <div className="flex items-center gap-1.5 text-rose-500/90 px-1 -mt-1"><AlertTriangle className="w-3 h-3" /><p className="text-[9px] font-medium">{warning}</p></div>}
  </div>
);


interface StatCardProps { label: string; value: string | number; unit: string; icon: React.ReactNode; color: 'cyan' | 'purple' | 'emerald' | 'rose' | 'amber'; progress: number; maxProgress: number; limited?: boolean; limitText?: string; isOverclocked?: boolean; }
const StatCard: React.FC<StatCardProps> = ({ label, value, unit, icon, color, progress, maxProgress, limited, limitText, isOverclocked }) => {
  const colorClasses: Record<string, string> = { cyan: "border-cyan-500/20 text-cyan-400", purple: "border-purple-500/20 text-purple-400", emerald: "border-emerald-500/20 text-emerald-400", rose: "border-rose-500/20 text-rose-500", amber: "border-amber-500/20 text-amber-400" };
  return (
    <div className={`glass-panel p-2.5 rounded-xl border flex flex-col gap-1.5 transition-all duration-300 relative overflow-hidden ${colorClasses[color]} ${limited ? 'border-amber-500/50' : ''} ${isOverclocked ? 'border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.4)] animate-pulse-slow' : ''}`}>
      <div className="flex items-center justify-between opacity-80"> <span className="text-[9px] font-orbitron tracking-widest text-slate-400">{label}</span> <div className="flex items-center gap-1.5">{isOverclocked && <Flame className="w-3 h-3 text-orange-400 animate-pulse" />} {icon}</div> </div>
      <div className="flex items-baseline gap-1"> <span className="text-lg font-orbitron font-bold text-white tracking-tight">{value}</span> <span className="text-[9px] text-slate-500 font-bold">{unit}</span> </div>
      {limited && <div className="absolute bottom-1 right-1 text-[7px] font-orbitron text-amber-500 bg-amber-500/10 px-1 py-0.5 rounded">{limitText}</div>}
    </div>
  );
};

const AchievementToast: React.FC<{ queue: string[], onDone: () => void, t: any }> = ({ queue, onDone, t }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (queue.length > 0 && !visible) {
            setVisible(true);
            setTimeout(() => { setVisible(false); setTimeout(onDone, 500); }, 3000);
        }
    }, [queue, visible, onDone]);
    if (!visible || !queue[0]) return null;
    const achievement = t.achievements[queue[0]];
    return (
        <div className="fixed bottom-4 right-4 z-[100] glass-panel p-4 rounded-xl w-64 border-amber-400/50 animate-in slide-in-from-right">
            <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-400"/>
                <div>
                    <h4 className="font-orbitron text-sm text-amber-400 font-bold">{t.achievementUnlocked}</h4>
                    <p className="text-xs text-slate-300">{achievement.name}</p>
                </div>
            </div>
        </div>
    );
};

const AchievementItem: React.FC<{ id: string, t: any, unlocked: boolean }> = ({ id, t, unlocked }) => {
    const achievement = t.achievements[id];
    return (
        <div className={`flex items-center gap-3 transition-opacity ${unlocked ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`p-2 rounded-lg ${unlocked ? 'bg-amber-500/20' : 'bg-slate-800'}`}>
                <Trophy className={`w-5 h-5 ${unlocked ? 'text-amber-400' : 'text-slate-500'}`} />
            </div>
            <div>
                <p className="text-xs font-bold">{achievement.name}</p>
                <p className="text-[10px] text-slate-400">{achievement.desc}</p>
            </div>
        </div>
    );
};

const DeviceSelector: React.FC<{
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  t: any;
  theme: Theme;
}> = ({ selectedBrand, setSelectedBrand, selectedModel, setSelectedModel, t, theme }) => {
  const selectClasses = "w-full bg-slate-800/80 border border-slate-600 rounded-lg px-3 py-2 text-xs font-orbitron focus:ring-1 focus:ring-cyan-500 outline-none appearance-none";
  
  return (
    <div>
      <h3 className="font-orbitron text-xs flex items-center justify-center gap-2 uppercase tracking-wider mb-3 text-slate-400">
        <Cpu className="w-4 h-4"/> {t.deviceProfileTitle}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-orbitron text-slate-500 px-1">{t.brand}</label>
          <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)} className={selectClasses}>
            <option value="CUSTOM">{t.customDevice}</option>
            {Object.keys(deviceProfiles).sort().map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-orbitron text-slate-500 px-1">{t.model}</label>
          <select 
            value={selectedModel} 
            onChange={e => setSelectedModel(e.target.value)} 
            className={`${selectClasses} disabled:opacity-50 disabled:cursor-not-allowed`} 
            disabled={selectedBrand === 'CUSTOM'}
          >
            {selectedBrand !== 'CUSTOM' && Object.keys(deviceProfiles[selectedBrand] || {}).map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};


interface TutorialProps {
  t: any;
  onClose: () => void;
  activeTheme: Theme;
}

const Tutorial: React.FC<TutorialProps> = ({ t, onClose, activeTheme }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const tutorialSteps = t.tutorial.steps;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, tutorialSteps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const stepConfig = [
    { top: '50%', left: '50%', width: 'calc(100% - 3rem)', height: 'auto', transform: 'translate(-50%, -50%)' }, // Welcome (centered modal)
    { top: '330px', left: '1rem', width: 'calc(100% - 2rem)', height: '52px' }, // FPS Modes
    { top: '482px', left: '1rem', width: 'calc(100% - 2rem)', height: '88px' }, // Main Boost
    { top: '184px', left: '1rem', width: 'calc(100% - 2rem)', height: '104px' }, // Live Stats
    { top: '578px', left: '1rem', width: 'calc(100% - 2rem)', height: '70px' }, // Advanced Tools
  ];
  
  const currentConfig = stepConfig[currentStep];

  return (
    <div className="fixed inset-0 z-[200] animate-in fade-in pointer-events-none">
      {/* Overlay panels */}
      {currentStep > 0 ? (
        <>
            <div className="absolute bg-slate-900/80 backdrop-blur-sm transition-all duration-500" style={{ top: 0, left: 0, width: '100%', height: currentConfig.top }} />
            <div className="absolute bg-slate-900/80 backdrop-blur-sm transition-all duration-500" style={{ top: `calc(${currentConfig.top} + ${currentConfig.height})`, left: 0, width: '100%', bottom: 0 }} />
            <div className="absolute bg-slate-900/80 backdrop-blur-sm transition-all duration-500" style={{ top: currentConfig.top, left: 0, width: currentConfig.left, height: currentConfig.height }} />
            <div className="absolute bg-slate-900/80 backdrop-blur-sm transition-all duration-500" style={{ top: currentConfig.top, right: 0, left: `calc(${currentConfig.left} + ${currentConfig.width})`, height: currentConfig.height }} />
        </>
      ) : (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
      )}
      
      {/* Highlight Box */}
      {currentStep > 0 && (
          <div
              className={`absolute border-2 ${themes[activeTheme].border.replace('/30', '/80')} rounded-2xl transition-all duration-500 pointer-events-none shadow-[0_0_25px_${themes[activeTheme].stopColor}]`}
              style={{
                  top: currentConfig.top,
                  left: currentConfig.left,
                  width: currentConfig.width,
                  height: currentConfig.height,
                  transform: currentConfig.transform
              }}
          />
      )}
      
      {/* Text Box */}
      <div 
        className={`absolute glass-panel p-4 rounded-2xl w-[calc(100%-2rem)] max-w-sm transition-all duration-500 pointer-events-auto`}
        style={currentStep === 0 ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } : { bottom: '1rem', left: '1rem' }}
      >
        <h3 className={`font-orbitron text-lg font-bold ${themes[activeTheme].text} mb-2`}>{tutorialSteps[currentStep].title}</h3>
        <p className="text-sm text-slate-300 mb-4">{tutorialSteps[currentStep].text}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {tutorialSteps.map((_: any, index: number) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${currentStep === index ? themes[activeTheme].bg : 'bg-slate-600'}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button onClick={prevStep} className="p-2 rounded-md text-xs font-orbitron bg-slate-700 hover:bg-slate-600 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            {currentStep < tutorialSteps.length - 1 ? (
              <button onClick={nextStep} className={`px-3 py-2 rounded-md text-xs font-orbitron ${themes[activeTheme].bg} ${themes[activeTheme].hoverBg} text-slate-900 font-bold flex items-center gap-1`}>
                <span>{t.tutorial.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={onClose} className={`px-4 py-2 rounded-md text-xs font-orbitron ${themes.emerald.bg} ${themes.emerald.hoverBg} text-slate-900 font-bold`}>
                {t.tutorial.finish}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
