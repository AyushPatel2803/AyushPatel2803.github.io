// src/ParticlesBackground.jsx
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function ParticlesBackground() {
  // Initialize the tsParticles instance
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Configuration options
  const particlesOptions = {
    
fullScreen: { enable: true, zIndex: -1 },
  background: {
    color: { value: '#0f0f23' } 
  },
  fpsLimit: 30,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ['repulse'] 
      },
      onClick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      trail: {
        delay: 0.2,
        quantity: 1,
        particles: {
          color: { value: '#66ffcc' }, 
          move: { speed: 2 },
          size: { value: 1 },
          opacity: { value: 0.2 }
        }
      }
    }
  },
  particles: {
    color: { value: ['#66ffcc', '#8e44ad', '#00d2ff'] },
    links: {
      color: '#66ffcc',
      distance: 80,
      enable: true,
      opacity: 0.1,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.5,
      outModes: { default: 'bounce' }
    },
    number: {
      value: 20,
      density: { enable: true, area: 800 }
    },
    opacity: {
      value: 0.7,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.2,
        sync: false
      }
    },
    shape: {
      type: 'star' 
    },
    size: {
      value: { min: 1, max: 4 }
    }
  },
  detectRetina: false
};

  return <Particles init={particlesInit} options={particlesOptions} />;
}