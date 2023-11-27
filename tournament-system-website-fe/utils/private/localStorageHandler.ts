class LocalStorageHandler<T> {
  constructor() {}

  checkLocalStorageData = (key: string): boolean | undefined => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem(key);
    }
  };

  getLocalStorageData = (key: string): string | undefined => {
    if (this.checkLocalStorageData(key)) return JSON.stringify(localStorage.getItem(key));
  };

  setLocalStorageData = (key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  removeLocalStorageData = (key: string): void => {
    localStorage.removeItem(key);
  };
}

export default LocalStorageHandler;
