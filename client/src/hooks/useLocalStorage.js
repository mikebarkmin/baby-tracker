import { useState, useEffect, useCallback } from 'react';

class LocalStorageChanged extends CustomEvent {
  static eventName = 'onLocalStorageChange';

  constructor(payload) {
    super(LocalStorageChanged.eventName, { detail: payload });
  }
}

function tryParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function writeLocalStorage(key, value) {
  try {
    localStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : `${value}`
    );
    window.dispatchEvent(new LocalStorageChanged({ key, value }));
  } catch (error) {
    console.log(error);
  }
}

function deleteLocalStorage(key) {
  localStorage.removeItem(key);
  window.dispatchEvent(new LocalStorageChanged({ key, value: null }));
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(
    tryParse(localStorage.getItem(key)) || initialValue
  );

  const onLocalStorageChange = useCallback(
    event => {
      if (event instanceof LocalStorageChanged) {
        if (event.detail.key === key) {
          setStoredValue(event.detail.value);
        }
      } else if (event.key === key) {
        setStoredValue(event.newValue);
      }
    },
    [key]
  );

  useEffect(() => {
    window.addEventListener(
      LocalStorageChanged.eventName,
      onLocalStorageChange
    );
    window.addEventListener('storage', onLocalStorageChange);

    return () => {
      window.removeEventListener(
        LocalStorageChanged.eventName,
        onLocalStorageChange
      );
      window.removeEventListener('storage', onLocalStorageChange);
    };
  }, [onLocalStorageChange]);

  return [
    storedValue,
    value => writeLocalStorage(key, value),
    () => deleteLocalStorage(key)
  ];
}

export default useLocalStorage;
