import React, { PropsWithChildren } from "react";
import { Feedback } from "../types";

export const FeedbackContext = React.createContext<{
    feedbacks: Feedback[]
    loading: boolean
    deleteFeedback: (id: number) => Promise<void>
    addFeedback: (feedback: Feedback) => Promise<void>
    editFeedback: (feedback: Feedback) => void
    feedbackToBeEdited: Feedback | null
}>({
    feedbacks: [],
    loading: false,
    deleteFeedback: async () => {},
    addFeedback: async () => {},
    editFeedback: () => {},
    feedbackToBeEdited: null
});

export default function FeedbackProvider({ children }: PropsWithChildren) {
    const [feedbacks, setFeedbacks] = React.useState<Feedback[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [feedbackToBeEdited, setFeedbackToBeEdited] = React.useState<Feedback | null>(null);

    async function getFeedbacks() {
        try {
            setLoading(true);
            const res = await fetch("/api/feedback");
            if (!res.ok) {
                throw new Error('Failed to fetch feedbacks');
            }
            const data = await res.json();
            setFeedbacks(data);
        } catch (err) {
            console.error('Error fetching feedbacks:', err);
        } finally {
            setLoading(false);
        }
    }

    async function addFeedback(feedback: Omit<Feedback, 'id'>) {
        try {
            setLoading(true);
            const res = await fetch('/api/feedback', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            });
            if (!res.ok) {
                throw new Error('Failed to add feedback');
            }
            const newFeedback = await res.json();
            setFeedbacks(prev => [...prev, newFeedback]);
            return newFeedback;
        } catch (err) {
            console.error('Error adding feedback:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function deleteFeedback(id: number) {
        try {
            setLoading(true);
            const res = await fetch(`/api/feedback/${id}`, { 
                method: 'DELETE' 
            });
            if (!res.ok) {
                throw new Error('Failed to delete feedback');
            }
            setFeedbacks(prev => prev.filter(f => f.id !== id));
        } catch (err) {
            console.error('Error deleting feedback:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function updateFeedback(feedback: Feedback) {
        try {
            setLoading(true);
            const res = await fetch(`/api/feedback/${feedback.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            });
            if (!res.ok) {
                throw new Error('Failed to update feedback');
            }
            const updatedFeedback = await res.json();
            setFeedbacks(prev => 
                prev.map(f => f.id === feedback.id ? updatedFeedback : f)
            );
            return updatedFeedback;
        } catch (err) {
            console.error('Error updating feedback:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    function editFeedback(feedback: Feedback) {
        setFeedbackToBeEdited(feedback);
    }

    async function handleAdd(feedback: Feedback) {
        try {
            if (feedback.id) {
                await updateFeedback(feedback);
            } else {
                const { id, ...feedbackWithoutId } = feedback;
                await addFeedback(feedbackWithoutId);
            }
            setFeedbackToBeEdited(null);
        } catch (err) {
            console.error('Error handling feedback:', err);
            throw err;
        }
    }

    React.useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <FeedbackContext.Provider 
            value={{
                feedbacks,
                loading,
                deleteFeedback,
                addFeedback: handleAdd,
                editFeedback,
                feedbackToBeEdited
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
}