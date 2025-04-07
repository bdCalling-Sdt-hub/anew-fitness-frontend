export const SetLocalStorage = (key: string, value: string|undefined|null) => {
    if (typeof window !== "undefined" && value !== undefined && value !== null) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  };
  
  export const GetLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return null;
      }
    }
    return null;
  };