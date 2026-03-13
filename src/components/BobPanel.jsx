import React from 'react';

/**
 * BobPanel Component
 * 
 * Displays Bob's side of the BB84 protocol:
 * - The random bases Bob chooses for measurement
 * - The bits Bob measures from the incoming photons
 * - Comparison indicating which measurements used matching bases
 */
const BobPanel = ({ simulationData, isRunning }) => {
  if (!simulationData) {
    return (
      <div className="panel">
        <div className="panel-title">
          <span className="panel-icon">🔓</span>
          Bob (Receiver)
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '12px' }}>
          Awaiting quantum transmission...
        </p>
      </div>
    );
  }

  const { bobBases, bobMeasuredBits, matchingBases, siftedIndices } = simulationData;

  return (
    <div className="panel">
      <div className="panel-title">
        <span className="panel-icon">🔓</span>
        Bob (Receiver)
      </div>

      {/* Measurement Bases */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#0f172a'
        }}>
          Measurement Bases
        </h3>
        <div className="data-grid">
          {bobBases.map((basis, index) => (
            <div 
              key={`bob-basis-${index}`}
              className={`data-item ${matchingBases[index] ? 'match' : 'mismatch'}`}
              title={
                matchingBases[index] 
                  ? `✓ Matches Alice's basis` 
                  : `✗ Different from Alice's basis`
              }
              style={{
                fontWeight: '700',
                fontSize: '16px'
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
          <span style={{ color: '#10b981', fontWeight: '600' }}>Green</span> = Basis Match &nbsp;
          <span style={{ color: '#cbd5e1', fontWeight: '600' }}>Gray</span> = Basis Mismatch
        </p>
      </div>

      {/* Measured Bits */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#0f172a'
        }}>
          Measured Bits
        </h3>
        <div className="data-grid">
          {bobMeasuredBits.map((bit, index) => (
            <div 
              key={`bob-bit-${index}`}
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
          Raw measurements (before basis sifting)
        </p>
      </div>

      {/* Sifted Information */}
      <div style={{
        background: '#f8fafc',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        marginBottom: '12px'
      }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '12px',
          color: '#0f172a'
        }}>
          Key Sifting Results
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '12px'
        }}>
          <div className="stat">
            <div className="stat-label">Matching Bases</div>
            <div className="stat-value">{siftedIndices.length}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Discarded (Mismatched)</div>
            <div className="stat-value">{bobBases.length - siftedIndices.length}</div>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Progress: {siftedIndices.length} / {bobBases.length} bits retained
        </div>
        <div style={{ 
          width: '100%', 
          height: '4px', 
          background: '#e2e8f0', 
          borderRadius: '2px',
          marginTop: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: '#10b981',
            width: `${(siftedIndices.length / bobBases.length) * 100}%`,
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      {/* Information Box */}
      <div className="alert alert-info">
        <strong>Basis Measurement:</strong>
        <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: '1.6' }}>
          Bob randomly chooses measurement bases for each photon.
          He can only guarantee correct measurement if he uses the same basis as Alice.
        </div>
      </div>
    </div>
  );
};

export default BobPanel;
