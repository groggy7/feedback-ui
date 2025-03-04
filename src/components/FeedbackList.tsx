import FeedbackItem from "./FeedbackItem"
import { FeedbackContext } from "../context/Feedback"
import { AnimatePresence, motion } from "framer-motion"
import loadingIcon from "../assets/loading.svg"
import React from "react"

export default function FeedbackList() {
    const {feedbacks, loading} = React.useContext(FeedbackContext)

    if(!feedbacks) {
        return <div className="bg-white p-2 rounded-lg text-center">no feedback item</div>
    }

    return <AnimatePresence>
        {
            loading 
                ? <div className="flex justify-center items-center">
                    <img src={loadingIcon} className="w-24" />
                </div> 
                : feedbacks.map(feedback => (
                <motion.div key={feedback.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                    <FeedbackItem key={feedback.id} feedback={feedback} />
                </motion.div>
            ))
        }
    </AnimatePresence>
}