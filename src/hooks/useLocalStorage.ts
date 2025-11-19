import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // localStorage에서 초기값 가져오기
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = storage.get<T>(key);
        return item ?? initialValue;
    });

    // 값이 변경될 때마다 localStorage에 저장
    useEffect(() => {
        storage.set(key, storedValue);
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}