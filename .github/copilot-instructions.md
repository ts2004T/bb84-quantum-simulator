# BB84 Quantum Key Distribution Simulator - Project Guide

## Project Overview

This is an interactive React-based web simulator for the BB84 Quantum Key Distribution protocol. It demonstrates secure key exchange between Alice and Bob using quantum mechanics principles, with optional eavesdropper (Eve) simulation.

## Project Structure

```
/src
├── components/
│   ├── AlicePanel.jsx         - Alice's bit/basis generation display
│   ├── BobPanel.jsx           - Bob's measurement output panel
│   ├── ChannelAnimation.jsx   - Canvas-based photon animation
│   └── ResultsPanel.jsx       - Security analysis and shared key display
├── simulation/
│   └── bb84.js                - Core BB84 protocol implementation
├── App.jsx                    - Main application orchestrator
├── App.css                    - App-specific styling
├── index.css                  - Global styles
└── main.jsx                   - React entry point

Key Configuration Files:
- package.json                 - Dependencies and scripts
- vite.config.js              - Vite build configuration
- index.html                  - HTML template
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Opens at http://localhost:5173

### Build for Production

```bash
npm run build
```

## Key Features Implemented

✅ **Alice Module**

- Random bit generation
- Random basis selection (+ or ×)
- Photon encoding based on basis and bit

✅ **Quantum Channel Simulation**

- Canvas-based photon animation
- Horizontal transmission visualization
- Optional Eve intercept display

✅ **Bob Module**

- Random basis measurement
- Photon measurement with basis-dependent accuracy
- Visual matching indicators

✅ **Key Sifting**

- Basis comparison logic
- Keeps only matching-basis bits
- Discards probabilistically uncertain bits

✅ **Eavesdropping Detection**

- QBER calculation (Quantum Bit Error Rate)
- Threshold-based detection (12.5%)
- Error visualization with Chart.js

✅ **User Interface**

- Responsive grid layout
- Real-time data visualization
- Color-coded status indicators
- Interactive controls

## Technical Stack

- **React 18** - UI framework
- **Vite** - Build tool with fast dev server
- **Chart.js** - Statistical data visualization
- **HTML5 Canvas** - Smooth animation
- **CSS3** - Modern styling with gradients and animations

## Core BB84 Protocol Files

### `/src/simulation/bb84.js`

Main protocol implementation with functions:

- `generateRandomBits()` - Alice creates random bits
- `generateRandomBases()` - Random basis selection
- `encodePhotons()` - Quantum encoding
- `measurePhotons()` - Bob's measurement with basis dependency
- `siftKey()` - Keeps matching-basis bits
- `calculateErrorRate()` - QBER calculation
- `simulateBB84()` - Main protocol orchestrator
- `eveEavesdrop()` - Eve's eavesdropping simulation

## Styling System

Global CSS variables define the design system:

- Primary: `#6366f1` (Indigo)
- Secondary: `#ec4899` (Pink)
- Success: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Warning: `#f59e0b` (Amber)

### Component Classes

- `.panel` - Card container
- `.button` - Action buttons with hover effects
- `.badge` - Status indicators
- `.data-grid` - Flexible data display
- `.alert` - Status messages with color coding
- `.stat` - Statistics display boxes

## Running the Simulation

1. **Set Parameters**
   - Adjust qubit count (8-128)
   - Toggle Eve eavesdropping

2. **Run Simulation**
   - Click "Run Simulation" button
   - Watch photon animation (3.5 seconds)
   - View results in real-time

3. **Analyze Results**
   - Check shared secret key
   - Review error rate
   - See eavesdropping status
   - Track history across multiple runs

## Algorithm Flow

```
1. Alice generates bits and bases
   └─> Encodes photons based on basis+bit

2. Photons transmitted through channel
   └─> Eve intercepts (optional)
       └─> Measures with random basis
       └─> May corrupt photons

3. Bob measures with random bases
   └─> Gets correct result if bases match
   └─> 50% correct if bases differ

4. Alice & Bob compare bases publicly
   └─> Keep bits where bases matched (sifted key)

5. Check for eavesdropping
   └─> Calculate error rate
   └─> If error > 12.5%, Eve detected
   └─> Otherwise, use sifted key
```

## Performance Considerations

- Animation duration: 3.5 seconds per run
- Max recommended qubits: 128 (2^7)
- Chart history: Stores all error rates
- Canvas resolution: Responsive to container
- React optimization: Memoization for heavy components

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with canvas support

## Extending the Simulator

### Add New Protocol

1. Create new file in `/src/simulation/`
2. Implement protocol logic
3. Create UI panel component
4. Integrate into `App.jsx`

### Customize Visuals

- Modify CSS variables in `index.css`
- Update Canvas drawing in `ChannelAnimation.jsx`
- Add new badge/button styles

### Add Statistics

- Extend state in `App.jsx`
- Add new chart datasets in `ResultsPanel.jsx`
- Calculate metrics in `bb84.js`

## Common Issues & Fixes

| Issue                | Solution                                          |
| -------------------- | ------------------------------------------------- |
| Canvas not animating | Check if browser supports HTML5 Canvas            |
| Slow performance     | Reduce qubit count or check system resources      |
| Styles not applying  | Clear browser cache, rebuild with `npm run build` |
| Dependencies missing | Run `npm install` again                           |

## Security Notes

This is a **classical simulation** using deterministic randomness. Real quantum BB84 requires:

- Single-photon sources and detectors
- Quantum random number generation
- Protected quantum communication channels
- Quantum state verification

## Testing the Implementation

### Manual Testing

- Run with different qubit counts
- Compare results with/without Eve
- Check error rates for statistical patterns
- Verify key consistency across runs

### Algorithm Verification

- Sifted key should be ~50% of transmitted qubits
- Without Eve: error rate < 5%
- With Eve: error rate ~25%
- Detection threshold: 12.5% QBER

## References

- **Original Paper**: "Quantum Cryptography: Public Key Distribution and Coin Tossing" (Bennett & Brassard, 1984)
- **RFC 3394**: Key cryptography algorithm
- **Quantum Mechanics**: Nielsen & Chuang, "Quantum Computation and Quantum Information"

## Future Enhancement Ideas

- [ ] Implement B92 protocol variant
- [ ] Add E91 entanglement-based protocol
- [ ] Implement channel noise simulation
- [ ] Add real-time QBER threshold adjustment
- [ ] Create protocol comparison tool
- [ ] Add quantum error correction demonstration

## Contact & Support

For questions about this simulator or the BB84 protocol:

- Consult quantum cryptography literature
- Review the README.md file
- Check source code comments

---

**Last Updated**: March 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
