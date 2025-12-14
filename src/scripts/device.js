export const device = {
    is: {
        iPhone: /iPhone/.test(navigator.userAgent),
        iPad: /iPad/.test(navigator.userAgent),
        iOS: /iPhone|iPad|iPod/.test(navigator.userAgent),
        android: /Android/.test(navigator.userAgent),
        mobile: /Mobi|Android/i.test(navigator.userAgent) // matches most mobile browsers
    },
    prefers: {
        language: navigator.language || navigator.userLanguage,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        reducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)').matches
    },
    supports: {
        share: typeof navigator.share === 'function',
        directDownload: 'download' in document.createElement('a'),
        haptics: 'vibrate' in navigator || 'Vibrate' in window || typeof window.navigator.vibrate === 'function',
    },
    userAgent: navigator.userAgent
};