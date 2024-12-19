interface Tweet {
    text: string
    sentiment: string
  }
  
  interface TweetListProps {
    tweets: Tweet[]
  }
  
  export default function TweetList({ tweets }: TweetListProps) {
    const sortedTweets = [...tweets].sort((a, b) => {
      const sentimentOrder = { positive: 2, neutral: 1, negative: 0 }
      return sentimentOrder[b.sentiment as keyof typeof sentimentOrder] - sentimentOrder[a.sentiment as keyof typeof sentimentOrder]
    })
  
    const mostPositive = sortedTweets.find(tweet => tweet.sentiment === 'positive')
    const mostNegative = sortedTweets.reverse().find(tweet => tweet.sentiment === 'negative')
  
    return (
      <div className="space-y-8">
        {mostPositive && (
          <div className="p-4 bg-green-900 rounded">
            <h3 className="text-xl font-bold mb-2">Most Positive Tweet</h3>
            <p>{mostPositive.text}</p>
          </div>
        )}
        {mostNegative && (
          <div className="p-4 bg-red-900 rounded">
            <h3 className="text-xl font-bold mb-2">Most Negative Tweet</h3>
            <p>{mostNegative.text}</p>
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold mb-2">All Tweets</h3>
          <ul className="space-y-4">
            {tweets.map((tweet, index) => (
              <li key={index} className="p-4 bg-secondary rounded">
                <p>{tweet.text}</p>
                <span className={`mt-2 inline-block px-2 py-1 rounded ${
                  tweet.sentiment === 'positive' ? 'bg-green-500' :
                  tweet.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                }`}>
                  {tweet.sentiment}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  
  