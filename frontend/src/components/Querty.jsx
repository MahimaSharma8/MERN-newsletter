import { observer } from 'mobx-react-lite'

export default observer(function Querty({ store }) {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  return (
    <div>
      {qwerty.map((row) => (
        <div className="flex justify-center">
          {row.split('').map((char) => {
            const bgColor = store.exactGuesses.includes(char)
              ? 'bg-green-800'
              : store.inexactGuesses.includes(char)
              ? 'bg-yellow-600'
              : store.allGuesses.includes(char)
              ? 'bg-gray-600'
              : 'bg-black'
            return (
              <div
                className={`rounded-m m-px flex h-10 w-10 items-center justify-center uppercase ${bgColor}`}
              >
                {char}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
})