import { useState, useEffect } from 'react';

const STORAGE_KEY = 'mbk_custom_logo';
const EVENT_NAME = 'mbk-logo-updated';

let memoryLogo: string | null = null;

// Initialize from localStorage or backend
export function getStoredLogo(): string | null {
  if (memoryLogo) return memoryLogo;
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      memoryLogo = saved;
      return saved;
    }
  }
  return null;
}

export async function setStoredLogo(logoDataUrl: string): Promise<void> {
  memoryLogo = logoDataUrl;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, logoDataUrl);
    } catch (e) {
      console.warn('Could not save logo to localStorage (quota exceeded?):', e);
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: logoDataUrl }));
  }

  // Also sync to backend
  try {
    await fetch('/api/logo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logo: logoDataUrl }),
    });
  } catch (err) {
    // Non-blocking backend sync
  }
}

export async function clearStoredLogo(): Promise<void> {
  memoryLogo = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
  }

  try {
    await fetch('/api/logo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logo: '' }),
    });
  } catch (err) {
    // Non-blocking
  }
}

export function useLogo() {
  const [logo, setLogo] = useState<string | null>(() => getStoredLogo());

  useEffect(() => {
    // Check backend on mount
    fetch('/api/logo')
      .then(res => res.json())
      .then(data => {
        if (data.logo && data.logo !== logo) {
          setLogo(data.logo);
          memoryLogo = data.logo;
          localStorage.setItem(STORAGE_KEY, data.logo);
        }
      })
      .catch(() => {});

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      setLogo(customEvent.detail);
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    return () => window.removeEventListener(EVENT_NAME, handleUpdate);
  }, []);

  return {
    customLogo: logo,
    setCustomLogo: setStoredLogo,
    clearCustomLogo: clearStoredLogo,
  };
}
