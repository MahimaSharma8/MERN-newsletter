export default function Guess({ isGuessed, guess, word }) {
    return (
      <div className="mb-2 grid grid-cols-5 gap-2">
        {new Array(5).fill(0).map((_, i) => {
          const bgColor = !isGuessed
            ? 'bg-zinc-300'
            : guess[i] === word[i]
            ? 'bg-green-800'
            : word.includes(guess[i])
            ? 'bg-yellow-600'
            : 'bg-gray-600'
  
          return (
            <div
              className={`flex h-16 w-16 items-center justify-center border border-gray-400 font-bold uppercase text-black ${bgColor}`}>
              {guess[i]}
            </div>
          )
        })}
      </div>
    )
  }