export function saveToSessionStorage(key, data) {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }

export function getFromSessionStorage(key) {
  const storedDataString = window.sessionStorage.getItem(key);
  return JSON.parse(storedDataString);
}