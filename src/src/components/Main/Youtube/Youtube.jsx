import s from "./Youtube.module.css"

import { useState } from "react"
import { addItemMusicThunk } from "../../../store/reducers/music_reducer"
import { useSelector } from "react-redux"

export const Youtube = ({dispatch, musicList}) => {

   const [url, setUrl] = useState("")

   const loading = useSelector(state => state.music.loading)

   const addItem = () => {
      dispatch(addItemMusicThunk(
         url.replace("https://youtu.be/", ""),
         musicList.length + 1
      ))
      setUrl("")
   }

   return(
      <div className={s.form}>
         <input type="text" className={s.input} value = {url} onChange = {(e) => {setUrl(e.target.value)}} placeholder = "Video link" /> 
         <button className={s.buttonAdd} onClick = {addItem}>
            {
               loading
                  ? "Loading..."
                  : "Add"
            }
         </button>
      </div>
   )
}