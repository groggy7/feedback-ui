import { Feedback } from "../types";
import Card from "./Card";

type FeedbackItemProps = Feedback

export default function FeedbackItem({rating, text} : FeedbackItemProps) {
    return <div>
        <Card rating={rating}>
            {text}
        </Card>
    </div>
}