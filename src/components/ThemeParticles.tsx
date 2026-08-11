import React, { useEffect, useRef } from 'react';

interface ThemeParticlesProps {
  themeId: string;
}

export const ThemeParticles: React.FC<ThemeParticlesProps> = ({ themeId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate particles based on theme
    const COUNT = 35;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      pulse: number;
    }> = [];

    const getThemeColors = (id: string) => {
      switch (id) {
        case 'forest':
          return ['#34d399', '#10b981', '#059669', '#a7f3d0', '#fef08a'];
        case 'ocean':
          return ['#22d3ee', '#38bdf8', '#60a5fa', '#93c5fd', '#ffffff'];
        case 'candy':
          return ['#f472b6', '#c084fc', '#fef08a', '#38bdf8', '#fecdd3'];
        case 'space':
          return ['#ffffff', '#c084fc', '#818cf8', '#e0e7ff', '#f43f5e'];
        case 'desert':
          return ['#fde047', '#fb923c', '#fdba74', '#ea580c', '#fef08a'];
        case 'snow':
          return ['#ffffff', '#bae6fd', '#e0f2fe', '#7dd3fc'];
        case 'volcano':
          return ['#ef4444', '#f97316', '#facc15', '#dc2626', '#ffedd5'];
        case 'neon':
        default:
          return ['#c084fc', '#22d3ee', '#f472b6', '#818cf8'];
      }
    };

    const colors = getThemeColors(themeId);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 2,
        speedX: (Math.random() - 0.5) * (themeId === 'desert' ? 2 : 0.8),
        speedY:
          themeId === 'snow' || themeId === 'forest'
            ? Math.random() * 1.2 + 0.5
            : themeId === 'ocean' || themeId === 'volcano'
            ? -(Math.random() * 1.5 + 0.5)
            : (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.pulse += 0.03;

        // Wrap edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const currentOpacity = Math.min(1, Math.max(0.1, p.opacity + Math.sin(p.pulse) * 0.2));
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        if (themeId === 'forest') {
          // Leaf shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (themeId === 'ocean') {
          // Bubble with glare
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.2, 0, Math.PI * 2);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.arc(-p.size * 0.3, -p.size * 0.3, p.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else if (themeId === 'candy') {
          // Candy star
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(
              Math.cos(((18 + i * 72) * Math.PI) / 180) * (p.size * 1.2),
              -Math.sin(((18 + i * 72) * Math.PI) / 180) * (p.size * 1.2)
            );
            ctx.lineTo(
              Math.cos(((54 + i * 72) * Math.PI) / 180) * (p.size * 0.5),
              -Math.sin(((54 + i * 72) * Math.PI) / 180) * (p.size * 0.5)
            );
          }
          ctx.closePath();
          ctx.fill();
        } else if (themeId === 'snow') {
          // Snowflake
          ctx.lineWidth = 1;
          for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, p.size * 1.3);
            ctx.stroke();
            ctx.rotate(Math.PI / 3);
          }
        } else if (themeId === 'volcano') {
          // Glowing ember spark
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.9, 0, Math.PI * 2);
          ctx.fill();
        } else if (themeId === 'neon') {
          // Neon square pixel
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (themeId === 'space') {
          // Twinkling star
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Desert sand particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeId]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
    />
  );
};
