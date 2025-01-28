type CardProps = {
    rating: number
    comment: string
}

export default function Card({rating, comment} : CardProps) {
    return <div className="bg-white px-6 py-6 rounded-lg relative">
        <div className="absolute bg-amber-600 w-10 h-10 flex justify-center items-center rounded-full -left-3 -top-3">{rating}</div>
        <div>{comment}</div>
    </div>
}