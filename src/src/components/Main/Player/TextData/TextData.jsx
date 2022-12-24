import { useState } from "react"
import s from "../Player.module.css"

export const TextData = ({ m, MusicSaved }) => {
   const [isInput, setIsInput] = useState(false)
   const [inputText, setInputText] = useState(m.name)

   const changeAnotherName = () => {
      if (m.type != undefined) {
         setIsInput(!isInput)
      }
   }
   const changeInput = (value) => {
      setInputText(value)
   }

   document.onkeydown = (e) => {
      if (e.key == "Enter" && isInput && inputText.length > 0) {
         setIsInput(false)
         localStorage.setItem("Saved", JSON.stringify(
            JSON.parse(localStorage.getItem("Saved")).map(i => {
               if (i.id == m.id) {
                  return {
                     ...m,
                     name: inputText
                  }
               } return i
            })
         ))
      }
   }

   return (
      <div className={s.textdata}>
         {
            isInput
               ? <input type="text" value={inputText} onChange={(e) => changeInput(e.target.value)} />
               : <p className={s.name} onDoubleClick={MusicSaved ? changeAnotherName : () => { }}>{inputText}</p>
         }
         <p className={s.about}>{m.about}</p>
      </div>
   )
}