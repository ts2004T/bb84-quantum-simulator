import React from 'react';

/**
 * BasisVisualization Component
 * 
 * Displays basis types with polarization icons and labels
 * Reinforces quantum physics concepts with visual representations
 */
const BasisVisualization = ({ bases = null, photons = null }) => {
  // Polarization descriptions
  const polarizationMap = {
    '↑': { symbol: '↑', name: 'Vertical', basis: '+', color: '#6366f1' },
    '↔': { symbol: '↔', name: 'Horizontal', basis: '+', color: '#6366f1' },
    '/': { symbol: '/', name: 'Diagonal', basis: 'x', color: '#ec4899' },
    '\\': { symbol: '\\', name: 'Anti-diagonal', basis: 'x', color: '#ec4899' }
  };

  const basisMap = {
    '+': { symbol: '+', name: 'Rectilinear', icon: '▬', color: '#6366f1' },
    'x': { symbol: 'x', name: 'Diagonal', icon: '✕', color: '#ec4899' }
  };

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
        Basis & Polarization Visualization
      </h3>

      {/* Basis Types */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#0f172a'
        }}>
          Basis Types
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {Object.entries(basisMap).map(([key, basis]) => (
            <div
              key={key}
              style={{
                padding: '12px',
                border: `2px solid ${basis.color}`,
                borderRadius: '8px',
                background: `${basis.color}08`,
                cursor: 'default'
              }}
            >
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: basis.color,
                marginBottom: '4px'
              }}>
                {basis.icon}
              </div>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: basis.color,
                marginBottom: '2px'
              }}>
                {basis.name}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#64748b'
              }}>
                Basis: <strong>{key}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Polarization States */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#0f172a'
        }}>
          Polarization States (Photon Encodings)
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '10px'
        }}>
          {Object.entries(polarizationMap).map(([symbol, pol]) => (
            <div
              key={symbol}
              style={{
                padding: '12px',
                border: `2px solid ${pol.color}`,
                borderRadius: '8px',
                background: `${pol.color}08`,
                textAlign: 'center'
              }}
              title={`${pol.name} polarization in ${pol.basis} basis`}
            >
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: pol.color,
                marginBottom: '6px',
                fontFamily: 'monospace'
              }}>
                {symbol}
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: pol.color,
                marginBottom: '2px'
              }}>
                {pol.name}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#64748b'
              }}>
                Basis: {pol.basis}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantum Concept Explainer */}
      <div style={{
        padding: '12px',
        background: '#f0f9ff',
        borderLeft: '4px solid #06b6d4',
        borderRadius: '4px'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#0369a1',
          marginBottom: '6px'
        }}>
          💡 Quantum Concept
        </div>
        <div style={{
          fontSize: '11px',
          color: '#64748b',
          lineHeight: '1.5'
        }}>
          In quantum mechanics, photons must be measured along a specific basis (+ or ×).
          If Alice encodes with + basis and Bob measures with × basis, he has a 50%
          chance of measuring correctly and 50% chance of measuring incorrectly. This
          uncertainty is the foundation of BB84's security!
        </div>
      </div>

      {/* Display Current Photons if provided */}
      {photons && photons.length > 0 && (
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <h4 style={{
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#0f172a'
          }}>
            Current Photon Encoding
          </h4>
          <div style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            maxHeight: '60px',
            overflowY: 'auto'
          }}>
            {photons.map((photon, index) => {
              const pol = polarizationMap[photon] || { color: '#ccc' };
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: `${pol.color}20`,
                    border: `1px solid ${pol.color}`,
                    fontSize: '16px',
                    fontWeight: '700',
                    color: pol.color,
                    fontFamily: 'monospace'
                  }}
                  title={`Photon ${index}: ${photon}`}
                >
                  {photon}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasisVisualization;
