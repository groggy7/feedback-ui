import FeedbackItem from "./FeedbackItem"
import { Feedback } from "../types"

type FeedbackListProps = {
    feedbacks: Feedback[],
    handleDelete: (id: number) => void
}

export default function FeedbackList({feedbacks, handleDelete} : FeedbackListProps) {
    if(feedbacks.length === 0) {
        return <div className="bg-white p-2 rounded-lg text-center">no feedback item</div>
    }

    return feedbacks.map(feedback => (
        <FeedbackItem key={feedback.id} feedback={feedback} handleDelete={handleDelete} />
    ))
}