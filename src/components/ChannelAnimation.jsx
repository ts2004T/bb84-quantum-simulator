import React, { useEffect, useRef, useState } from 'react';

/**
 * ChannelAnimation Component
 * 
 * Animates photons traveling from Alice to Bob through a quantum channel.
 * Optionally shows Eve intercepting photons in the middle of the channel.
 * 
 * Uses HTML Canvas for smooth animation.
 */
const ChannelAnimation = ({ simulationData, simulateEve, isAnimating, animationSpeed = 'normal' }) => {
  const canvasRef = useRef(null);
  const [photons, setPhotons] = useState([]);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  // Calculate animation duration based on speed
  const getAnimationDuration = () => {
    switch (animationSpeed) {
      case 'slow':
        return 5000; // 5 seconds
      case 'fast':
        return 1800; // 1.8 seconds
      default:
        return 3000; // 3 seconds (normal)
    }
  };

  useEffect(() => {
    if (!simulationData || !isAnimating) {
      setPhotons([]);
      return;
    }

    // Initialize photons from Alice to Bob
    const numPhotons = simulationData.aliceBits.length;
    const newPhotons = Array.from({ length: numPhotons }, (_, index) => ({
      id: index,
      progress: 0,
      symbol: simulationData.photons[index],
      eveIntercepted: false,
      eveInterceptProgress: 0
    }));

    setPhotons(newPhotons);
    startTimeRef.current = null;
  }, [simulationData, isAnimating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const animationDuration = getAnimationDuration();
    const eveInterceptTime = animationDuration * 0.5; // Eve intercepts at halfway point

    const animate = (currentTime) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Clear canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw quantum channel
      const channelY = canvas.height / 2;
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(40, channelY);
      ctx.lineTo(canvas.width - 40, channelY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Alice', 30, canvas.height - 20);
      ctx.fillText('Bob', canvas.width - 30, canvas.height - 20);

      // Draw Eve position if enabled
      const eveX = canvas.width / 2;
      if (simulateEve) {
        // Eve label
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('👁️ Eve (Attacker)', eveX, 25);
        
        // Pulse glow effect
        const pulsePhase = Math.sin(elapsed / 200) * 0.5 + 0.5;
        const glowSize = 20 + pulsePhase * 5;
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(eveX, channelY, 0, eveX, channelY, glowSize);
        glowGradient.addColorStop(0, `rgba(239, 68, 68, ${0.3 * pulsePhase})`);
        glowGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(eveX - glowSize, channelY - glowSize, glowSize * 2, glowSize * 2);
        
        // Main Eve interceptor circle
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(eveX, channelY, 18, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner filled circle for emphasis
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fill();
        
        // Direction lines to show interception
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(eveX - 25, channelY);
        ctx.lineTo(eveX - 18, channelY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(eveX + 18, channelY);
        ctx.lineTo(eveX + 25, channelY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw photons
      photons.forEach((photon) => {
        let photonProgress = progress;

        // Check if Eve intercepts this photon
        let eveIntercepts = false;
        if (simulateEve && progress >= eveInterceptTime / animationDuration) {
          eveIntercepts = true;
        }

        // Calculate photon position
        const startX = 60;
        const endX = canvas.width - 60;
        const midX = canvas.width / 2;

        let photonX;
        if (eveIntercepts) {
          // Two-phase movement: Alice -> Eve, then Eve -> Bob
          const phaseProgress = (progress - eveInterceptTime / animationDuration) / 
                               (1 - eveInterceptTime / animationDuration);
          if (progress < eveInterceptTime / animationDuration) {
            // Moving to Eve
            photonX = startX + (midX - startX) * (progress / (eveInterceptTime / animationDuration));
          } else {
            // Moving from Eve to Bob
            photonX = midX + (endX - midX) * phaseProgress;
          }
        } else {
          // Direct path: Alice to Bob
          photonX = startX + (endX - startX) * photonProgress;
        }

        // Draw photon (glowing particle)
        const glowSize = 8;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(photonX, channelY, 0, photonX, channelY, glowSize * 2);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(photonX - glowSize * 2, channelY - glowSize * 2, glowSize * 4, glowSize * 4);

        // Core photon
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(photonX, channelY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Photon symbol
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(photon.symbol, photonX, channelY);
      });

      // Draw timeline indicator
      ctx.fillStyle = '#6366f1';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(progress * 100)}%`, canvas.width - 10, 25);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [photons, simulateEve, animationSpeed]);

  return (
    <div className="panel">
      <div className="panel-title">
        <span className="panel-icon">📡</span>
        Quantum Channel {simulateEve && '(with Eve)'}
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          style={{ 
            width: '100%', 
            height: 'auto',
            maxWidth: '100%'
          }}
        />
      </div>

      {simulateEve && (
        <div className="alert alert-danger" style={{ marginTop: '12px' }}>
          <strong>⚠️ Eavesdropper Detected!</strong>
          <div style={{ marginTop: '8px', fontSize: '12px' }}>
            Eve is intercepting photons and measuring them with randomly chosen bases.
            If she measures with the wrong basis, she forwards an incorrect photon to Bob,
            creating detectable errors.
          </div>
        </div>
      )}

      {!simulateEve && (
        <div className="alert alert-info" style={{ marginTop: '12px' }}>
          <strong>Secure Channel</strong>
          <div style={{ marginTop: '8px', fontSize: '12px' }}>
            Photons travel directly from Alice to Bob.
            Any eavesdropping attempt would be detected by errors in the final key.
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelAnimation;
