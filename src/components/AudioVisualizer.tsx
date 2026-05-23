/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  onToggle: (state: boolean) => void;
  frequency?: number;
}

export default function AudioVisualizer({ isPlaying, onToggle, frequency = 55 }: AudioVisualizerProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const modRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const [wavePath, setWavePath] = useState<string>("");
  const phaseRef = useRef<number>(0);

  // Initialize Web Audio safely
  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      // Create main nodes
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const modulator = ctx.createOscillator();
      const modGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      // Configure deep ambient oscillator (fundamental hum)
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Configure sub-LFO for texture swelling (breathing)
      modulator.type = "sine";
      modulator.frequency.setValueAtTime(0.08, ctx.currentTime); // 0.08Hz slow breathing
      modGain.gain.setValueAtTime(8, ctx.currentTime); // mod amplitude in Hz

      // Lowpass filter to keep it extremely deep, sub-bass and warm
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(85, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      // Connect nodes: Modulator -> ModGain -> Osc Frequency (FM)
      modulator.connect(modGain);
      modGain.connect(osc.frequency);

      // Connected path: Osc -> Filter -> Gain -> Destination
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Warm start-up ramp
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3.0); // very soft, warm volume

      modulator.start();
      osc.start();

      oscRef.current = osc;
      modRef.current = modulator;
      filterRef.current = filter;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn("Audio Context init blocked or failed: ", e);
    }
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      try {
        gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2); // smooth fadeout
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            modRef.current?.stop();
            oscRef.current?.disconnect();
            modRef.current?.disconnect();
            filterRef.current?.disconnect();
            gainNodeRef.current?.disconnect();
          } catch (_) {}
          oscRef.current = null;
          modRef.current = null;
          filterRef.current = null;
          gainNodeRef.current = null;
        }, 1300);
      } catch (e) {
        console.warn("Error stopping audio safely: ", e);
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      initAudio();
    } else {
      stopAudio();
    }
    return () => {
      // Clean up sound nodes on unmount instantly
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch (_) {}
      }
    };
  }, [isPlaying, frequency]);

  // Adjust frequency dynamically on scene changes
  useEffect(() => {
    if (isPlaying && oscRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      oscRef.current.frequency.exponentialRampToValueAtTime(frequency, ctx.currentTime + 2.0);
    }
  }, [frequency, isPlaying]);

  // Organic wave animation using RequestAnimationFrame to avoid rendering overhead
  useEffect(() => {
    const generateWave = () => {
      const points: string[] = [];
      const width = 160;
      const height = 12;
      const steps = 40;
      
      phaseRef.current += isPlaying ? 0.025 : 0.006; // move slower if sound is paused
      const speedOffset = phaseRef.current;
      
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        // Natural visual frequency modulation: blend two sine waves with noise
        const noiseFactor = isPlaying ? Math.sin(speedOffset * 1.5 + i * 0.1) * 2.5 : 0;
        const mainWave = Math.sin(speedOffset + i * 0.18) * (isPlaying ? 4 : 1);
        const secWave = Math.cos(speedOffset * 0.5 + i * 0.1) * (isPlaying ? 2 : 0.5);
        const y = height / 2 + mainWave + secWave + noiseFactor;
        
        if (i === 0) {
          points.push(`M ${x} ${y}`);
        } else {
          points.push(`L ${x} ${y}`);
        }
      }
      
      setWavePath(points.join(" "));
      animationRef.current = requestAnimationFrame(generateWave);
    };

    animationRef.current = requestAnimationFrame(generateWave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div 
      className="flex items-center space-x-4 select-none cursor-pointer group"
      onClick={() => onToggle(!isPlaying)}
      title={isPlaying ? "Mute ambient" : "Activate cinematic hum"}
    >
      <span className="font-mono text-[9px] tracking-[0.2em] text-luxury-dim group-hover:text-luxury-accent transition-colors duration-700 uppercase">
        {isPlaying ? "ambient.ON" : "ambient.OFF"}
      </span>
      
      {/* 1px horizontal floating waveform */}
      <svg className="h-4 w-40 overflow-visible" fill="none" strokeWidth="0.75">
        <path 
          d={wavePath} 
          className="stroke-luxury-dim/40 group-hover:stroke-luxury-accent/60 transition-colors duration-700" 
        />
      </svg>
      
      <div className="p-1 rounded-full border border-luxury-accent/10 group-hover:border-luxury-accent/30 transition-all duration-700">
        {isPlaying ? (
          <Volume2 className="h-3.5 w-3.5 text-luxury-accent/80 animate-pulse-slow" />
        ) : (
          <VolumeX className="h-3.5 w-3.5 text-luxury-dim" />
        )}
      </div>
    </div>
  );
}
