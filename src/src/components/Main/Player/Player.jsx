import s from "./Player.module.css"

import { TextData } from "./TextData/TextData"
import { MediaData } from "./MediaData/MediaData"

export const Player = ({ m, audio, MusicSaved }) => {
   return (
      <div className={s.sound} key={m.id}>
         <TextData m={m} MusicSaved={MusicSaved} />
         <MediaData m={m} audio={audio} MusicSaved={MusicSaved} />
      </div>
   )
}