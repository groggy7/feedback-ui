import React from "react"
import { FeedbackContext } from "../context/Feedback"

export default function FeedbackStats() {
    const {feedbacks} = React.useContext(FeedbackContext)

    if (!feedbacks) {
        return <div className="flex justify-between py-2 text-white">
            <span>0 reviews</span>
            <span>average rating: 0</span>
        </div>
    }

    let average = feedbacks.reduce((acc, curr) =>  acc + curr.rating, 0) / feedbacks.length
    average = Number(average.toFixed(1))

    return <div className="flex justify-between py-2 text-white">
        <span>{feedbacks.length} reviews</span>
        <span>average rating: {average}</span>
    </div>
}