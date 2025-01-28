import { X } from "lucide-react"

type CardProps = {
    rating: number
    children: React.ReactNode
}

export default function Card({rating, children} : CardProps) {
    return <div className="bg-white px-6 py-6 rounded-lg relative">
        <div className="absolute bg-amber-600 w-10 h-10 flex justify-center items-center rounded-full -left-3 -top-3">{rating}</div>
        <X className="absolute top-1 right-2 cursor-pointer hover:text-red-500" size={16}></X>
        <div>{children}</div>
    </div>
}