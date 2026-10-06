import React from 'react';
import { articleJsonLd, OG_IMAGE, SITE_URL } from '../../config/seo';

/**
 * Dados estruturados de um artigo. Os artigos conhecidos na construção já trazem o JSON-LD no HTML pré-gerado
 * (scripts/generate-routes.js, <script id="ld-route">); este componente só o acrescenta quando a página não o tem
 * (por exemplo, um artigo publicado no Supabase depois da última construção), para não haver duplicados.
 */
export const ArticleJsonLd = ({ article }) => {
  if (!article) return null;
  if (typeof document !== 'undefined') {
    const pre = document.getElementById('ld-route');
    if (pre && pre.dataset.url === `${SITE_URL}/central-de-conhecimento/${article.slug}`) return null;
  }
  const image = article.image
    ? (String(article.image).startsWith('http') ? article.image : `${SITE_URL}${String(article.image).startsWith('/') ? '' : '/'}${article.image}`)
    : OG_IMAGE;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, image)) }} />;
};
