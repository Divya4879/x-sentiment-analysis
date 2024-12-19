'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/dashboard?query=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter keywords to analyze"
        className="w-full p-2 text-black rounded-l"
      />
      <button type="submit" className="px-4 py-2 bg-primary text-white rounded-r">
        Analyze
      </button>
    </form>
  )
}

