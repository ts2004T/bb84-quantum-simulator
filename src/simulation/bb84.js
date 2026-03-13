/**
 * BB84 Quantum Key Distribution Protocol Simulation
 * 
 * The BB84 protocol is a quantum cryptography algorithm that allows secure
 * exchange of a cryptographic key. It uses quantum mechanics principles
 * where measuring quantum states inevitably changes them, allowing detection
 * of eavesdropping attempts.
 */

/**
 * Generates random bits (0 or 1)
 * @param {number} length - Number of bits to generate
 * @returns {number[]} Array of random bits
 */
export function generateRandomBits(length) {
  return Array.from({ length }, () => Math.random() < 0.5 ? 0 : 1);
}

/**
 * Generates random bases for encoding/decoding
 * Uses two different basis types:
 * '+' = Rectilinear basis (vertical/horizontal polarization)
 * 'x' = Diagonal basis (diagonal polarization)
 * 
 * @param {number} length - Number of bases to generate
 * @returns {string[]} Array of bases ('+' or 'x')
 */
export function generateRandomBases(length) {
  return Array.from({ length }, () => Math.random() < 0.5 ? '+' : 'x');
}

/**
 * Encodes bits into photon states based on the chosen basis
 * 
 * Rectilinear basis (+):
 *   bit 0 -> vertical polarization (0°)
 *   bit 1 -> horizontal polarization (90°)
 * 
 * Diagonal basis (x):
 *   bit 0 -> diagonal polarization (45°)
 *   bit 1 -> anti-diagonal polarization (135°)
 * 
 * @param {number[]} bits - Array of bits to encode
 * @param {string[]} bases - Array of bases for encoding
 * @returns {string[]} Array of encoded photon states
 */
export function encodePhotons(bits, bases) {
  return bits.map((bit, index) => {
    const basis = bases[index];
    if (basis === '+') {
      return bit === 0 ? '↑' : '↔';  // Vertical or Horizontal
    } else {
      return bit === 0 ? '/' : '\\'; // Diagonal or Anti-diagonal
    }
  });
}

/**
 * Simulates Bob measuring incoming photons with his chosen bases
 * 
 * If Bob uses the same basis as Alice:
 *   - He will correctly measure the bit with 100% accuracy
 * 
 * If Bob uses a different basis:
 *   - He has a 50% chance of measuring the correct bit
 *   - He has a 50% chance of measuring the incorrect bit
 * 
 * @param {string[]} photons - Encoded photon states from Alice
 * @param {string[]} bases - Bob's chosen measurement bases
 * @returns {number[]} Array of measured bits
 */
export function measurePhotons(photons, bases) {
  return photons.map((photon, index) => {
    const bobBasis = bases[index];
    
    // Determine original bit from photon symbol
    const isVerticalOrDiagonal = photon === '↑' || photon === '/';
    const originalBit = isVerticalOrDiagonal ? 0 : 1;
    
    // Check if photon's original basis matches Bob's measurement basis
    const rectilinearPhotons = ['↑', '↔'];
    const diagonalPhotons = ['/', '\\'];
    const photonInRectilinear = rectilinearPhotons.includes(photon);
    
    const correctBasis = 
      (photonInRectilinear && bobBasis === '+') ||
      (!photonInRectilinear && bobBasis === 'x');
    
    if (correctBasis) {
      // Correct basis: accurate measurement
      return originalBit;
    } else {
      // Wrong basis: random result (50% chance of error)
      return Math.random() < 0.5 ? originalBit : (1 - originalBit);
    }
  });
}

/**
 * Sifts the key: keeps only bits where Alice and Bob used the same basis
 * 
 * This step is crucial because it removes all bits measured with wrong bases,
 * keeping only those with a guaranteed 100% accuracy.
 * 
 * @param {number[]} aliceBits - Alice's original bits
 * @param {number[]} bobBits - Bob's measured bits
 * @param {string[]} aliceBases - Alice's encoding bases
 * @param {string[]} bobBases - Bob's measurement bases
 * @returns {Object} Object containing:
 *   - bits: sifted bits (only where bases match)
 *   - indices: indices where bases matched
 */
export function siftKey(aliceBits, bobBits, aliceBases, bobBases) {
  const bits = [];
  const indices = [];
  const matches = [];
  
  aliceBases.forEach((aliceBasis, index) => {
    matches[index] = aliceBasis === bobBases[index];
    if (matches[index]) {
      bits.push(aliceBits[index]);
      indices.push(index);
    }
  });
  
  return { bits, indices, matches };
}

