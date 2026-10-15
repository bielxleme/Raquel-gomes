// Gerado automaticamente — fotos otimizadas em public/images (WebP responsivo).
export const photos = {
  'raquel-retrato': { width: 1215, height: 2160, widths: [480, 800, 1215], color: '#81614b' },
  'raquel-studio': { width: 1215, height: 2160, widths: [480, 800, 1215], color: '#7d7e7b' },
  'raquel-selfie': { width: 1600, height: 2133, widths: [480, 800, 1200, 1600], color: '#88786e' },
  'marca': { width: 1600, height: 2846, widths: [480, 800, 1200, 1600], color: '#472c1c' },
  'bancada-curso': { width: 1440, height: 2560, widths: [480, 800, 1200, 1440], color: '#a77c5a' },
  'procedimento': { width: 1600, height: 2133, widths: [480, 800, 1200, 1600], color: '#5e431f' },
  'turma-curso': { width: 1600, height: 2133, widths: [480, 800, 1200, 1600], color: '#6d6256' },
  'res-labios': { width: 1600, height: 1600, widths: [480, 800, 1200, 1600], color: '#947162' },
  'res-remocao': { width: 1284, height: 1284, widths: [480, 800, 1200, 1284], color: '#a79384' },
  'res-fios': { width: 1600, height: 785, widths: [480, 800, 1200, 1600], color: '#cda497' },
  'res-lamination': { width: 1284, height: 1284, widths: [480, 800, 1200, 1284], color: '#9f8472' },
} as const;

export type PhotoName = keyof typeof photos;
