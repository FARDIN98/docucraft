'use client' // Error components must be Client Components

import { useEffect } from 'react'

/**
 * Error Boundary Component for Next.js application
 * Displays error messages and provides a retry mechanism
 * 
 * @param {Object} props
 * @param {Error} props.error - The error object that was thrown
 * @param {Function} props.reset - Function to reset the error boundary and retry rendering
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* Display error message if available */}
      <h2>{error?.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}