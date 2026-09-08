import React from 'react';

export const TechMentorshipJsonLd = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://alexseles.com/#alexseles",
        "name": "Alex Seles",
        "jobTitle": "Head de Inovação e Tecnologia | Mentor de Carreira e Liderança em TI",
        "url": "https://alexseles.com/",
        "image": "https://alexseles.com/assets/alexseles.png",
        "sameAs": [
          "https://www.linkedin.com/in/alex-seles/"
        ],
        "description": "Engenheiro Informático, mestre, mais de 20 anos de experiência internacional em inovação, gestão de projetos e transição de carreira para tecnologia. Embaixador ITIL e membro PMI.",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Mestrado em Engenharia Informática"
        },
        "knowsAbout": [
          "Inteligência Artificial (IA) aplicada à Gestão de Projetos",
          "Liderança Executiva em TI (CEO, CTO, Head de Inovação)",
          "Transição Estratégica de Carreira para Tecnologia",
          "Gestão de Projetos de Software (PMP, Waterfall)",
          "Metodologias Ágeis (Scrum, Kanban, SAFe 6 Agilist)",
          "Governação de TI e Melhores Práticas (ITIL 4)",
          "Segurança da Informação, DPO e RGPD/LGPD",
          "Engenharia de Software, Arquitetura e QA",
          "Design Thinking Aplicado ao Desenvolvimento de Software",
          "Otimização de Currículo para ATS (Applicant Tracking Systems)",
          "Posicionamento Estratégico no LinkedIn e Marca Pessoal",
          "Preparação para Certificações Internacionais (PSM, PSPO, PMP, ITIL)"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "PMP® - Project Management Professional",
            "recognizedBy": {
              "@type": "Organization",
              "name": "PMI (Project Management Institute)"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "SAFe® 6 Agilist",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Scaled Agile"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "ITIL® 4 Ambassador",
            "recognizedBy": {
              "@type": "Organization",
              "name": "PeopleCert / Axelos"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "PSM II™ & PSM I™ (Professional Scrum Master)",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Scrum.org"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "PSPO I™ (Professional Scrum Product Owner)",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Scrum.org"
            }
          }
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://alexseles.com/#organization",
        "name": "Alex Seles - Mentoria de Carreira e Tecnologia em TI",
        "url": "https://alexseles.com/",
        "logo": "https://alexseles.com/assets/logo.png",
        "image": "https://alexseles.com/assets/alexseles.png",
        "description": "Mentoria individual de carreira em tecnologia, liderança ágil, inteligência artificial na gestão de projetos e transição profissional executiva com Alex Seles.",
        "telephone": "+351-912-405-814",
        "areaServed": ["Portugal", "Brasil", "Internacional"],
        "founder": {
          "@id": "https://alexseles.com/#alexseles"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Programas de Mentoria",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "Percurso Prático de Mentoria em TI (22 Horas + Bónus)",
                "description": "Formação executiva de 22 horas estruturada em 3 fases cobrindo Power Skills, Inteligência Artificial na Gestão de Projetos, Engenharia de Software, Governação/DPO, Metodologias Ágeis, Posicionamento no Mercado e Simulador Scrum/PO.",
                "provider": {
                  "@id": "https://alexseles.com/#alexseles"
                },
                "educationalCredentialAwarded": "Preparação para certificações internacionais (PSM I, PSPO I)"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

// Aliás para manter compatibilidade com componentes existentes
export const LegalServiceJsonLd = TechMentorshipJsonLd;

export const FaqJsonLd = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export const ArticleJsonLd = ({ article }) => {
  if (!article) return null;

  const imageUrl = article.image
    ? (article.image.startsWith('http') ? article.image : `https://alexseles.com${article.image.startsWith('/') ? '' : '/'}${article.image}`)
    : 'https://alexseles.com/assets/alexseles.png';

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://alexseles.com/central-de-conhecimento/${article.slug}`
    },
    "headline": article.h1 || article.title,
    "description": article.metaDescription,
    "image": [imageUrl],
    "url": `https://alexseles.com/central-de-conhecimento/${article.slug}`,
    "datePublished": article.publishedAt || '2026-09-07',
    "dateModified": article.publishedAt || '2026-09-07',
    "inLanguage": "pt-PT",
    "author": {
      "@type": "Person",
      "name": "Alex Seles",
      "jobTitle": "Head de Inovação & Tecnologia | Mentor de Carreira TI",
      "url": "https://alexseles.com/",
      "sameAs": "https://www.linkedin.com/in/alex-seles/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alex Seles - Carreira & TI",
      "url": "https://alexseles.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alexseles.com/favicon-32x32.png"
      }
    },
    "keywords": article.keywords ? (Array.isArray(article.keywords) ? article.keywords.join(", ") : article.keywords) : ""
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
