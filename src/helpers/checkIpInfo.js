let cookieName = 'ipInfo'
let apiKey = 'a96dd7c20cca4d3c928434af9e5de67d';
const urlIpGeolocation = `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        try {
          const decodedValue = JSON.parse(decodeURIComponent(cookieValue));
          return decodedValue;
        } catch (error) {
          return null;
        }
      }
    }
    return null;
  }

function setCookie(name, value) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000));
    const cookieValue = encodeURIComponent(value) + `; expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${cookieValue}; path=/`;
}

async function getIpInfofromApi() {
    try {
        const response = await fetch(urlIpGeolocation)
        if (response) {
            return response
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

export async function checkIpInfo() {
    try {
        const ipFromCookies = await getCookie(cookieName)
        if (ipFromCookies) {
            console.log(ipFromCookies)
            return ipFromCookies
        } else {
            const getIpInfo = await getIpInfofromApi()
            const response = await getIpInfo.json()
            if (response) {
                setCookie(cookieName, response)
                return response
            } else {
                console.log('Get IP Failed')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
