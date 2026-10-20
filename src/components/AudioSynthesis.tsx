import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';
import sampleAudio from '@/assets/sample-audio.mp3';

const AudioSynthesis: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [analyserData, setAnalyserData] = useState<number[]>(new Array(15).fill(40));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(sampleAudio);
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => { setDuration(audio.duration); setIsLoaded(true); };
    const handleTimeUpdate = () => { setCurrentTime(audio.currentTime); };
    const handleEnded = () => { setIsPlaying(false); setCurrentTime(audio.duration); };
    const handleCanPlay = () => { setIsLoaded(true); };
    const handleError = () => { console.log('Audio file not found'); setIsLoaded(false); };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const setupAnalyser = useCallback(() => {
    if (audioContextRef.current || !audioRef.current) return;
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.5;
    analyser.minDecibels = -100;
    analyser.maxDecibels = -10;
    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    audioContextRef.current = ctx;
    analyserRef.current = analyser;
    sourceRef.current = source;
  }, []);

  const updateWaveform = useCallback(() => {
    if (!analyserRef.current || !isPlaying) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Use logarithmic frequency mapping like a real equalizer
    // Each bar covers an exponentially wider range of bins
    const bars = 15;
    const maxBin = Math.min(dataArray.length, 80); // speech tops out around bin 80
    const logBase = Math.log(maxBin);
    
    const newData = Array.from({ length: bars }, (_, i) => {
      const startBin = Math.max(1, Math.round(Math.exp((logBase * i) / bars)));
      const endBin = Math.max(startBin + 1, Math.round(Math.exp((logBase * (i + 1)) / bars)));
      
      let sum = 0;
      let count = 0;
      for (let j = startBin; j < endBin && j < dataArray.length; j++) {
        sum += dataArray[j];
        count++;
      }
      const avg = count > 0 ? sum / count : 0;
      // Boost higher-frequency bars so they're more visible (speech rolls off)
      const boost = 1 + (i / bars) * 2.5;
      const scaled = Math.min(100, (avg / 255) * 100 * boost);
      return Math.max(20, scaled);
    });
    setAnalyserData(newData);
    animFrameRef.current = requestAnimationFrame(updateWaveform);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateWaveform);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [isPlaying, updateWaveform]);

  const togglePlayback = () => {
    if (!audioRef.current || !isLoaded) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else {
      setupAnalyser();
      if (audioContextRef.current?.state === 'suspended') audioContextRef.current.resume();
      audioRef.current.play(); setIsPlaying(true);
    }
  };

  const restartAudio = () => {
    if (!audioRef.current || !isLoaded) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      setupAnalyser();
      if (audioContextRef.current?.state === 'suspended') audioContextRef.current.resume();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const hasEnded = !isPlaying && currentTime > 0 && duration > 0 && currentTime >= duration - 0.5;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto border border-gray-200 bg-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-blue-500 mb-2 block">Audio Summaries</span>
            <h2 className="font-sans font-extralight text-3xl text-zinc-800 tracking-tight mb-4">Listen to the Science</h2>
            <p className="text-zinc-500 font-light mb-8">
              Every study we publish comes with a natural-sounding audio version. Listen on your commute, during a workout, or whenever reading isn't an option.
            </p>
            <div className="flex items-center gap-3">
              {/* Play/Pause button */}
              <button 
                onClick={togglePlayback}
                disabled={!isLoaded}
                className={`btn-sweep-trigger relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-300 transition-all ${
                  isLoaded ? '' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="absolute inset-0 rounded-full border border-gray-900 opacity-0 pointer-events-none transition-opacity duration-300 btn-sweep-border" />
                {isPlaying ? (
                  <Pause size={14} className="relative z-10 text-gray-900" />
                ) : (
                  <Play size={14} className="relative z-10 text-gray-900" fill="currentColor" />
                )}
                <span className="relative z-10 text-xs font-mono uppercase tracking-widest text-gray-900">{isPlaying ? 'Pause' : 'Play Sample'}</span>
              </button>
              {/* Restart button — appears after playback starts */}
              {(currentTime > 0) && (
                <button
                  onClick={restartAudio}
                  disabled={!isLoaded}
                  className={`btn-sweep-trigger relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 transition-all ${hasEnded ? 'animate-pulse' : ''}`}
                  title="Restart"
                >
                  <span className="absolute inset-0 rounded-full border border-gray-900 opacity-0 pointer-events-none transition-opacity duration-300 btn-sweep-border" />
                  <RotateCcw size={14} className="relative z-10 text-gray-900" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-8 h-48 relative overflow-hidden">
            {isPlaying && (
              <svg className="absolute inset-[-1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none z-20">
                <rect x="0" y="0" width="100%" height="100%" rx="12" ry="12" fill="none" stroke="#374151" strokeWidth="1.5" vectorEffect="non-scaling-stroke" pathLength="1" className="audio-orbit-stroke" />
              </svg>
            )}
            <div className="absolute top-4 right-4 text-gray-300">
              <Volume2 size={20} />
            </div>
            
            <div className="flex items-center gap-1.5 h-12">
              {analyserData.map((height, i) => (
                <div 
                  key={i} 
                  className="w-1.5 rounded-full bg-gray-800 transition-[height] duration-75"
                  style={{ 
                    height: `${height}%`,
                    opacity: isPlaying ? 1 : 0.8,
                  }}
                />
              ))}
            </div>
            
            <div className="mt-6 flex items-center justify-between w-full px-4 text-[10px] font-mono text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span className="tracking-widest uppercase text-gray-500">Sleep Protocol</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioSynthesis;
