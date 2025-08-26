class LocalStorageService {
  STORAGE_KEY_PREFIX = 'moda_localstorage_';

  setItem(key: string, value: any) {
    localStorage.setItem(this.STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  }

  getItem(key: string, includePrefix = true) {
    if (includePrefix) {
      key = this.STORAGE_KEY_PREFIX + key;
    }

    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  removeItem(key: string) {
    localStorage.removeItem(this.STORAGE_KEY_PREFIX + key);
  }

  clearStorage() {
    localStorage.clear();
  }
}

export default new LocalStorageService();
