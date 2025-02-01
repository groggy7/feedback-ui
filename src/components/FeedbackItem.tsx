import { Feedback } from "../types";
import Card from "./Card";
import { FeedbackContext } from "../context/Feedback";
import React from "react";

type FeedbackItemProps = {
    feedback: Feedback,
}

export default function FeedbackItem({feedback} : FeedbackItemProps) {
    const {deleteFeedback, editFeedback} = React.useContext(FeedbackContext)

    return <div>
        <Card 
            rating={feedback.rating}
            handleDelete={() => deleteFeedback(feedback.id)}
            handleEdit={() => editFeedback(feedback)}
        >
            {feedback.text}
        </Card>
    </div>
}