import { Feedback } from "../types"

type FeedbackStatsProps = {
    feedbacks: Feedback[]
}

export default function FeedbackStats({feedbacks}: FeedbackStatsProps) {
    let average = feedbacks.reduce((acc, curr) =>  acc + curr.rating, 0) / feedbacks.length
    average = Number(average.toFixed(1))

    return <div className="flex justify-between py-2 text-white">
        <span>{feedbacks.length} reviews</span>
        <span>average rating: {isNaN(average) ? 0 : average}</span>
    </div>
}