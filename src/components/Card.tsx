import { X } from "lucide-react"
import { Pencil } from "lucide-react"

type CardProps = {
    rating: number
    children: React.ReactNode
    handleDelete: () => void
    handleEdit: () => void
}

export default function Card({rating, children, handleDelete, handleEdit} : CardProps) {
    return <div className="bg-white px-6 py-6 rounded-lg relative">
        <div 
            className="absolute text-white bg-amber-600 w-8 h-8 text-sm flex
            justify-center items-center rounded-full -left-3 -top-3"
        >
            {rating}
        </div>
        <button 
            className="absolute top-1 right-8 cursor-pointer text-red-500 hover:text-green-500"
            onClick={handleEdit}
        >
            <Pencil size={15} />
        </button>
        <button
            className="absolute top-1 right-2 cursor-pointer hover:text-red-500"
            onClick={handleDelete}
        >
            <X size={16}></X>
        </button>
        <div>{children}</div>
    </div>
}