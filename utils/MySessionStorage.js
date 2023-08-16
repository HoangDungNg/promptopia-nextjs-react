// import { useState, useEffect } from 'react';

// const useSessionStorage = (key, initialValue) => {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.sessionStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error('Error getting data from sessionStorage:', error);
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     try {
//       window.sessionStorage.setItem(key, JSON.stringify(storedValue));
//     } catch (error) {
//       console.error('Error storing data in sessionStorage:', error);
//     }
//   }, [key, storedValue]);

//   return [storedValue, setStoredValue];
// };

// export default useSessionStorage;

class MySessionStorage {
  store(key, initialValue) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(initialValue));
    } catch (error) {
      console.error('Error storing data in sessionStorage:', error);
    }
  }
  get(key) {
    try {
      const item = window.sessionStorage.getItem(key);
      return JSON.parse(item);
    } catch (error) {
      console.error('Error getting data from sessionStorage:', error);
    }
  }
  clear() {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Cannot clear session storage:', error);
    }
  }
}

export const appStorage = new MySessionStorage();
