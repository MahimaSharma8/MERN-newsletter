import {observer, useLocalObservable} from "mobx-react-lite"
import Guess from "./Guess"
import Querty from "./Querty"
import PuzzleStore from "../../store/PuzzleStore"
import { useEffect } from "react";
const Wordle = observer(function Wordle() {
    const store = useLocalObservable(() => PuzzleStore);
    useEffect (() =>
    {
        store.init()
        window.addEventListener("keyup",store.handleKeyup)
        return () =>
        {
            window.removeEventListener("keyup",store.handleKeyup)
        }
    },[]
    )
    return (
      <div className="flex flex-col w-auto h-auto items-center justify-center">
        <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-vine to-red-800">Wordle OF the Day</h1>
        {store.guesses.map((_, i) => (
          <Guess key={i} word={store.word} guess={store.guesses[i]} isGuessed={i< store.currentGuess}/>
        ))}
        {store.won && <h1 className=" text-black">You won!</h1>}
        {store.lost && <h1 className=" text-black" >You lost!</h1>}
        <Querty store={store} />
      </div>
    );
  });
  
  export default Wordle;