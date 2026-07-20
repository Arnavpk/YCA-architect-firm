'use client';

import { useEffect, useRef, useState } from 'react';

const AUDIO_SRC = '/audio/ambient-music.mp3'; // path relative to /public, served at root

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;
    const handleCanPlay = () => setIsReady(true);
    const handleError = () => console.error('Failed to load audio:', AUDIO_SRC);

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    const savedPreference = localStorage.getItem('yca-music');
    if (savedPreference === 'on') {
      setIsPlaying(true);
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !isReady) return;

    let fadeInterval;

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          fadeInterval = fadeVolume(audio, 0.25, 1000);
          localStorage.setItem('yca-music', 'on');
        })
        .catch((error) => {
          console.warn(
            'Browser blocked autoplay. Click the music button to start.',
            error
          );

          setIsPlaying(false);
          localStorage.setItem('yca-music', 'off');
        });
    } else {
      fadeInterval = fadeVolume(audio, 0, 500, () => {
        audio.pause();
      });

      localStorage.setItem('yca-music', 'off');
    }

    return () => {
      if (fadeInterval) {
        clearInterval(fadeInterval);
      }
    };
  }, [isPlaying, isReady]);

  const fadeVolume = (
    audio,
    targetVolume,
    duration,
    onComplete
  ) => {
    const startVolume = audio.volume;
    const difference = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;

      const newVolume =
        startVolume + difference * (currentStep / steps);

      audio.volume = Math.min(1, Math.max(0, newVolume));

      if (currentStep >= steps) {
        clearInterval(interval);
        audio.volume = targetVolume;

        if (onComplete) {
          onComplete();
        }
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