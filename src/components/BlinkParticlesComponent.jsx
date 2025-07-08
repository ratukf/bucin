import { Box } from '@mui/material';

const PARTICLE_COUNT = 24;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 8 + Math.random() * 16,
  delay: `${Math.random() * 2}s`,
}));

export const BlinkParticlesComponent = () => (
  <>
    {PARTICLES.map((p, i) => (
      <Box
        key={i}
        sx={{
          position: 'absolute',
          top: p.top,
          left: p.left,
          width: p.size,
          height: p.size,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.7)',
          filter: 'blur(2px)',
          opacity: 0.7,
          animation: 'blink 2s infinite',
          animationDelay: p.delay,
          pointerEvents: 'none',
          zIndex: 0,
          '@keyframes blink': {
            '0%, 100%': { opacity: 0.7 },
            '50%': { opacity: 0.2 },
          },
        }}
      />
    ))}
  </>
);
