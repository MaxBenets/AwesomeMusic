import s from "./Navbar.module.css"

import play from "../../media/img/play2.png"
import stop from "../../media/img/stop2.png"
import { NavLink, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { togglePlaysrcAC } from "../../store/reducers/music_reducer"


export const Navbar = ({ audio }) => {
   const dispatch = useDispatch()
   const location = useLocation()

   let playSrc = useSelector(state => state.music.playsrc)
   const selectedMusic = useSelector(state => state.music.selectedMusic)

   const setPlaySrc = (src) => {
      dispatch(togglePlaysrcAC(src))
   }

   const playMusic = () => {
      audio.src = selectedMusic.src
      if (playSrc == play) {
         setPlaySrc(stop)
         audio.current.play()
      }
      else {
         setPlaySrc(play)
         audio.current.pause()
      }
   }


   return (
      <nav className={s.nav}>
         <div className={s.userblock}>
            <div>
               <h2 className={s.h2}>
                  <a href="/">AWESOME MUSIC</a>
               </h2>
            </div>
            <div className={s.line}></div>
         </div>
         <menu className={s.menu}>
            <div className={s.item}>
               <NavLink to="defaultmusic" className={s.link}>DEFAULT MUSIC</NavLink>
            </div>
            <div className={s.item}>
               <NavLink to="youtube" className={s.link}>YOUTUBE</NavLink>
            </div>
            <div className={s.item}>
               <NavLink to="saved" className={s.link}>SAVED</NavLink>
            </div>
         </menu>
         <div className={s.playarea}>
            <p className={s.name}>{selectedMusic.name}</p>
            <div className={s.play}>
               <img onClick={playMusic} src={playSrc} alt="" />
            </div>
         </div>
      </nav>
   )
}