import './App.css';

import { Navbar } from "./components/Navbar/Navbar"
import { Main } from "./components/Main/Main"
import { Popup } from './components/Popup/Popup';

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const audio = useRef();

  const [popupVisibility, setPopupVisibility] = useState(false)
  const [popupText, setPopupText] = useState({
    header: "Привіт, вітаю тебе в Avesome music!",
    text: "Сайт націлений на вільне прослуховування, додавання власної музики прямо з бібліотеки youtube!"
  })

  if (localStorage.getItem("FirstOnSaved") == null) {
    localStorage.setItem("FirstOnSaved", true)
    setPopupText({
      header: "Підказка",
      text: "Якщо ви нажмете 2 рази на ім'я збереженої пісні, то ви зможете поміняти його на те, що вам підходить"
    })
  }
  if (localStorage.getItem("FirstOnWebsite") == null) {
    localStorage.setItem("FirstOnWebsite", true)
    setPopupText({
      header: "Привіт, вітаю тебе в Avesome music!",
      text: "Сайт націлений на вільне прослуховування, додавання власної музики прямо з бібліотеки youtube!"
    })
  }

  useEffect(() => {
    if (location.pathname.length <= 1) {
      navigate("/defaultmusic")
    }
    if (localStorage.getItem("FirstOnWebsite") == "true") {
      setPopupVisibility(true)
    }
  }, [])

  return (
    <>
      {
        popupVisibility && localStorage.getItem("FirstOnSaved") == "true"
          ? <Popup
            Func={setPopupVisibility}
            localStorageOff={() => { localStorage.setItem("FirstOnSaved", false) }}

            text={popupText.text}
            header={popupText.header}
          />
          : ""
      }
      {
        popupVisibility && localStorage.getItem("FirstOnWebsite") == "true"
          ? <Popup
            Func={setPopupVisibility}
            localStorageOff={() => { localStorage.setItem("FirstOnWebsite", false) }}

            text={popupText.text}
            header={popupText.header}
          />
          : ""
      }
      <div className="App">
        <audio src="" ref={audio}></audio>
        <Navbar audio={audio} />
        <Routes>
          <Route path="/defaultmusic" element={<Main setPopupVisibility={setPopupVisibility} setPopupText={setPopupText} audio={audio} />} />
          <Route path="/saved" element={<Main setPopupText={setPopupText} setPopupVisibility={setPopupVisibility} audio={audio} />} />
          <Route path="/youtube" element={<Main setPopupText={setPopupText} setPopupVisibility={setPopupVisibility} audio={audio} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
