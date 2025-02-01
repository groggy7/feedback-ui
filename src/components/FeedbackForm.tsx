import { useState } from "react"
import { Feedback } from "../types"
import RadioGroup from "./RadioGroup"
import { FeedbackContext } from "../context/Feedback"
import React from "react"

export default function FeedbackForm() {
    const {addFeedback} = React.useContext(FeedbackContext)

    const [feedbackRating, setFeedbackRating] = useState<number>(0)

    function handleAction(formData: FormData) {
        const text = String(formData.get("comment")).trim()
        
        if (!text) {
            console.error("Please enter a review text")
            return
        }
        
        if (feedbackRating === 0) {
            console.error("Please select a rating")
            return
        }

        const newFeedback: Feedback = {
            id: Math.floor(Math.random() * 100000),
            rating: feedbackRating,
            text: text
        }

        addFeedback(newFeedback)
        setFeedbackRating(0)
    }

    function handleChange(value: number) {
        setFeedbackRating(value)
    }

    return (
        <form action={handleAction}
            className="text-white bg-black rounded-lg p-4 flex flex-col gap-2 items-center"
        >
            <RadioGroup onValueChange={handleChange} />
            <label htmlFor="comment">Type your review</label>
            <div className="relative w-full">
                <input 
                    id="comment"
                    name="comment"
                    className="bg-white w-full rounded text-black px-2 py-2 outline-0"
                    placeholder="Write a review"
                />
                <button 
                    className="bg-gray-300 text-black rounded-lg px-2 py-1 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                >
                    Send
                </button>
            </div>
        </form>
    )
}