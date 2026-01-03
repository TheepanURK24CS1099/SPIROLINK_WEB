import { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

export default function NetworkBackground() {
  useEffect(() => {
    // Load particles.js library from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize particles after library loads
      if (window.particlesJS) {
        window.particlesJS('particles-network', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#00bfff' },
            shape: { type: 'circle' },
            opacity: { 
              value: 0.5, 
              random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.3 }
            },
            size: { 
              value: 3, 
              random: true,
              anim: { enable: true, speed: 2, size_min: 1 }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#00bfff',
              opacity: 0.4,
              width: 1
            },
            move: { 
              enable: true, 
              speed: 3, 
              direction: 'none', 
              random: true,
              straight: false,
              out_mode: 'bounce',
              bounce: true
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' },
              onresize: { enable: true, mode: 'grab' }
            },
            modes: {
              grab: { 
                distance: 200, 
                line_linked: { opacity: 1 },
                duration: 0.5
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true,
          fps_limit: 60
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      {/* Dark overlay to make particles pop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: 'linear-gradient(135deg, rgba(0, 10, 20, 0.4) 0%, rgba(0, 20, 40, 0.3) 100%)',
          pointerEvents: 'none'
        }}
      />
      {/* Particles container */}
      <div
        id="particles-network"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto'
        }}
      />
    </>
  );
}
