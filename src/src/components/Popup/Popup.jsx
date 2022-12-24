import s from "./Popup.module.css"

export const Popup = ({ Func, text, header = "Підказка", buttonText = "Зрозуміло", localStorageOff }) => {
   const okClick = () => {
      Func(false)
      localStorageOff()
   }

   return (
      <div className={s.popup}>
         <h2 className={s.header}>{header}</h2>
         <p className={s.text}>{text}</p>

         <div className={s.buttons}>
            <button onClick={okClick} className={s.ok}>{buttonText}</button>
         </div>
      </div>
   )
}