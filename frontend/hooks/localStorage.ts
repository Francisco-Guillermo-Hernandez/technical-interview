export class LocalStorageUtils {
  static setItem<T>(key: string, value: T): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Failed to set item in localStorage: ${error}`);
      }
    }
  }
  
  static getItem<T>(key: string, defaultValue?: T): T | null {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue || null;
      } catch (error) {
        console.error(`Failed to get item from localStorage: ${error}`);
        return defaultValue || null;
      }
    }
    return defaultValue || null;
  }
  
  static removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Failed to remove item from localStorage: ${error}`);
      }
    }
  }
  
  static clear(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
      } catch (error) {
        console.error(`Failed to clear localStorage: ${error}`);
      }
    }
  }
}