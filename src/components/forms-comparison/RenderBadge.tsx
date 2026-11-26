import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

interface RenderBadgeProps {
  count: number;
  tone: 'success' | 'warning' | 'info';
}

const TONE_STYLES = {
  success: {
    bg: '#ecfdf5',
    border: '#10b981',
    text: '#065f46',
    flash: '#a7f3d0',
  },
  info: {
    bg: '#eff6ff',
    border: '#3b82f6',
    text: '#1e40af',
    flash: '#bfdbfe',
  },
  warning: {
    bg: '#fffbeb',
    border: '#f59e0b',
    text: '#92400e',
    flash: '#fde68a',
  },
} as const;

export function RenderBadge({ count, tone }: RenderBadgeProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const styles = TONE_STYLES[tone];

  useEffect(() => {
    const el = boxRef.current;
    if (!el || count <= 1) return;

    el.style.backgroundColor = styles.flash;
    el.style.transform = 'scale(1.06)';
    const timer = window.setTimeout(() => {
      if (boxRef.current) {
        boxRef.current.style.backgroundColor = styles.bg;
        boxRef.current.style.transform = 'scale(1)';
      }
    }, 180);

    return () => window.clearTimeout(timer);
  });

  return (
    <Box
      ref={boxRef}
      aria-live="polite"
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 1.5,
        border: `1.5px solid ${styles.border}`,
        backgroundColor: styles.bg,
        color: styles.text,
        transition: 'background-color 180ms ease, transform 180ms ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        minWidth: 88,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: 'Consolas, monospace',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          lineHeight: 1.1,
          opacity: 0.85,
        }}
      >
        Renders
      </Typography>
      <Typography
        component="span"
        sx={{
          fontFamily: 'Consolas, monospace',
          fontSize: 22,
          fontWeight: 800,
          lineHeight: 1.1,
        }}
      >
        {String(count).padStart(2, '0')}
      </Typography>
    </Box>
  );
}
