import React, { PropsWithChildren } from "react";
import { Feedback } from "../types";

export const FeedbackContext = React.createContext<{
    feedbacks: Feedback[]
    loading: boolean
    deleteFeedback: (id: number) => void
    addFeedback: (feedback: Feedback) => void
    editFeedback: (feedback: Feedback) => void
    feedbackToBeEdited: Feedback | null
}>(
    {
        feedbacks: [],
        loading: false,
        deleteFeedback: () => null,
        addFeedback: () => null,
        editFeedback: () => null,
        feedbackToBeEdited: null
    }
)

export default function FeedbackProvider({ children }: PropsWithChildren) {
    const [feedbacks, setFeedbacks] = React.useState<Feedback[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    async function getFeedbacks() {
        try {
            setLoading(true)
            const res = await fetch("/api/feedback")
            if (!res.ok) {
                throw new Error('Failed to fetch feedbacks')
            }
            const data = await res.json()
            setFeedbacks(data)
        } catch (err) {
            console.error('Error fetching feedbacks:', err)
        } finally {
            setLoading(false)
        }
    }

    async function addFeedback(feedback: Feedback) {
        try {
            const res = await fetch(`/api/feedback`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            })
            if (!res.ok) {
                throw new Error('Failed to add feedback')
            }
            const data = await res.json()
            return data
        } catch (err) {
            console.error('Error adding feedback:', err)
            throw err
        }
    }

    async function deleteFeedback(id: number) {
        try {
            const res = await fetch(`/api/feedback/${id}`, { 
                method: 'DELETE' 
            })
            if (!res.ok) {
                throw new Error('Failed to delete feedback')
            }
            setFeedbacks(prev => prev.filter(f => f.id !== id))
        } catch (err) {
            console.error('Error deleting feedback:', err)
            throw err
        }
    }

    async function editFeedback(feedback: Feedback) {
        setFeedbackToBeEdited(currentFeedback => 
            currentFeedback?.id === feedback.id ? null : feedback
        )
    }

    async function updateFeedback(feedback: Feedback) {
        const res = await fetch(`/api/feedback/${feedback.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
        if (!res.ok) {
            throw new Error('Failed to update feedback')
        }
        const data = await res.json()
        return data
    }

    React.useEffect(() => {
        getFeedbacks()
    }, [])

    const [feedbackToBeEdited, setFeedbackToBeEdited] = React.useState<Feedback | null>(null)

    async function handleDelete(id: number) {
        await deleteFeedback(id)
        await getFeedbacks()
    }

    async function handleAdd(feedback: Feedback) {
        try {
            setLoading(true)
            const isEditing = feedbacks.some(f => f.id === feedback.id)
            
            if (isEditing) {
                const res = await updateFeedback(feedback)
                setFeedbacks(prev => 
                    prev.map(f => f.id === feedback.id ? res : f)
                )
            } else {
                const res = await addFeedback(feedback)
                setFeedbacks(prev => [...prev, res])
            }
            setFeedbackToBeEdited(null)
        } catch (err) {
            console.error('Error handling feedback:', err)
        } finally {
            setLoading(false)
        }
    }

    function handleEdit(feedback: Feedback) {
        editFeedback(feedback)
    }

    return <FeedbackContext.Provider value={
        {
            feedbacks: feedbacks,
            loading: loading,
            deleteFeedback: handleDelete,
            addFeedback: handleAdd,
            editFeedback: handleEdit,
            feedbackToBeEdited: feedbackToBeEdited
        }
    }>
        {children}
    </FeedbackContext.Provider>
}