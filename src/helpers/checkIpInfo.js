import Cookies from "js-cookie";

const cookieName = 'iso_code';
const apiKey = 'a96dd7c20cca4d3c928434af9e5de67d';
const urlIpGeolocation = `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`;

export async function checkIpInfo() {
  const checkIsoCode = Cookies.get(cookieName);

  if (!checkIsoCode) {
    try {
      const response = await fetch(urlIpGeolocation);

      if (response.ok) {
        const ipInfo = await response.json();

        if (ipInfo && ipInfo.country && ipInfo.country.iso_code) {
          Cookies.set(cookieName, ipInfo.country.iso_code.toLowerCase());
          return ipInfo.country.iso_code.toLowerCase();
        } else {
          console.error('Invalid or missing data in IP information.');
          return null;
        }
      } else {
        console.error('Failed to fetch IP:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error in checkIpInfo:', error.message);
      return null;
    }
  }

  return checkIsoCode;
}
