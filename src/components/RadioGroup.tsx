interface NumberedRadioProps {
  numbers?: number[]
  onValueChange: (value: number) => void
  value: number
}

export default function RadioGroup({
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  onValueChange,
  value
}: NumberedRadioProps) {
  if (!numbers || numbers.length === 0) {
    return <div>No numbers provided</div>
  }

  function handleChange(newValue: number) {
    onValueChange(newValue)
  }
  
  return (
    <div className="flex flex-col gap-4 items-center py-2">
        <h2>How would you rate your service with us</h2>
        <div className="flex flex-wrap gap-2">
        {numbers.map((number) => (
            <div key={number}>
            <input
                type="radio"
                id={`radio-${number}`}
                name="radio-group"
                value={number}
                checked={value === number}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="sr-only peer"
            ></input>
            <label
                htmlFor={`radio-${number}`}
                className="bg-gray-200 text-black w-8 h-8 rounded-full flex justify-center items-center
                cursor-pointer peer-checked:bg-pink-500 peer-checked:text-gray-300"
            >{number}</label>
            </div>
        ))}
        </div>
      
    </div>
  )
}

