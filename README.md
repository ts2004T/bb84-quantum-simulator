# BB84 Quantum Key Distribution Simulator

An interactive web-based simulator that demonstrates the BB84 quantum key distribution protocol, showcasing secure key exchange between Alice and Bob with optional eavesdropper (Eve) simulation.

## 🔐 Features

### Core Protocol Implementation

- **Alice Module**: Generates random bits and bases, encodes photons
- **Quantum Channel**: Animates photon transmission with optional Eve interception
- **Bob Module**: Randomly measures incoming photons with chosen bases
- **Key Sifting**: Keeps only bits where Alice and Bob used matching bases
- **Eavesdropping Detection**: Calculates quantum bit error rate (QBER) to detect tampering

### Interactive Visualization

- **Canvas Animation**: Smooth photon animation across the quantum channel
- **Real-time Statistics**: Live display of measurements and sifted key
- **Error Rate Charts**: Track error rates over multiple simulation runs
- **Visual Indicators**: Color-coded displays for matching/mismatching bases

### Security Features

- **Eve Eavesdropping Simulation**: Demonstrates how eavesdropping introduces detectable errors
- **QBER Analysis**: Automatic threshold-based eavesdropping detection
- **Secure Key Display**: Shows the final cryptographic key

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**

```bash
cd bb84-quantum-simulator
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🎬 Demo

This simulator demonstrates how the BB84 quantum key distribution protocol enables secure communication and detects eavesdropping.

The visualization shows photon transmission, measurement, and error rate detection in real time. You can:

- **Watch Protocol Steps**: Follow the 5 main phases as they execute with visual progress indicators
- **Control Animation Speed**: Choose between slow (5.5s), normal (3.5s), or fast (2s) animation to observe details or get quick results
- **See Basis Visualization**: View the polarization states (↑, ↔, /, \) that represent quantum photon encodings
- **Monitor Eve's Attack**: Watch how the eavesdropper intercepts photons at the midpoint of the channel, and observe errors appear in the results
- **Track Error Rates**: Chart the Quantum Bit Error Rate (QBER) across multiple runs to verify detection thresholds

## 📊 Project Structure

```
/src
├── components/
│   ├── AlicePanel.jsx          # Alice's bit/basis generation display
│   ├── BobPanel.jsx            # Bob's measurement bases and results
│   ├── ChannelAnimation.jsx     # Photon animation on quantum channel
│   └── ResultsPanel.jsx         # Final key and security analysis
├── simulation/
│   └── bb84.js                 # Core BB84 protocol implementation
├── App.jsx                     # Main application component
├── App.css                     # Application-specific styles
├── index.css                   # Global styles
├── main.jsx                    # React entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
├── index.html                  # HTML template
└── README.md                   # This file
```

## 🔬 How the BB84 Protocol Works

### Step 1: **Alice's Preparation**

- Generates a random sequence of bits (0s and 1s)
- For each bit, randomly chooses a polarization basis:
  - **+** (Rectilinear): vertical (0°) and horizontal (90°)
  - **×** (Diagonal): diagonal (45°) and anti-diagonal (135°)
- Encodes bits as quantum photons with chosen polarization

### Step 2: **Quantum Transmission**

- Alice sends photons to Bob through a quantum channel
- Photons are visualized traveling across the canvas
- Eve can optionally intercept and measure photons

### Step 3: **Bob's Measurement**

- Bob randomly chooses a measurement basis for each photon
- If Bob's basis matches Alice's: accuracy = 100%
- If Bob's basis differs: accuracy = 50% (random)
- Displays his measurement bases and results

### Step 4: **Basis Comparison (Sifting)**

- Alice and Bob publicly compare their bases (not their bits!)
- They keep only bits where both used the same basis
- Discarded bits are removed (these were probabilistically incorrect)
- This filtered set is the "sifted key"

### Step 5: **Eavesdropping Detection**

- They sacrifice some sifted bits to check for errors
- Expected error rate without Eve: ~0%
- Expected error rate with Eve: ~25%
- If error rate > 12.5%, eavesdropping is detected

### Step 6: **Secure Key Agreement**

- If no eavesdropping detected, remaining sifted bits form a secret key
- This key is known only to Alice and Bob
- Can be used for symmetric encryption (e.g., one-time pad)

## 🕵️ Eve's Eavesdropping

When Eve eavesdropping is enabled:

1. **Photon Measurement**: Eve measures each photon with a randomly chosen basis
2. **Quantum Disturbance**: If Eve uses the wrong basis, quantum mechanics ensures the photon state is altered
3. **Error Introduction**: Eve forwards potentially corrupted photons to Bob
4. **Detection**: The corruption introduces detectable errors in the final key

This demonstrates the fundamental principle: **In quantum mechanics, observation changes the observed system.**

## 📈 Key Metrics

- **Total Qubits Sent**: Number of quantum bits transmitted
- **Qubits in Key**: Number retained after basis sifting (~50% of total)
- **Key Efficiency**: Percentage of transmitted qubits that form the final key
- **Error Rate (QBER)**: Quantum Bit Error Rate
  - Normal: 0-5%
  - With eavesdropping: ~25%
  - Threshold for detection: 12.5%

## 🎮 Using the Simulator

### Controls

- **Number of Qubits**: Adjust the length of the quantum transmission (8-128)
- **Simulate Eve Attack**: Toggle to enable eavesdropper simulation
- **Run Simulation**: Execute the BB84 protocol
- **Reset**: Clear results and run a new simulation

### Observation Tips

1. Run multiple simulations without Eve to see typical error rates
2. Run simulations with Eve to observe how eavesdropping increases error rates
3. Adjust qubit count to see statistical variations
4. Watch the channel animation to understand photon flow
5. Check error rate history to track patterns across runs

## 🔍 Technical Details

### Quantum Mechanics Principles Used

- **Photon Polarization**: Different bases represent orthogonal measurement bases
- **Measurement Collapse**: Measuring in the wrong basis gives random results
- **Observation Disturbance**: Measuring a system changes its state

### Security Guarantees

- **Information-theoretic security**: Not dependent on computational complexity
- **Unconditional security**: Cannot be broken even with unlimited computing power
- **Eavesdropping detection**: Guaranteed with high probability for long keys

### Implementation Notes

- Photons are symbolically represented (↑, ↔, /, \)
- Animation runs for 3.5 seconds per simulation
- Error rate calculation uses sifted bits only
- Chart.js provides statistical visualization

## 🛠️ Technologies Used

- **React 18**: UI framework
- **Vite**: Fast build tool and development server
- **Chart.js**: Data visualization for error rates
- **React-ChartJS-2**: React integration for Chart.js
- **HTML5 Canvas**: Smooth photon animation

## 📚 Educational Resources

### Understanding BB84

The BB84 protocol was invented by Charles H. Bennett and Gilles Brassard in 1984.
It was the first practical quantum cryptography algorithm.

### Key Concepts

- **Quantum Bit (Qubit)**: A quantum system that can exist in superposition
- **Polarization Basis**: Different ways to measure photon orientation
- **Quantum Entanglement**: Not used in BB84, but related to quantum cryptography
- **Quantum Teleportation**: Advanced concept building on BB84 principles

## 🚀 Future Enhancements

- [ ] Add B92 protocol variation
- [ ] Implement E91 protocol (using entangled photons)
- [ ] Add quantum channel noise simulation
- [ ] Implement multi-photon transmitter
- [ ] Add timing attack visualization
- [ ] Create comparative security analysis
- [ ] Add real-time QBER threshold adjustment
- [ ] Implement privacy amplification

## 📄 License

This educational simulator is provided as-is for learning purposes.

## 🎓 Educational Disclaimer

This is a **classical simulation** of quantum mechanics principles. Real quantum systems require:

- Single-photon sources and detectors
- Precise polarization control
- Quantum non-determinism
- Protected quantum channels

This simulator uses classical randomness to demonstrate the concepts.

## 🤝 Contributing

Suggestions and improvements are welcome! Areas for contribution:

- Additional quantum protocols
- Enhanced visualizations
- Performance optimizations
- Documentation improvements

## 📞 Contact & Support

For questions about BB84 or this simulator, consult:

- Original BB84 paper (Bennett & Brassard, 1984)
- Quantum cryptography textbooks
- Online quantum computing courses

---

**Last Updated**: March 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
