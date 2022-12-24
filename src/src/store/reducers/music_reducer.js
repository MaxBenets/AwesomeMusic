import bit1 from "../../media/mp3/bit1.mp3"
import bit2 from "../../media/mp3/bit2.mp3"
import comedy from "../../media/mp3/comedy.mp3"

import play from "../../media/img/play2.png"
import stop from "../../media/img/stop2.png"

import { getMp3 } from "../../api/api"

const SELECT_MUSIC = "SELECT_MUSIC"
const SET_MUSICLIST = "SET_MUSICLIST"
const TOGGLE_PLAYSRC = "TOGGLE_PLAYSRC"
const ADD_ITEM_MUSICLIST = "ADD_ITEM_MUSICLIST"
const TOGGLE_LOADER = "TOGGLE_LOADER"
const SET_SAVED_MUSIC = "SET_SAVED_MUSIC"
const SAVE_MUSIC = "SAVE_MUSIC"


let initial_state = {
   musicList: [
      { id: 0, name: "KICK BACK", about: "Author: Kenshi Yonezu", src: bit1, standartMusic: true, saved: false },
      { id: 1, name: "THE RUBMLING", about: "Author: SIM", src: bit2, standartMusic: true, saved: false },
      { id: 2, name: "COMEDY", about: "Author: Gen Hoshino", src: comedy, standartMusic: true, saved: false },
   ],
   savedMusic: [],
   selectedMusic: { MusicNotSelected: true },
   playsrc: play,
   loading: false,
}

export const musicReducer = (state = initial_state, action) => {

   switch (action.type) {
      case SELECT_MUSIC:
         return {
            ...state,
            selectedMusic: action.data
         }
      case TOGGLE_LOADER:
         return {
            ...state,
            loading: !state.loading
         }
      case SET_MUSICLIST:
         return {
            ...state,
            musicList: action.value
         }
      case ADD_ITEM_MUSICLIST:
         return {
            ...state,
            musicList: [...state.musicList, action.item]
         }
      case TOGGLE_PLAYSRC:
         return {
            ...state,
            playsrc: action.playsrc == play ? play : stop
         }
      case SET_SAVED_MUSIC:
         return {
            ...state,
            savedMusic: action.value,
         }
      case SAVE_MUSIC:
         return {
            ...state,
            musicList: state.musicList.map(i => {
               if (i.id == action.id) {
                  return {
                     ...i,
                     saved: !i.saved
                  }
               } return i
            })
         }
      default: return state
   }
}

export const selectMusicAC = (data) => ({
   type: SELECT_MUSIC, data
})
export const togglePlaysrcAC = (playsrc) => ({
   type: TOGGLE_PLAYSRC, playsrc
})
export const setMusicListAC = (value) => ({
   type: SET_MUSICLIST, value
})
export const addItemMusicListAC = (item) => ({
   type: ADD_ITEM_MUSICLIST, item
})
export const toggleLoadingAC = () => ({
   type: TOGGLE_LOADER
})
export const setSavedMusicAC = (value) => ({
   type: SET_SAVED_MUSIC, value
})
export const saveMusicAC = (id) => ({
   type: SAVE_MUSIC, id
})
export const addItemMusicThunk = (videoId, id) => (dispatch) => {
   dispatch(toggleLoadingAC()) // true
   return getMp3(videoId)
      .then(res => {
         dispatch(toggleLoadingAC()) // false
         return dispatch(addItemMusicListAC({
            id,
            about: "Video ID: " + videoId,
            name: res.title,
            src: res.link,
            type: "mp3",
            standartMusic: false,
            saved: false,
         }))
      })
}