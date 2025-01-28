import { Feedback } from "../types"

type FeedbackStatsProps = {
    feedbacks: Feedback[]
}

export default function FeedbackStats({feedbacks}: FeedbackStatsProps) {
    if(feedbacks.length === 0) {
        return null
    }

    const sum = feedbacks.reduce((acc, curr) =>  acc + curr.rating, 0)
    const average = (sum / feedbacks.length).toFixed(1)

    return <div className="flex justify-between py-2 text-white">
        <span>{feedbacks.length} reviews</span>
        <span>average rating: {average}</span>
    </div>
}