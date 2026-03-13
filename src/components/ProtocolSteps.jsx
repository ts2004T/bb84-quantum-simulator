import React from 'react';

/**
 * ProtocolSteps Component
 * 
 * Displays the current step of the BB84 protocol with visual indicators
 * Shows progression through the 5 main steps of the quantum key distribution
 */
const ProtocolSteps = ({ currentStep, isAnimating }) => {
  const steps = [
    { num: 1, title: 'Alice Generates Bits', icon: '🔐', color: '#6366f1' },
    { num: 2, title: 'Photon Transmission', icon: '📡', color: '#ec4899' },
    { num: 3, title: 'Bob Measurement', icon: '🔓', color: '#10b981' },
    { num: 4, title: 'Basis Comparison', icon: '🔄', color: '#f59e0b' },
    { num: 5, title: 'Key Generation', icon: '🔑', color: '#06b6d4' },
  ];

  if (!isAnimating && currentStep === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#0f172a'
        }}>
          Protocol Steps
        </h3>
        <p style={{
          color: '#64748b',
          fontSize: '13px',
          lineHeight: '1.6'
        }}>
          Run a simulation to see the BB84 protocol in action. Each step will be highlighted as the simulation progresses.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      marginBottom: '20px'
    }}>
      <h3 style={{
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '16px',
        color: '#0f172a'
      }}>
        Protocol Progress
      </h3>

      {/* Steps Timeline */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '8px',
        marginBottom: '20px'
      }}>
        {steps.map((step) => {
          const isActive = step.num === currentStep;
          const isCompleted = step.num < currentStep;

          return (
            <div
              key={step.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 8px',
                background: isActive
                  ? `${step.color}15`
                  : isCompleted
                  ? '#f0f9ff'
                  : '#f8fafc',
                borderRadius: '8px',
                border: `2px solid ${isActive ? step.color : isCompleted ? '#10b981' : '#e2e8f0'}`,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                fontSize: '24px',
                opacity: isActive || isCompleted ? 1 : 0.5
              }}>
                {isCompleted ? '✓' : step.icon}
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                textAlign: 'center',
                color: isActive ? step.color : isCompleted ? '#10b981' : '#64748b',
                lineHeight: '1.3'
              }}>
                Step {step.num}
              </div>
              <div style={{
                fontSize: '10px',
                textAlign: 'center',
                color: '#64748b',
                lineHeight: '1.2'
              }}>
                {step.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Step Details */}
      {currentStep > 0 && currentStep <= steps.length && (
        <div style={{
          padding: '12px',
          background: `${steps[currentStep - 1].color}10`,
          borderLeft: `4px solid ${steps[currentStep - 1].color}`,
          borderRadius: '4px'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: steps[currentStep - 1].color,
            marginBottom: '4px'
          }}>
            {steps[currentStep - 1].icon} {steps[currentStep - 1].title}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#64748b',
            lineHeight: '1.5'
          }}>
            {currentStep === 1 && 'Alice is generating random bits and selecting bases for encoding photons...'}
            {currentStep === 2 && 'Photons are being transmitted through the quantum channel. Watch for the photon animation!'}
            {currentStep === 3 && 'Bob is randomly measuring the incoming photons using his chosen bases...'}
            {currentStep === 4 && 'Alice and Bob compare their bases publicly (without revealing the bits)...'}
            {currentStep === 5 && 'The sifted key is being generated using only bits with matching bases...'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtocolSteps;
