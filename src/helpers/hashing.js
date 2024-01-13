async function generateHash(inputString) {
    // Konversi string ke ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);
  
    // Dapatkan digest hash SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Konversi hasil hash ke bentuk hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedString = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashedString;
}

async function validateHash(inputString, hashedString) {
    // Hash input string dengan metode yang sama yang digunakan di sisi server
    const hashedInputString = await generateHash(inputString);
  
    // Bandingkan hasil hash input dengan hashed string yang disimpan di server
    const isMatch = hashedInputString === hashedString;
    
    return isMatch;
}

export {generateHash, validateHash}