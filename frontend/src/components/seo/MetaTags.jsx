import { useEffect } from 'react';
import { OG_IMAGE, OG_IMAGE_ALT, PAGES, SITE_NAME, LOCALE, absoluteUrl } from '../../config/seo';

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/**
 * Atualiza título, descrição, canonical, Open Graph e Twitter ao navegar no site (o HTML de cada rota já sai
 * pré-gerado com os mesmos valores; ver scripts/generate-routes.js). Títulos e descrições vêm de config/seo.js.
 * O título é usado tal como vem (sem acrescentar nada).
 */
export const MetaTags = ({ title, description, canonicalPath = '', image, imageAlt, type = 'website', noIndex = false }) => {
  useEffect(() => {
    const finalTitle = title || PAGES[''].title;
    const finalDescription = description || PAGES[''].description;
    const url = absoluteUrl(canonicalPath);
    const img = image ? (String(image).startsWith('http') ? image : absoluteUrl(String(image))) : OG_IMAGE;

    document.title = finalTitle;
    setMeta('name', 'description', finalDescription);
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', finalDescription);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', LOCALE);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:image:alt', imageAlt || (img === OG_IMAGE ? OG_IMAGE_ALT : finalTitle));
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDescription);
    setMeta('name', 'twitter:image', img);
    const robots = noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    setMeta('name', 'robots', robots);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }, [title, description, canonicalPath, image, imageAlt, type, noIndex]);

  return null;
};
