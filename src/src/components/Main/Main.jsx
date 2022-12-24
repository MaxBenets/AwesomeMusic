import s from "./Main.module.css"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"

import { togglePlaysrcAC, saveMusicAC, setSavedMusicAC } from "../../store/reducers/music_reducer"
import play from "../../media/img/play2.png"

import { Youtube } from "./Youtube/Youtube"
import { Player } from "./Player/Player"

export const Main = ({ audio, setPopupVisibility, setPopupText }) => {
   const dispatch = useDispatch();
   const location = useLocation();

   const sounds = useSelector(state => state.music.musicList)
   const savedMusic = useSelector(state => state.music.savedMusic)

   const [pageName, setPageName] = useState("Default Music")
   const [aboutText, setAboutText] = useState("")

   if (localStorage.getItem("Saved") == null) {
      localStorage.setItem("Saved", "[]")
   }

   useEffect(() => {
      dispatch(togglePlaysrcAC(play))
      if (localStorage.getItem("Saved") != null)
         JSON.parse(localStorage.getItem("Saved")).map(i => {
            sounds.map(i2 => {
               if (i.id == i2.id) {
                  dispatch(saveMusicAC(i2.id))
                  dispatch(setSavedMusicAC(JSON.parse(localStorage.getItem("Saved"))))
               }
            })
         })
   }, [])

   useEffect(() => {

      if (location.pathname == "/youtube") {
         setPageName("Youtube mp3")
         setAboutText("Add music from YouTube and create your own playlist")
      }
      else if (location.pathname == "/defaultmusic") {
         setPageName("Default Music")
         setAboutText("Listen to the music added to the site by default")
      }
      else if (location.pathname == "/saved") {
         setPageName("Saved Music")
         setAboutText("This is where the music you've saved is located")

         if (JSON.parse(localStorage.getItem("Saved")).length != 0 && localStorage.getItem("FirstOnSaved") != "false") {
            setPopupVisibility(true)
            localStorage.setItem("FirstOnSaved", true)
            setPopupText({
               header: "Підказка",
               text: "Якщо ви нажмете 2 рази на ім'я збереженої пісні з youtube, то ви зможете поміняти його на те, що вам підходить"
            })
         }
      }

   }, [location.pathname])

   const mapSounds = sounds.map(m => {

      if (location.pathname == "/defaultmusic" && m.standartMusic) {
         return <Player m={m} audio={audio} key={m.id} />
      }
      else if (location.pathname == "/youtube" && !m.standartMusic) {
         return <Player m={m} audio={audio} key={m.id} />
      }
   })

   return (
      <main className={"main"}>
         <h1 className={"h1"}>{pageName}</h1>
         <p className={"about"}>{aboutText}</p>
         <div className={s.sounds}>
            {
               location.pathname != "/saved"
                  ? mapSounds
                  : savedMusic.map(saved => {
                     return <Player m={saved} MusicSaved={true} audio={audio} key={saved.id} />
                  })
            }
         </div>

         {
            location.pathname == "/youtube"
            && <Youtube
               dispatch={dispatch}
               musicList={sounds}
            />
         }
      </main>
   )
}