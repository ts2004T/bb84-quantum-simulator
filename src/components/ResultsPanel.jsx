import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * ResultsPanel Component
 * 
 * Displays the final results of the BB84 protocol:
 * - The final shared secret key
 * - Error rate analysis
 * - Eavesdropping detection status
 * - Statistics about the protocol execution
 */
const ResultsPanel = ({ simulationData, errorRateHistory = [] }) => {
  if (!simulationData) {
    return (
      <div className="panel">
        <div className="panel-title">
          <span className="panel-icon">📊</span>
          Results & Analysis
        </div>
        <p style={{ color: '#94a3b8' }}>
          Results will appear here after running a simulation
        </p>
      </div>
    );
  }

  const {
    siftedBits,
    siftedIndices,
    channelLength,
    siftedLength,
    errorRate,
    eavedroppingDetected,
    eavedroppingThreshold,
    eve
  } = simulationData;

  // Format the shared secret key
  const sharedKey = siftedBits.join('');
  const keyEfficiency = ((siftedLength / channelLength) * 100).toFixed(1);

  // Prepare chart data for error rate history
  const chartData = {
    labels: errorRateHistory.map((_, i) => `Run ${i + 1}`),
    datasets: [
      {
        label: 'Error Rate (%)',
        data: errorRateHistory,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Eavesdropping Threshold (12.5%)',
        data: Array(errorRateHistory.length).fill(eavedroppingThreshold),
        borderColor: '#ef4444',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Error Rate Over Multiple Runs'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Error Rate (%)'
        }
      }
    }
  };

  return (
    <div className="panel">
      <div className="panel-title">
        <span className="panel-icon">📊</span>
        Results & Security Analysis
      </div>

      {/* Security Status Section */}
      <div style={{ marginBottom: '20px' }}>
        {eavedroppingDetected ? (
          <div className="alert alert-danger">
            <strong>🚨 EAVESDROPPING DETECTED!</strong>
            <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: '1.6' }}>
              Error rate ({errorRate.toFixed(2)}%) exceeds the threshold ({eavedroppingThreshold}%).
              This indicates the presence of an eavesdropper on the quantum channel.
              The key should be discarded and the transmission attempted again.
            </div>
          </div>
        ) : (
          <div className="alert alert-success">
            <strong>✅ SECURE CHANNEL VERIFIED</strong>
            <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: '1.6' }}>
              Error rate ({errorRate.toFixed(2)}%) is below the threshold ({eavedroppingThreshold}%).
              No eavesdropping detected. The shared key is secure.
            </div>
          </div>
        )}
      </div>

      {/* Shared Secret Key */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#0f172a'
        }}>
          Final Shared Secret Key
        </h3>
        <div className="key-display" style={{
          background: eavedroppingDetected ? 'rgba(239, 68, 68, 0.1)' : '#f8fafc',
          borderLeftColor: eavedroppingDetected ? '#ef4444' : '#10b981'
        }}>
          {sharedKey || '(empty)'}
        </div>
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b',
          marginTop: '8px'
        }}>
          This is the final cryptographic key. Only Alice and Bob know it.
        </p>
      </div>

      {/* Statistics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div className="stat">
          <div className="stat-label">Total Qubits Sent</div>
          <div className="stat-value">{channelLength}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Qubits in Key</div>
          <div className="stat-value">{siftedLength}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Key Efficiency</div>
          <div className="stat-value">{keyEfficiency}%</div>
        </div>
        <div className="stat">
          <div className="stat-label">Error Rate</div>
          <div className="stat-value" style={{
            color: eavedroppingDetected ? '#ef4444' : '#10b981'
          }}>
            {errorRate.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Error Rate Threshold Information */}
      <div style={{
        background: '#f8fafc',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#0f172a',
          textTransform: 'uppercase'
        }}>
          Error Rate Analysis
        </h3>
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          <div>
            <span style={{ fontWeight: '600' }}>Current Error Rate:</span> {errorRate.toFixed(2)}%
          </div>
          <div>
            <span style={{ fontWeight: '600' }}>Threshold:</span> {eavedroppingThreshold}%
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontWeight: '600' }}>Expected rates:</span>
            <ul style={{ marginTop: '4px', marginLeft: '16px', fontSize: '11px' }}>
              <li>Without eavesdropping: &lt; 0%</li>
              <li>With eavesdropping: ~25%</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Eve Information */}
      {eve && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.05)',
          padding: '12px',
          borderRadius: '6px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            fontSize: '12px', 
            fontWeight: '600', 
            marginBottom: '8px',
            color: '#b91c1c',
            textTransform: 'uppercase'
          }}>
            Eve's Eavesdropping Activity
          </h3>
          <div style={{ fontSize: '12px', color: '#7f1d1d' }}>
            <p>
              Eve measured {eve.bases.length} photons with randomly chosen bases.
              Her incorrect measurements introduced errors in the quantum channel.
            </p>
          </div>
        </div>
      )}

      {/* Chart */}
      {errorRateHistory && errorRateHistory.length > 0 && (
        <div style={{
          background: '#f8fafc',
          padding: '12px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          marginTop: '20px'
        }}>
          <Line data={chartData} options={chartOptions} height={200} />
        </div>
      )}

      {/* Information Box */}
      <div className="alert alert-info" style={{ marginTop: '20px' }}>
        <strong>How BB84 Detects Eavesdropping:</strong>
        <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: '1.6' }}>
          If Eve eavesdrops, she must measure photons with random bases. 
          When she uses the wrong basis, quantum mechanics ensures she corrupts the photon state.
          This corruption introduces detectable errors in the sifted key.
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