/**
 * Simulates Eve eavesdropping on the quantum channel
 * 
 * Eve intercepts each photon and measures it with a randomly chosen basis.
 * Her measurement temporarily collapses the quantum state. If she chose the
 * wrong basis, she will likely send an incorrect photon to Bob, introducing
 * detectable errors in the final key.
 * 
 * @param {string[]} photons - Photon states from Alice
 * @param {string[]} aliceBases - Alice's encoding bases
 * @returns {Object} Object containing:
 *   - evePhotons: photon states after Eve's measurement and forwarding
 *   - eveBases: Eve's randomly chosen measurement bases
 *   - eveMeasuredBits: bits Eve measured
 */
export function eveEavesdrop(photons, aliceBases) {
  const eveBases = generateRandomBases(photons.length);
  const eveMeasuredBits = measurePhotons(photons, eveBases);
  
  // Eve's measurement may have altered the photon states
  // Re-encode based on what Eve measured
  const evePhotons = encodePhotons(eveMeasuredBits, eveBases);
  
  return {
    evePhotons,
    eveBases,
    eveMeasuredBits
  };
}

/**
 * Calculates the quantum bit error rate (QBER)
 * 
 * QBER is the fraction of bits that were measured with the correct basis
 * but still had an error. In ideal conditions with no eavesdropping:
 * - Expected QBER: ~0% (only errors from wrong basis measurements which are sifted out)
 * - With eavesdropping: ~25% (Eve introduces errors when she uses wrong basis)
 * 
 * A QBER > 12.5% typically indicates eavesdropping.
 * 
 * @param {number[]} aliceBits - Alice's original sifted bits
 * @param {number[]} bobBits - Bob's measured sifted bits
 * @returns {number} Error rate as a percentage (0-100)
 */
export function calculateErrorRate(aliceBits, bobBits) {
  if (aliceBits.length === 0) return 0;
  
  const errors = aliceBits.reduce((count, bit, index) => {
    return count + (bit !== bobBits[index] ? 1 : 0);
  }, 0);
  
  return (errors / aliceBits.length) * 100;
}

/**
 * Main BB84 simulation function
 * 
 * @param {number} length - Number of qubits to transmit (default: 32)
 * @param {boolean} simulateEve - Whether to simulate eavesdropping (default: false)
 * @returns {Object} Simulation results containing all generated and measured data
 */
export function simulateBB84(length = 32, simulateEve = false) {
  // Step 1: Alice generates random bits and bases
  const aliceBits = generateRandomBits(length);
  const aliceBases = generateRandomBases(length);
  
  // Step 2: Alice encodes the bits into photon states
  let photons = encodePhotons(aliceBits, aliceBases);
  
  // Step 3: Eve eavesdropping (optional)
  let eveData = null;
  if (simulateEve) {
    eveData = eveEavesdrop(photons, aliceBases);
    photons = eveData.evePhotons; // Eve forwards potentially altered photons
  }
  
  // Step 4: Bob generates random bases and measures
  const bobBases = generateRandomBases(length);
  const bobMeasuredBits = measurePhotons(photons, bobBases);
  
  // Step 5: Sift the key (keep only bits where bases match)
  const sifted = siftKey(aliceBits, bobMeasuredBits, aliceBases, bobBases);
  
  // Step 6: Calculate error rate from sifted bits
  const errorRate = calculateErrorRate(sifted.bits, sifted.bits); // Compare Alice's sifted bits with Bob's sifted bits
  // Note: We need Bob's sifted bits for true error rate calculation
  const bobSifted = sifted.bits.map((_, i) => bobMeasuredBits[sifted.indices[i]]);
  const actualErrorRate = calculateErrorRate(sifted.bits, bobSifted);
  
  // Step 7: Determine if eavesdropping was detected
  const eavedroppingThreshold = 12.5; // Expected ~25% with eavesdropping, ~0% without
  const eavedroppingDetected = actualErrorRate > eavedroppingThreshold;
  
  return {
    // Alice's data
    aliceBits,
    aliceBases,
    photons: photons.slice(), // Preserve original photons for visualization
    
    // Bob's data
    bobBases,
    bobMeasuredBits,
    
    // Sifted key (final shared secret)
    siftedIndices: sifted.indices,
    siftedBits: sifted.bits,
    matchingBases: sifted.matches,
    
    // Channel information
    channelLength: length,
    siftedLength: sifted.bits.length,
    
    // Security analysis
    errorRate: actualErrorRate,
    eavedroppingDetected,
    eavedroppingThreshold,
    
    // Eve's data (if simulated)
    eve: eveData ? {
      bases: eveData.eveBases,
      measuredBits: eveData.eveMeasuredBits
    } : null
  };
}

/**
 * Generates a formatted string representation of the final secret key
 * 
 * @param {number[]} bits - Array of bits
 * @returns {string} Bits joined as a string
 */
export function formatKey(bits) {
  if (!bits || bits.length === 0) {
    return '(no shared key yet)';
  }
  return bits.join('');
}
