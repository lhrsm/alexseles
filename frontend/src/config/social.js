// Redes sociais do rodapé (e de outros sítios do site). Para mudar um link, altere só aqui.
export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/rp1academy/' },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/channel/UCmyfinqwFP_poWStzOBkRzA' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/112597271305514' },
  { id: 'spotify', label: 'Spotify', url: 'https://open.spotify.com/show/6wfb0zJ319gFU1lvAqwvOM' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/alex-seles/' },
];

export const PODCAST_URL = SOCIAL_LINKS.find((s) => s.id === 'spotify').url;
