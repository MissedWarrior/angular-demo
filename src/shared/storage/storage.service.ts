import { Injectable } from '@angular/core';

type StorageType = 'localStorage' | 'sessionStorage';

@Injectable({ providedIn: 'root' })
export class StorageService {

  getStringValue(key: string, storageType: StorageType = 'localStorage'): string | null {
    return this.getAccordingStorage(storageType).getItem(key);
  }

  getSerializableValue<T>(key: string, storageType: StorageType = 'localStorage'): T | null {
    const item = this.getAccordingStorage(storageType).getItem(key);

    if (!item) return null;

    return this.tryParseJson<T>(item);
  }

  setSerializableValue(key: string, value: any, storageType: StorageType = 'localStorage') {
    this.getAccordingStorage(storageType).setItem(key, JSON.stringify(value));
  }

  setStringValue(key: string, value: string, storageType: StorageType = 'localStorage') {
    this.getAccordingStorage(storageType).setItem(key, value);
  }

  removeItem(key: string, storageType: StorageType = 'localStorage') {
    this.getAccordingStorage(storageType).removeItem(key);
  }

  clearStorage(storageType: StorageType = 'localStorage') {
    this.getAccordingStorage(storageType).clear();
  }

  private tryParseJson<T>(strToParse: string): T | null {
    try {
      return JSON.parse(strToParse);
    } catch (e) {
      return null;
    }
  }

  private getAccordingStorage(type: StorageType): Storage {
    return window[type];
  }
}
