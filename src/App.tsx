import FeedbackList from "./components/FeedbackList"
import Header from "./components/Header"
import FeedbackData from "./feedback.ts"
import { Feedback } from "./types.ts"
import React from "react"

function App() {
  const [feedbacks, setFeedbacks] = React.useState<Feedback[]>(FeedbackData)

  return <div className="p-4 flex flex-col gap-2">
    <Header />
    <div className="flex flex-col gap-6">
      <FeedbackList feedbacks={feedbacks} />
    </div>
  </div>
}

export default App
