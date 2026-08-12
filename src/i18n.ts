export const locales = ['sq', 'en', 'bs'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'sq';

export const localeNames: Record<Locale, string> = {
  sq: 'Shqip',
  en: 'English',
  bs: 'Bosanski',
};

const ui = {
  sq: {
    home: 'Ballina', about: 'Biografia', works: 'Veprat', news: 'Lajme', gallery: 'Galeri',
    activity: 'Veprimtaria', contact: 'Kontakti', location: 'Prishtinë, Kosovë',
    footerIntro: 'Aktor teatri dhe filmi nga Kosova. Projekte, lajme dhe kontakt zyrtar.',
    navigation: 'Navigimi', openMenu: 'Hap menunë', closeMenu: 'Mbyll menunë', language: 'Gjuha',
  },
  en: {
    home: 'Home', about: 'Biography', works: 'Works', news: 'News', gallery: 'Gallery',
    activity: 'Career', contact: 'Contact', location: 'Pristina, Kosovo',
    footerIntro: 'Theatre and film actor from Kosovo. Projects, news, and official contact.',
    navigation: 'Navigation', openMenu: 'Open menu', closeMenu: 'Close menu', language: 'Language',
  },
  bs: {
    home: 'Početna', about: 'Biografija', works: 'Djela', news: 'Vijesti', gallery: 'Galerija',
    activity: 'Karijera', contact: 'Kontakt', location: 'Priština, Kosovo',
    footerIntro: 'Pozorišni i filmski glumac sa Kosova. Projekti, vijesti i službeni kontakt.',
    navigation: 'Navigacija', openMenu: 'Otvori meni', closeMenu: 'Zatvori meni', language: 'Jezik',
  },
} as const;

export function localeFromPath(pathname: string, base = import.meta.env.BASE_URL): Locale {
  const path = pathname.replace(base, '').replace(/^\//, '');
  const candidate = path.split('/')[0];
  return candidate === 'en' || candidate === 'bs' ? candidate : defaultLocale;
}

export function stripLocale(pathname: string, base = import.meta.env.BASE_URL): string {
  const path = pathname.replace(base, '').replace(/^\//, '');
  return path.replace(/^(en|bs)(\/|$)/, '');
}

export function localizedUrl(locale: Locale, path = ''): string {
  const clean = path.replace(/^\//, '');
  const prefix = locale === defaultLocale ? '' : `${locale}/`;
  return `${import.meta.env.BASE_URL}${prefix}${clean}`;
}

export function useTranslations(locale: Locale) {
  return ui[locale];
}
