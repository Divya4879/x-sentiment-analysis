import { NextResponse } from 'next/server'
import tweepy
import axios from 'axios'
import { TextBlob } from 'textblob'

const TWITTER_API_KEY = process.env.TWITTER_API_KEY
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET

const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY
const BRIGHT_DATA_ENDPOINT = 'https://api.brightdata.com/twitter/search'

const auth = tweepy.OAuthHandler(TWITTER_API_KEY, TWITTER_API_SECRET)
auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET)

const api = tweepy.API(auth)

async function getTweetsFromTweepy(query: string, count: number = 100) {
  const tweets = await api.search_tweets(q=query, count=count)
  return tweets
}

async function getTweetsFromBrightData(query: string, limit: number = 100) {
  const response = await axios.get(BRIGHT_DATA_ENDPOINT, {
    headers: {
      'Authorization': `Bearer ${BRIGHT_DATA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    params: {
      query: query,
      limit: limit
    }
  })
  return response.data
}

function analyzeSentiment(text: string) {
  const blob = new TextBlob(text)
  const sentiment = blob.sentiment.polarity

  if (sentiment > 0.1) {
    return 'positive'
  } else if (sentiment < -0.1) {
    return 'negative'
  } else {
    return 'neutral'
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const tweepyTweets = await getTweetsFromTweepy(query)
    const brightDataTweets = await getTweetsFromBrightData(query)

    const allTweets = [...tweepyTweets, ...brightDataTweets]

    const analyzedTweets = allTweets.map(tweet => ({
      text: tweet.text,
      sentiment: analyzeSentiment(tweet.text)
    }))

    return NextResponse.json(analyzedTweets)
  } catch (error) {
    console.error('Error fetching tweets:', error)
    return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 })
  }
}

