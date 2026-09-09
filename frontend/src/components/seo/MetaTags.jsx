import { useEffect } from 'react';

const setOrUpdateMeta = (attr, key, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export const MetaTags = ({
  title,
  description,
  keywords,
  canonicalPath = '',
  image = 'https://www.alexseles.online/assets/alexseles.png',
  type = 'website',
  noIndex = false
}) => {
  useEffect(() => {
    // 1. Title
    const fullTitle = title 
      ? (title.includes('Alex Seles') ? title : `${title} | Alex Seles`) 
      : 'Alex Seles | Mentoria de Carreira TI, Transição & Liderança Executiva';
    document.title = fullTitle;

    // 2. Meta Description
    if (description) {
      setOrUpdateMeta('name', 'description', description);
      setOrUpdateMeta('property', 'og:description', description);
      setOrUpdateMeta('name', 'twitter:description', description);
    }

    // 3. Meta Keywords
    if (keywords) {
      const kwString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      setOrUpdateMeta('name', 'keywords', kwString);
    }

    // 4. Social Titles & Types
    setOrUpdateMeta('property', 'og:title', fullTitle);
    setOrUpdateMeta('name', 'twitter:title', fullTitle);
    setOrUpdateMeta('property', 'og:type', type);
    setOrUpdateMeta('property', 'og:site_name', 'Alex Seles - Carreira & TI');
    setOrUpdateMeta('property', 'og:locale', 'pt_PT');

    // 5. Images
    if (image) {
      const fullImgUrl = image.startsWith('http') ? image : `https://www.alexseles.online${image.startsWith('/') ? '' : '/'}${image}`;
      setOrUpdateMeta('property', 'og:image', fullImgUrl);
      setOrUpdateMeta('name', 'twitter:image', fullImgUrl);
      setOrUpdateMeta('name', 'twitter:card', 'summary_large_image');
    }

    // 6. Robots / Indexing Directives
    if (noIndex) {
      setOrUpdateMeta('name', 'robots', 'noindex, nofollow');
      setOrUpdateMeta('name', 'googlebot', 'noindex, nofollow');
    } else {
      setOrUpdateMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setOrUpdateMeta('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // 7. Canonical & Open Graph URL
    const baseUrl = 'https://www.alexseles.online';
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const fullCanonicalUrl = `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);
    setOrUpdateMeta('property', 'og:url', fullCanonicalUrl);

  }, [title, description, keywords, canonicalPath, image, type, noIndex]);

  return null;
};
