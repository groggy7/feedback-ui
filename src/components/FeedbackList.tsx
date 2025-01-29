import FeedbackItem from "./FeedbackItem"
import { Feedback } from "../types"
import { AnimatePresence, motion } from "framer-motion"

type FeedbackListProps = {
    feedbacks: Feedback[],
    handleDelete: (id: number) => void
}

export default function FeedbackList({feedbacks, handleDelete} : FeedbackListProps) {
    if(feedbacks.length === 0) {
        return <div className="bg-white p-2 rounded-lg text-center">no feedback item</div>
    }

    return <AnimatePresence>
        {
            feedbacks.map(feedback => (
                <motion.div key={feedback.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                    <FeedbackItem key={feedback.id} feedback={feedback} handleDelete={handleDelete} />
                </motion.div>
            ))
        }
    </AnimatePresence>
}