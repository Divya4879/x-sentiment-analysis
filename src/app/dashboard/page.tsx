'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SentimentChart from '../../components/SentimentChart'
import TweetList from '../../components/TweetList'

export default function Dashboard() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (query) {
      fetchData(query)
    }
  }, [query])

  const fetchData = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/analyze?query=${encodeURIComponent(searchQuery)}`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard: {query}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Sentiment Analysis</h2>
          <SentimentChart data={data} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Tweets</h2>
          <TweetList tweets={data} />
        </div>
      </div>
    </div>
  )
}

