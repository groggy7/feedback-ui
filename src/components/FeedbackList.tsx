import FeedbackItem from "./FeedbackItem"
import { Feedback } from "../types"

type FeedbackListProps = {
    feedbacks: Feedback[]
}

export default function FeedbackList({feedbacks} : FeedbackListProps) {
    return feedbacks.map(feedback => (
        <FeedbackItem rating={feedback.rating} text={feedback.text} />
    ))
}