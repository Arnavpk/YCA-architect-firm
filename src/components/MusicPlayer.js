'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const AUDIO_SOURCES = [
  { src: '/audio/ambient-music.m4a', type: 'audio/mp4' },
  { src: '/audio/ambient-music.mp3', type: 'audio/mpeg' },
];

const TARGET_VOLUME = 0.25;

// Per the HTML spec only these events grant user activation. scroll and wheel
// do not, so listening for them burns the unlock attempt without unblocking audio.
const ACTIVATION_EVENTS = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const wantsPlayRef = useRef(true);
  const unlockedRef = useRef(false);

  const fadeTo = useCallback((target, duration, onComplete) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);

    const start = audio.volume;
    const diff = target - start;
    const steps = 20;
    let step = 0;

    fadeRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
        return;
      }
      step += 1;
      audioRef.current.volume = Math.min(1, Math.max(0, start + diff * (step / steps)));
      if (step >= steps) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
        audioRef.current.volume = target;
        onComplete?.();
      }
    }, duration / steps);
  }, []);

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !wantsPlayRef.current) return Promise.resolve(false);

    const result = audio.play();
    if (!result) return Promise.resolve(true);

    return result
      .then(() => {
        unlockedRef.current = true;
        fadeTo(TARGET_VOLUME, 1000);
        localStorage.setItem('yca-music', 'on');
        return true;
      })
      .catch(() => false);
  }, [fadeTo]);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audio.setAttribute('playsinline', '');

    const preferred = AUDIO_SOURCES.find((s) => audio.canPlayType(s.type) !== '');
    audio.src = preferred ? preferred.src : AUDIO_SOURCES[0].src;
    audioRef.current = audio;

    const handleReady = () => setIsReady(true);
    const handleError = () => console.error('Failed to load audio:', audio.src);

    audio.addEventListener('loadedmetadata', handleReady);
    audio.addEventListener('canplay', handleReady);
    audio.addEventListener('error', handleError);

    if (localStorage.getItem('yca-music') === 'off') {
      wantsPlayRef.current = false;
      setIsPlaying(false);
    }

    // Try immediately — succeeds for repeat visitors with a high media
    // engagement score, or when the page already has sticky activation.
    attemptPlay();

    // Keep listening until playback actually starts. Using `once` would let a
    // non-activating event consume the only attempt.
    const onGesture = () => {
      if (unlockedRef.current || !wantsPlayRef.current) {
        detach();
        return;
      }
      attemptPlay().then((ok) => {
        if (ok) detach();
      });
    };

    const detach = () => {
      ACTIVATION_EVENTS.forEach((evt) =>
        document.removeEventListener(evt, onGesture, { capture: true })
      );
    };

    ACTIVATION_EVENTS.forEach((evt) =>
      document.addEventListener(evt, onGesture, { capture: true, passive: true })
    );

    return () => {
      detach();
      if (fadeRef.current) clearInterval(fadeRef.current);
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleReady);
      audio.removeEventListener('canplay', handleReady);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, [attemptPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isReady) return;

    if (isPlaying) {
      attemptPlay();
    } else {
      fadeTo(0, 500, () => audio.pause());
      localStorage.setItem('yca-music', 'off');
    }
  }, [isPlaying, isReady, attemptPlay, fadeTo]);

  const toggleMusic = () => {
    const next = !isPlaying;
    wantsPlayRef.current = next;
    setIsPlaying(next);

    // Called from a click, so this play() is inside the activation window.
    if (next) attemptPlay();
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      className={`music-toggle ${isPlaying ? 'playing' : ''}`}
      aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      aria-pressed={isPlaying}
      title={isPlaying ? 'Mute music' : 'Enable ambient music'}
    >
      <span className="music-bar" />
      <span className="music-bar" />
      <span className="music-bar" />
    </button>
  );
}
