import { Feedback } from "../types";
import Card from "./Card";

type FeedbackItemProps = {
    feedback: Feedback,
    handleDelete: (id: number) => void
}

export default function FeedbackItem({feedback, handleDelete} : FeedbackItemProps) {
    return <div>
        <Card rating={feedback.rating} onClick={() => handleDelete(feedback.id)}>
            {feedback.text}
        </Card>
    </div>
}