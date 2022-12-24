import s from "../Player.module.css"

import download from "../../../../media/img/download.png"
import starActive from "../../../../media/img/starActive.png"
import starUnActive from "../../../../media/img/starUnActive.png"

import play from "../../../../media/img/play2.png"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import { selectMusicAC, togglePlaysrcAC, setSavedMusicAC, saveMusicAC } from "../../../../store/reducers/music_reducer";
import { useState } from "react"

export const MediaData = ({ m, audio, MusicSaved }) => {

   const clearSavedItems = () => {
      localStorage.setItem("Saved", "[]")
   }
   const dispatch = useDispatch();

   const playSrc = useSelector(state => state.music.playsrc)
   const selectedMusic = useSelector(state => state.music.selectedMusic)

   const [savedState, setSavedStata] = useState(false)

   useEffect(() => {
      audio.current.src = selectedMusic.src
   }, [selectedMusic.src])


   let playSong = () => {
      audio.current.play()
   }
   let pauseSong = () => {
      audio.current.pause()
   }

   const loadMusic = () => {
      dispatch(selectMusicAC({ ...m }))
      if (audio.current.paused || playSrc == play) {
         playSong()
         dispatch(togglePlaysrcAC("stop"))
      }
      else {
         pauseSong()
         dispatch(togglePlaysrcAC(play))
      }
   }
   const loadAnotherMusic = () => {
      dispatch(selectMusicAC({ ...m }))
      dispatch(togglePlaysrcAC(play))
   }

   document.onkeydown = (e) => {
      if (e.key == " ") {
         if (audio.current.paused || playSrc == play) {
            playSong()
            dispatch(togglePlaysrcAC("stop"))
         }
         else {
            pauseSong()
            dispatch(togglePlaysrcAC(play))
         }
      }
   }

   const MouseOver = () => {
      if (playSrc == play) {
         dispatch(selectMusicAC({ ...m }))
      }
   }

   // clearSavedItems()

   const toggleSaveItem = (m) => {
      setSavedStata(!savedState)

      if (!m.saved && !MusicSaved) {
         if (localStorage.getItem("Saved") == undefined || localStorage.getItem("Saved") == NaN || localStorage.getItem("Saved").length <= 0) {
            localStorage.setItem("Saved", "[]")
         }

         localStorage.setItem("Saved", JSON.stringify([
            ...JSON.parse(localStorage.getItem("Saved")),
            { ...m }
         ]))

         dispatch(setSavedMusicAC(JSON.parse(localStorage.getItem("Saved"))))
         dispatch(saveMusicAC(m.id))
      }
      else {
         localStorage.setItem("Saved", JSON.stringify([
            ...JSON.parse(localStorage.getItem("Saved")).filter(i => i.id != m.id)
         ]))

         dispatch(setSavedMusicAC(JSON.parse(localStorage.getItem("Saved"))))
         dispatch(saveMusicAC(m.id))
      }
   }

   return (
      <div className={s.mediadata}>
         <a href={m.src} download={true}><img className={s.button} src={download} alt="" /></a>
         {
            selectedMusic.id == m.id
               ? <img className={s.button} onClick={() => { loadMusic(m.id) }} src={playSrc} alt="" />
               : <img className={s.button} onMouseOver={() => { MouseOver(m.id) }} onClick={() => { loadAnotherMusic(m.id) }} src={play} alt="" />
         }

         <img
            className={s.button}
            src={
               m.saved || MusicSaved ? starActive : starUnActive
            }
            onClick={() => toggleSaveItem(m)}
            alt=""
         />


      </div>
   )
}