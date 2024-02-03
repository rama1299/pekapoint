import Cookies from "js-cookie";

const cookieName = 'geoInfo';
const apiKey = 'a96dd7c20cca4d3c928434af9e5de67d';
const urlIpGeolocation = `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`;

export async function checkIpInfo() {
  const checkGeoInfo = Cookies.get(cookieName);

  if (!checkGeoInfo) {
    try {
      const response = await fetch(urlIpGeolocation);

      if (response.ok) {
        const ipInfo = await response.json();

        if (ipInfo && ipInfo.country && ipInfo.country.iso_code) {
          let dataCookie = {iso_code: ipInfo.country.iso_code.toLowerCase(), currency: ipInfo.country.currency.toLowerCase(), language: ipInfo.country.languages[0].iso_code.toLowerCase()}
          Cookies.set(cookieName, JSON.stringify(dataCookie));
          return dataCookie;
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

  return JSON.parse(checkGeoInfo);
}
