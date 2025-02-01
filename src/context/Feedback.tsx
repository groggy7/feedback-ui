import React, { PropsWithChildren } from "react";
import { Feedback } from "../types";

type FeedbackContextType = {
    feedbacks: Feedback[] | null
    deleteFeedback: (id: number) => void
    addFeedback: (feedback: Feedback) => void
    editFeedback: (feedback: Feedback) => void
    feedbackToBeEdited: Feedback | null
}

export const FeedbackContext = React.createContext<FeedbackContextType>(
    {
        feedbacks: null,
        deleteFeedback: () => null,
        addFeedback: () => null,
        editFeedback: () => null,
        feedbackToBeEdited: null
    }
)

export default function FeedbackProvider({ children }: PropsWithChildren) {
    const [feedbacks, setFeedbacks] = React.useState<Feedback[] | null>([
        {
            id: 1,
            rating: 10,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 2,
            rating: 9,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 3,
            rating: 8,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
    ])

    const [feedbackToBeEdited, setFeedbackToBeEdited] = React.useState<Feedback | null>(null)

    function handleDelete(id: number) {
        if (feedbacks) {
            const filteredFeedbacks = feedbacks.filter(feedback => feedback.id !== id)
            setFeedbacks(filteredFeedbacks)
        }
    }

    function handleAdd(feedback: Feedback) {
        setFeedbacks(prev => {
            if(!prev) {
                return [feedback]
            }

            const isEditing = prev.some(f => f.id === feedback.id)
            return isEditing 
                ? prev.map(f => f.id === feedback.id ? feedback : f)
                : [feedback, ...prev]
        })
    }

    function handleEdit(feedback: Feedback) {
        setFeedbackToBeEdited(currentFeedback => 
            currentFeedback?.id === feedback.id ? null : feedback
        )
    }

    return <FeedbackContext.Provider value={
        {
            feedbacks: feedbacks,
            deleteFeedback: handleDelete,
            addFeedback: handleAdd,
            editFeedback: handleEdit,
            feedbackToBeEdited: feedbackToBeEdited
        }
    }>
        {children}
    </FeedbackContext.Provider>
}