import Cookies from 'js-cookie';

export function getCookie(name) {
  const encodedCookieValue = Cookies.get(name);

  if (encodedCookieValue) {
    try {
      // Decode the encrypted cookie value
      const decodedValue = JSON.parse(decodeURIComponent(encodedCookieValue));
      
      return decodedValue;
    } catch (error) {
      return null; // Failed to parse JSON, return null
    }
  }

  return null; // Cookie not found
}

export function setCookie(name, value) {
  const encodedValue = encodeURIComponent(JSON.stringify(value));

  // Set cookie using js-cookie library with additional security options
  Cookies.set(name, encodedValue);
}
