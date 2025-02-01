import React, { PropsWithChildren } from "react";
import { Feedback } from "../types";

type FeedbackContextType = {
    feedbacks: Feedback[] | null | undefined
    deleteFeedback: (id: number) => void
    addFeedback: (feedback: Feedback) => void
}

export const FeedbackContext = React.createContext<FeedbackContextType>(
    {
        feedbacks: null,
        deleteFeedback: () => null,
        addFeedback: () => null
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


    function handleDelete(id: number) {
        if (feedbacks) {
            const filteredFeedbacks = feedbacks.filter(feedback => feedback.id !== id)
            setFeedbacks(filteredFeedbacks)
        }
    }

    function handleAdd(feedback: Feedback) {
        setFeedbacks((prevFeedbacks) => [feedback, ...(prevFeedbacks || [])])
    } 

    return <FeedbackContext.Provider value={{feedbacks: feedbacks, deleteFeedback: handleDelete, addFeedback: handleAdd}}>
        {children}
    </FeedbackContext.Provider>
}