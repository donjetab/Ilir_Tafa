export const locales = ['sq', 'en', 'bs'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'sq';

export const localeNames: Record<Locale, string> = {
  sq: 'Shqip',
  en: 'English',
  bs: 'Bosanski',
};

const routeSegments = {
  about: { sq: 'biografia', en: 'biography', bs: 'biografija' },
  works: { sq: 'veprat', en: 'works', bs: 'djela' },
  news: { sq: 'lajme', en: 'news', bs: 'vijesti' },
  gallery: { sq: 'galeria', en: 'gallery', bs: 'galerija' },
} as const;

type RouteKey = keyof typeof routeSegments;

function canonicalPath(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  if (!clean) return '';
  const [first, ...rest] = clean.split('/');
  const key = (Object.keys(routeSegments) as RouteKey[]).find((route) =>
    route === first || Object.values(routeSegments[route]).includes(first as never)
  );
  return [key ?? first, ...rest].join('/');
}

const ui = {
  sq: {
    home: 'Ballina', about: 'Biografia', works: 'Veprat', news: 'Lajme', gallery: 'Galeri',
    activity: 'Veprimtaria', contact: 'Kontakti', location: 'Prishtinë, Kosovë',
    footerIntro: 'Aktor teatri dhe filmi nga Kosova.',
    navigation: 'Navigimi', openMenu: 'Hap menunë', closeMenu: 'Mbyll menunë', language: 'Gjuha',
  },
  en: {
    home: 'Home', about: 'Biography', works: 'Works', news: 'News', gallery: 'Gallery',
    activity: 'Career', contact: 'Contact', location: 'Pristina, Kosovo',
    footerIntro: 'Theatre and film actor from Kosovo.',
    navigation: 'Navigation', openMenu: 'Open menu', closeMenu: 'Close menu', language: 'Language',
  },
  bs: {
    home: 'Početna', about: 'Biografija', works: 'Djela', news: 'Vijesti', gallery: 'Galerija',
    activity: 'Karijera', contact: 'Kontakt', location: 'Priština, Kosovo',
    footerIntro: 'Pozorišni i filmski glumac sa Kosova.',
    navigation: 'Navigacija', openMenu: 'Otvori meni', closeMenu: 'Zatvori meni', language: 'Jezik',
  },
} as const;

export const pageCopy = {
  sq: {
    siteDescription: 'Aktor teatri dhe filmi nga Kosova',
    worksTitle: 'Veprimtaria Artistike', worksSubtitle: 'Këtu mund të gjeni të gjithë veprimtarinë në film, televizion dhe teatër të aktorit Ilir Tafa',
    all: 'Të gjitha', film: 'Film', tv: 'Serial', theatre: 'Teatër', role: 'Roli', director: 'Regjia', venue: 'Vendi',
    backToWorks: 'Kthehu te Veprat', parts: 'pjesë', episodes: 'episode', filmParts: 'Pjesët e filmit', search: 'Kërko…', more: 'Më shumë', gallerySection: 'Galeria',
    newsPagination: 'Faqet e lajmeve', trailer: 'Traileri',
  },
  en: {
    siteDescription: 'Theatre and film actor from Kosovo',
    worksTitle: 'Artistic Career', worksSubtitle: 'Explore Ilir Tafa’s work in film, television, and theatre',
    all: 'All', film: 'Film', tv: 'TV series', theatre: 'Theatre', role: 'Role', director: 'Director', venue: 'Venue',
    backToWorks: 'Back to Works', parts: 'parts', episodes: 'episodes', filmParts: 'Film parts', search: 'Search…', more: 'Show more', gallerySection: 'Gallery',
    newsPagination: 'News pagination', trailer: 'Trailer',
  },
  bs: {
    siteDescription: 'Pozorišni i filmski glumac sa Kosova',
    worksTitle: 'Umjetnička karijera', worksSubtitle: 'Ovdje možete pogledati cjelokupan rad Ilira Tafe na filmu, televiziji i u pozorištu',
    all: 'Sve', film: 'Film', tv: 'Serija', theatre: 'Pozorište', role: 'Uloga', director: 'Režija', venue: 'Mjesto',
    backToWorks: 'Nazad na djela', parts: 'dijelova', episodes: 'epizoda', filmParts: 'Dijelovi filma', search: 'Pretraži…', more: 'Prikaži više', gallerySection: 'Galerija',
    newsPagination: 'Stranice vijesti', trailer: 'Najava',
  },
} as const;

export function localeFromPath(pathname: string, base = import.meta.env.BASE_URL): Locale {
  const path = pathname.replace(base, '').replace(/^\//, '');
  const candidate = path.split('/')[0];
  return candidate === 'en' || candidate === 'bs' ? candidate : defaultLocale;
}

export function stripLocale(pathname: string, base = import.meta.env.BASE_URL): string {
  const path = pathname.replace(base, '').replace(/^\//, '');
  return canonicalPath(path.replace(/^(en|bs)(\/|$)/, ''));
}

export function localizedUrl(locale: Locale, path = ''): string {
  const canonical = canonicalPath(path);
  const [first, ...rest] = canonical.split('/');
  const localizedFirst = first in routeSegments
    ? routeSegments[first as RouteKey][locale]
    : first;
  const clean = [localizedFirst, ...rest].filter(Boolean).join('/');
  const prefix = locale === defaultLocale ? '' : `${locale}/`;
  return `${import.meta.env.BASE_URL}${prefix}${clean}`;
}

export function useTranslations(locale: Locale) {
  return ui[locale];
}
