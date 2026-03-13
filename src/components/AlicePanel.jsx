import React from 'react';

/**
 * AlicePanel Component
 * 
 * Displays Alice's side of the BB84 protocol:
 * - The random bits Alice generates
 * - The random bases she chooses for encoding
 * - The encoded photon states
 */
const AlicePanel = ({ simulationData, isRunning }) => {
  if (!simulationData) {
    return (
      <div className="panel">
        <div className="panel-title">
          <span className="panel-icon">🔐</span>
          Alice (Sender)
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '12px' }}>
          Click "Run Simulation" to generate bits and bases
        </p>
      </div>
    );
  }

  const { aliceBits, aliceBases, photons } = simulationData;

  return (
    <div className="panel">
      <div className="panel-title">
        <span className="panel-icon">🔐</span>
        Alice (Sender)
      </div>

      {/* Random Bits */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#0f172a'
        }}>
          Generated Bits
        </h3>
        <div className="data-grid">
          {aliceBits.map((bit, index) => (
            <div 
              key={`alice-bit-${index}`}
              className="data-item"
              title={`Position ${index}`}
            >
              {bit}
            </div>
          ))}
        </div>
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b',
          marginTop: '8px'
        }}>
          Total: {aliceBits.length} qubits
        </p>
      </div>

      {/* Chosen Bases */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#0f172a'
        }}>
          Chosen Bases
        </h3>
        <div className="data-grid">
          {aliceBases.map((basis, index) => (
            <div 
              key={`alice-basis-${index}`}
              className="data-item"
              title={basis === '+' ? 'Rectilinear (vertical/horizontal)' : 'Diagonal'}
              style={{
                fontWeight: '700',
                fontSize: '16px',
                color: basis === '+' ? '#6366f1' : '#ec4899'
              }}
            >
              {basis}
            </div>
          ))}
        </div>
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b',
          marginTop: '8px'
        }}>
          <span style={{ color: '#6366f1', fontWeight: '600' }}>+</span> = Rectilinear &nbsp;
          <span style={{ color: '#ec4899', fontWeight: '600' }}>×</span> = Diagonal
        </p>
      </div>

      {/* Encoded Photons */}
      <div>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#0f172a'
        }}>
          Encoded Photon States
        </h3>
        <div className="data-grid">
          {photons.map((photon, index) => (
            <div 
              key={`photon-${index}`}
              className="data-item"
              title={
                photon === '↑' ? 'Vertical (0°)' :
                photon === '↔' ? 'Horizontal (90°)' :
                photon === '/' ? 'Diagonal (45°)' :
                'Anti-diagonal (135°)'
              }
              style={{
                fontWeight: '700',
                fontSize: '18px',
                color: '#10b981'
              }}
            >
              {photon}
            </div>
          ))}
        </div>
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b',
          marginTop: '8px'
        }}>
          Visual representation of quantum states
        </p>
      </div>

      {/* Information Box */}
      <div className="alert alert-info" style={{ marginTop: '20px' }}>
        <strong>Quantum Encoding:</strong>
        <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: '1.6' }}>
          Alice encodes each bit as a quantum photon with a specific polarization.
          The basis determines how the photon is oriented.
        </div>
      </div>
    </div>
  );
};

export default AlicePanel;
