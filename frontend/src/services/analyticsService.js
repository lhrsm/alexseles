// Serviço de Analytics e Rastreamento de Visitas
// Alex Seles - Carreira & TI

const ANALYTICS_KEY = 'mc_site_analytics';

const DEFAULT_ANALYTICS = {
  year: 2026,
  months: [
    { month: 'Jan', visits: 0 },
    { month: 'Fev', visits: 0 },
    { month: 'Mar', visits: 0 },
    { month: 'Abr', visits: 0 },
    { month: 'Mai', visits: 0 },
    { month: 'Jun', visits: 0 },
    { month: 'Jul', visits: 0 },
    { month: 'Ago', visits: 0 },
    { month: 'Set', visits: 0 },
    { month: 'Out', visits: 0 },
    { month: 'Nov', visits: 0 },
    { month: 'Dez', visits: 0 }
  ],
  topPages: [
    { name: 'Página Inicial (Home)', visits: 0, percent: 0 },
    { name: 'Direito do Trabalho', visits: 0, percent: 0 },
    { name: 'Direito Previdenciário', visits: 0, percent: 0 },
    { name: 'Contato e Avaliação', visits: 0, percent: 0 }
  ],
  devices: {
    mobile: 0,
    desktop: 0,
    mobilePercent: 0,
    desktopPercent: 0
  }
};

export const getAnalytics = () => {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (!raw) {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(DEFAULT_ANALYTICS));
      return DEFAULT_ANALYTICS;
    }
    const parsed = JSON.parse(raw);
    
    // Purga automática de dados mockados anteriores (remover histórico fictício de 10.750 visitas)
    if (parsed.months && parsed.months[0]?.visits === 890) {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(DEFAULT_ANALYTICS));
      return DEFAULT_ANALYTICS;
    }
    return parsed;
  } catch (e) {
    return DEFAULT_ANALYTICS;
  }
};

export const resetAnalytics = () => {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(DEFAULT_ANALYTICS));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('mc_analytics_updated'));
    }
  } catch (e) {}
};

export const recordPageView = (pathname) => {
  if (!pathname || pathname.startsWith('/backoffice') || pathname.startsWith('/admin')) {
    return;
  }

  try {
    const analytics = getAnalytics();
    const currentMonthIndex = new Date().getMonth();

    if (analytics.months[currentMonthIndex]) {
      analytics.months[currentMonthIndex].visits += 1;
    }

    // Atualiza contagem de dispositivos
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (!analytics.devices) {
      analytics.devices = { mobile: 0, desktop: 0, mobilePercent: 0, desktopPercent: 0 };
    }
    if (isMobile) {
      analytics.devices.mobile = (analytics.devices.mobile || 0) + 1;
    } else {
      analytics.devices.desktop = (analytics.devices.desktop || 0) + 1;
    }
    const totalDevices = (analytics.devices.mobile || 0) + (analytics.devices.desktop || 0);
    if (totalDevices > 0) {
      analytics.devices.mobilePercent = Math.round((analytics.devices.mobile / totalDevices) * 100);
      analytics.devices.desktopPercent = 100 - analytics.devices.mobilePercent;
    }

    // Atualiza páginas mais visitadas
    if (!Array.isArray(analytics.topPages) || analytics.topPages.length === 0) {
      analytics.topPages = [
        { name: 'Página Inicial (Home)', visits: 0, percent: 0 },
        { name: 'Direito do Trabalho', visits: 0, percent: 0 },
        { name: 'Direito Previdenciário', visits: 0, percent: 0 },
        { name: 'Contato e Avaliação', visits: 0, percent: 0 }
      ];
    }

    if (pathname === '/' || pathname === '') {
      analytics.topPages[0].visits = (analytics.topPages[0].visits || 0) + 1;
    } else if (pathname.includes('trabalhista')) {
      analytics.topPages[1].visits = (analytics.topPages[1].visits || 0) + 1;
    } else if (pathname.includes('previdenciario')) {
      analytics.topPages[2].visits = (analytics.topPages[2].visits || 0) + 1;
    } else if (pathname.includes('contato')) {
      analytics.topPages[3].visits = (analytics.topPages[3].visits || 0) + 1;
    }

    const totalPageVisits = analytics.topPages.reduce((acc, p) => acc + (p.visits || 0), 0);
    if (totalPageVisits > 0) {
      analytics.topPages.forEach((p) => {
        p.percent = Math.round(((p.visits || 0) / totalPageVisits) * 100);
      });
    }

    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('mc_analytics_updated'));
    }
  } catch (e) {
    // safe fallback
  }
};

export const getYearTotalVisits = (analytics) => {
  return analytics.months.reduce((acc, curr) => acc + (curr.visits || 0), 0);
};

export const getCurrentMonthVisits = (analytics) => {
  const currentMonthIndex = new Date().getMonth();
  return analytics.months[currentMonthIndex]?.visits || 0;
};
