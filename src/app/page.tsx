import Link from 'next/link'
import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Twitter Sentiment Analysis</h1>
      <p className="text-xl mb-8 text-center">
        Analyze the sentiment of tweets on any topic using advanced AI techniques.
      </p>
      <SearchBar />
      <Link href="/dashboard" className="mt-8 px-4 py-2 bg-primary text-white rounded">
        Go to Dashboards
      </Link>
    </main>
  )
}

