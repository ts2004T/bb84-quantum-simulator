import React, { useState, useRef, useEffect } from 'react';
import AlicePanel from './components/AlicePanel';
import BobPanel from './components/BobPanel';
import ChannelAnimation from './components/ChannelAnimation';
import ResultsPanel from './components/ResultsPanel';
import ProtocolSteps from './components/ProtocolSteps';
import BasisVisualization from './components/BasisVisualization';
import { simulateBB84 } from './simulation/bb84';
import './App.css';

/**
 * Main App Component
 * 
 * Orchestrates the BB84 Quantum Key Distribution Protocol simulation
 * Manages state and coordinates all child components
 */
function App() {
  // Simulation state
  const [simulationData, setSimulationData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [simulateEve, setSimulateEve] = useState(false);
  const [qubitLength, setQubitLength] = useState(32);
  const [stepByStep, setStepByStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorRateHistory, setErrorRateHistory] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState('normal'); // 'slow', 'normal', 'fast'
  
  const animationTimeoutRef = useRef(null);

  // Calculate animation duration based on speed
  const getAnimationDuration = () => {
    switch (animationSpeed) {
      case 'slow':
        return 5500; // 5.5 seconds
      case 'fast':
        return 2000; // 2 seconds
      default:
        return 3500; // 3.5 seconds (normal)
    }
  };

  // Protocol step timing
  useEffect(() => {
    if (!isAnimating || !simulationData) return;

    const duration = getAnimationDuration();
    const stepDuration = duration / 5;

    // Cycle through protocol steps
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 5) return prev + 1;
        return prev;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isAnimating, animationSpeed, simulationData]);

  // Run a new BB84 simulation
  const runSimulation = () => {
    // Reset step-by-step mode
    setCurrentStep(0);

    // Run the BB84 protocol
    const data = simulateBB84(qubitLength, simulateEve);
    setSimulationData(data);

    // Start animation
    setIsAnimating(true);
    const duration = getAnimationDuration();
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setCurrentStep(0), 500); // Reset step after animation ends
      // Add error rate to history for charting
      setErrorRateHistory(prev => [...prev, data.errorRate]);
    }, duration); // Wait for animation to complete (speed-dependent)
  };

  // Reset the simulation
  const resetSimulation = () => {
    setSimulationData(null);
    setIsAnimating(false);
    setCurrentStep(0);
    setErrorRateHistory([]);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  // Toggle Eve mode (requires reset)
  const toggleEveMode = () => {
    setSimulateEve(!simulateEve);
    setSimulationData(null);
    setCurrentStep(0);
    setErrorRateHistory([]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '20px'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            🔐 BB84 Quantum Key Distribution Simulator
          </h1>
          <p style={{
            color: '#cbd5e1',
            fontSize: '14px',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            Interactive demonstration of secure key exchange using quantum mechanics.
            Experience how quantum systems detect eavesdropping attempts.
          </p>
        </div>

        {/* Control Panel */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            alignItems: 'end'
          }}>
            {/* Qubit Count Input */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '6px',
                color: '#0f172a',
                textTransform: 'uppercase'
              }}>
                Number of Qubits
              </label>
              <input
                type="number"
                min="8"
                max="128"
                step="8"
                value={qubitLength}
                onChange={(e) => setQubitLength(parseInt(e.target.value))}
                disabled={simulationData !== null}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              />
              <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                More qubits = more secure key (but slower)
              </p>
            </div>

            {/* Speed Control */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '6px',
                color: '#0f172a',
                textTransform: 'uppercase'
              }}>
                Animation Speed
              </label>
              <div style={{
                display: 'flex',
                gap: '6px'
              }}>
                {[
                  { value: 'slow', label: '🐢 Slow', color: '#f59e0b' },
                  { value: 'normal', label: '▶ Normal', color: '#6366f1' },
                  { value: 'fast', label: '⚡ Fast', color: '#ec4899' }
                ].map(speed => (
                  <button
                    key={speed.value}
                    onClick={() => setAnimationSpeed(speed.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: `2px solid ${animationSpeed === speed.value ? speed.color : '#e2e8f0'}`,
                      background: animationSpeed === speed.value ? `${speed.color}15` : 'white',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: animationSpeed === speed.value ? speed.color : '#64748b',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {speed.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Eve Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              background: '#f8fafc',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={simulateEve}
                onChange={toggleEveMode}
                disabled={simulationData !== null}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
              <label style={{
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                color: simulateEve ? '#ef4444' : '#0f172a'
              }}>
                {simulateEve ? '🚨 Eve is Eavesdropping' : '👁️ Simulate Eve Attack'}
              </label>
            </div>

            {/* Control Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={runSimulation}
                disabled={isAnimating}
                className="button button-primary"
                style={{ flex: 1 }}
              >
                ▶️ Run Simulation
              </button>
              <button
                onClick={resetSimulation}
                disabled={!simulationData}
                className="button button-secondary"
              >
                🔄
              </button>
            </div>
          </div>
        </div>

        {/* Protocol Steps - Full Width */}
        <div style={{ marginBottom: '20px' }}>
          <ProtocolSteps currentStep={currentStep} isAnimating={isAnimating} />
        </div>

        {/* Basis Visualization - Full Width */}
        <div style={{ marginBottom: '20px' }}>
          <BasisVisualization photons={simulationData?.photons} />
        </div>

        {/* Main Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Alice Panel */}
          <div>
            <AlicePanel simulationData={simulationData} isRunning={isAnimating} />
          </div>

          {/* Bob Panel */}
          <div>
            <BobPanel simulationData={simulationData} isRunning={isAnimating} />
          </div>
        </div>

        {/* Channel Animation - Full Width */}
        <div style={{ marginBottom: '20px' }}>
          <ChannelAnimation 
            simulationData={simulationData} 
            simulateEve={simulateEve}
            isAnimating={isAnimating}
            animationSpeed={animationSpeed}
          />
        </div>

        {/* Results Panel - Full Width */}
        <div>
          <ResultsPanel 
            simulationData={simulationData}
            errorRateHistory={errorRateHistory}
          />
        </div>

        {/* Protocol Explanation */}
        <div style={{ marginTop: '30px' }}>
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#0f172a'
            }}>
              How BB84 Works
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#6366f1'
                }}>
                  🔐 Step 1: Preparation
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
                  Alice generates random bits and randomly chooses a basis for each bit
                  (rectilinear + or diagonal ×). She encodes each bit as a quantum photon.
                </p>
              </div>

              <div>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#ec4899'
                }}>
                  📡 Step 2: Transmission
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
                  Alice sends the encoded photons to Bob through a quantum channel.
                  Any attempt to intercept and measure the photons will disturb them.
                </p>
              </div>

              <div>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#10b981'
                }}>
                  🔓 Step 3: Measurement
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
                  Bob randomly chooses a basis for each photon and measures it.
                  He only gets the correct result if he uses the same basis as Alice.
                </p>
              </div>

              <div>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#f59e0b'
                }}>
                  🔄 Step 4: Sifting
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
                  Alice and Bob compare bases over a public channel (without revealing bits).
                  They keep only bits where their bases matched—this is the sifted key.
                </p>
              </div>

              <div>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#06b6d4'
                }}>
                  🛡️ Step 5: Eavesdropping Detection
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
                  They sacrifice some sifted key bits to check for errors.
                  If Eve eavesdropped, her wrong basis measurements introduced detectable errors.
                </p>
              </div>

              <div>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#8b5cf6'
                }}>
                  🔑 Step 6: Secure Key
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
                  If no eavesdropping is detected, the remaining sifted key bits form a
                  cryptographic key known only to Alice and Bob.
                </p>
              </div>
            </div>

            <div className="alert alert-info" style={{ marginTop: '16px' }}>
              <strong>Why BB84 is Ultra-Secure:</strong>
              <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: '1.6' }}>
                Quantum mechanics ensures that measuring a quantum state changes it.
                An eavesdropper MUST measure the photons to steal the key, but this
                measurement inevitably introduces detectable errors. Alice and Bob can
                verify the channel is secure before using the key for encryption.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          textAlign: 'center',
          color: '#cbd5e1',
          fontSize: '12px'
        }}>
          <p>
            BB84 Protocol © Charles H. Bennett & Gilles Brassard (1984)
          </p>
          <p style={{ marginTop: '8px' }}>
            Interactive Simulator | Quantum Cryptography Education
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
