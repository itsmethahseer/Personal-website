import React, { useEffect, useRef } from 'react';

// Detect touch-only devices (phones, tablets) — no mouse, so no custom cursor needed
const isTouchDevice = () =>
  window.matchMedia('(pointer: coarse)').matches;

const Cursor = () => {
  const canvasRef = useRef(null);

  // Don't render cursor on touch devices
  if (isTouchDevice()) return null;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    let mouse = { x: width / 2, y: height / 2 };
    let points = [];
    const numPoints = 25; // Length of the trail

    // Initialize points
    for (let i = 0; i < numPoints; i++) {
      points.push({ x: mouse.x, y: mouse.y });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update points to trail the mouse
      // The first point follows the mouse closely
      points[0].x += (mouse.x - points[0].x) * 0.5;
      points[0].y += (mouse.y - points[0].y) * 0.5;

      // The rest of the points follow the previous point
      for (let i = 1; i < numPoints; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.4;
        points[i].y += (points[i - 1].y - points[i].y) * 0.4;
      }

      const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--on-surface-variant').trim() || '#888888';

      // Draw the smooth, fading trail
      for (let i = 0; i < numPoints - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        // Draw each segment individually to apply fading opacity and thickness
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Calculate how far along the trail this segment is (0 to 1)
        const progress = 1 - (i / numPoints); 
        
        // Fading effect: More transparent towards the end
        ctx.globalAlpha = progress * 0.5; // Max opacity 0.5 to keep it subtle
        // Tapering effect: Thinner towards the end
        ctx.lineWidth = progress * 4; // Max width 4px

        ctx.strokeStyle = lineColor;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1.0;

      // Draw a small dot exactly at the cursor for precision
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = lineColor;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none', // Ensures it doesn't block clicks/UI
        zIndex: 9999,
      }}
    />
  );
};

export default Cursor;
