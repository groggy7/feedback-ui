import FeedbackForm from "./components/FeedbackForm.tsx"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats.tsx"
import Header from "./components/Header"
import FeedbackData from "./feedback.ts"
import { Feedback } from "./types.ts"
import React from "react"

function App() {
  const [feedbacks, setFeedbacks] = React.useState<Feedback[]>(FeedbackData)

  function handleDelete(id: number) {
    const filteredFeedbacks =  feedbacks.filter(feedback => feedback.id !== id)
    setFeedbacks(filteredFeedbacks)
  }

  function addReview(feedback: Feedback) {
    setFeedbacks([feedback, ...feedbacks])
  } 

  return <div className="p-4 flex flex-col gap-2 max-w-[600px] mx-auto">
    <Header />
    <FeedbackForm addReview={addReview}/>
    <FeedbackStats feedbacks={feedbacks} />
    <div className="flex flex-col gap-6">
      <FeedbackList feedbacks={feedbacks} handleDelete={handleDelete} />
    </div>
  </div>
}

export default App
