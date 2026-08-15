'use client';

import { useEffect, useRef, useState } from 'react';

const AUDIO_SOURCES = [
  { src: '/audio/ambient-music.m4a', type: 'audio/mp4' },
  { src: '/audio/ambient-music.mp3', type: 'audio/mpeg' },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true); // default ON
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';

    const preferred = AUDIO_SOURCES.find(
      (s) => audio.canPlayType(s.type) !== ''
    );
    audio.src = preferred ? preferred.src : AUDIO_SOURCES[0].src;
    audioRef.current = audio;

    const handleCanPlay = () => setIsReady(true);
    const handleError = () => console.error('Failed to load audio:', audio.src);

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    const savedPreference = localStorage.getItem('yca-music');
    if (savedPreference === 'off') {
      setIsPlaying(false);
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isReady) return;

    let fadeInterval;
    let cleanupInteractionListeners;

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          fadeInterval = fadeVolume(audio, 0.25, 1000);
          localStorage.setItem('yca-music', 'on');
        })
        .catch(() => {
          // Autoplay was blocked. Wait for the first user interaction
          // anywhere on the page, then start playback automatically.
          const startOnInteraction = () => {
            audio
              .play()
              .then(() => {
                fadeInterval = fadeVolume(audio, 0.25, 1000);
                localStorage.setItem('yca-music', 'on');
              })
              .catch((err) => console.warn('Playback still blocked:', err));

            events.forEach((evt) =>
              document.removeEventListener(evt, startOnInteraction)
            );
          };

          const events = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'];
          events.forEach((evt) =>
            document.addEventListener(evt, startOnInteraction, { once: true })
          );

          cleanupInteractionListeners = () => {
            events.forEach((evt) =>
              document.removeEventListener(evt, startOnInteraction)
            );
          };
        });
    } else {
      fadeInterval = fadeVolume(audio, 0, 500, () => {
        audio.pause();
      });
      localStorage.setItem('yca-music', 'off');
    }

    return () => {
      if (fadeInterval) clearInterval(fadeInterval);
      if (cleanupInteractionListeners) cleanupInteractionListeners();
    };
  }, [isPlaying, isReady]);

  const fadeVolume = (audio, targetVolume, duration, onComplete) => {
    const startVolume = audio.volume;
    const difference = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      const newVolume = startVolume + difference * (currentStep / steps);
      audio.volume = Math.min(1, Math.max(0, newVolume));

      if (currentStep >= steps) {
        clearInterval(interval);
        audio.volume = targetVolume;
        if (onComplete) onComplete();
      }
    }, stepDuration);

    return interval;
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Could not play music:', error);
      }
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      disabled={!isReady}
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