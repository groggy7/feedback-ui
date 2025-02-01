import { Feedback } from "../types";
import Card from "./Card";
import { FeedbackContext } from "../context/Feedback";
import React from "react";

type FeedbackItemProps = {
    feedback: Feedback,
}

export default function FeedbackItem({feedback} : FeedbackItemProps) {
    const {deleteFeedback} = React.useContext(FeedbackContext)

    return <div>
        <Card rating={feedback.rating} onClick={() => deleteFeedback(feedback.id)}>
            {feedback.text}
        </Card>
    </div>
}