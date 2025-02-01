import FeedbackForm from "./components/FeedbackForm.tsx"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats.tsx"
import Header from "./components/Header"
import FeedbackProvider from "./context/Feedback.tsx"

function App() {
  return <div className="p-4 flex flex-col gap-2 max-w-[600px] mx-auto">
    <FeedbackProvider>
      <Header />
      <FeedbackForm/>
      <FeedbackStats />
      <div className="flex flex-col gap-6">
        <FeedbackList />
      </div>
    </FeedbackProvider>
  </div>
}

export default App
