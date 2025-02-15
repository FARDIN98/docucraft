import { useEffect, useRef } from "react";

/**
 * Custom hook for debouncing function calls
 * @param {Function} callback - The function to be debounced
 * @param {number} delay - The delay in milliseconds before the callback is executed
 * @returns {Function} - The debounced version of the callback function
 * 
 * Example usage:
 * const debouncedSearch = useDebounce((query) => {
 *   // Search logic here
 * }, 300);
 */
export const useDebounce = (callback, delay) => {
    // Store timeout ID in a ref to persist between renders
    const timeoutIdRef = useRef(null);

    // Cleanup function to clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, []);

    // Create debounced version of the callback
    const debouncedCallback = (...args) => {
        // Clear existing timeout if any
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        // Set new timeout
        timeoutIdRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };
    return debouncedCallback;
};