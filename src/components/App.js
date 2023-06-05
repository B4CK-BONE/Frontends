import React, { useRef } from "react";
import "./App.css";
import Auth from "../hoc/auth";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
import MyParking from "./views/LandingPage/MyParking";
import Footer from "./views/Footer/Footer";
import ListPage from "./views/ListPage/ListPage";
import QrPage from "./views/QrPage/QrPage";
import RoomJoinPage from "./views/RoomJoinPage/RoomJoinPage";
import RoomStart from "./views/RoomStartPage/RoomStart";
import SettingPage from "./views/SettingPage/SettingPage";
import DragDropPage from "./views/DragDropPage/DragDropPage";
import DragDropPage2 from "./views/DragDropPage2/DragDropPage2";
import StartPage from "./views/StartPage/StartPage";
import InputNamePage from "./views/InputNamePage/InputNamePage";


function App() {
  const url = document.URL;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const wrapRef = useRef(null);

  const NewMyParking = Auth(MyParking, true);
  const NewListPage = Auth(ListPage, true);
  const NewQrPage = Auth(QrPage, true);
  const NewRoomJoinPage = Auth(RoomJoinPage, false);
  const NewSettingPage = Auth(SettingPage, true);
  const NewRoomStart = Auth(RoomStart, false);
const NewInputName = Auth(InputNamePage, false);

  const movePage = (url) => {
    if (pathname !== `/${url}`) {
      wrapRef.current.classList.replace("loaded", "unloaded");
      setTimeout(() => {
        navigate(url);
        wrapRef.current.classList.replace("unloaded", "loaded");
      }, 390);
    }
  };

  if (url.includes("roomstart") || url.includes("test") || url.includes("inputname") ||  url.includes("roomjoin")) {
    return (
      <div>
        <div
          className="wrap loaded"
          style={{ minHeight: "calc(100vh - 80px)", paddingTop: "50px" }}
        >
          <Routes>
            <Route path="/roomstart" element={<NewRoomStart ref={wrapRef} />} />
           <Route path="/inputname" element={<NewInputName ref={wrapRef} />} />
			  <Route path="/roomjoin" element={<NewRoomJoinPage ref={wrapRef} />} />
			   <Route path="/test" element={<DragDropPage2 />} />
          </Routes>
        </div>
      </div>
    );
  }
  return (
    <div>
      <NavBar movePage={movePage} />
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          backgroundColor: "#f5f6f8",
          paddingTop: "50px",
        }}
      >
        <Routes>
          <Route path="/" element={<NewMyParking ref={wrapRef} />} />
          <Route path="/list" element={<NewListPage ref={wrapRef} />} />
          <Route path="/qrcode" element={<NewQrPage ref={wrapRef} />} />
          

          <Route path="/setting" element={<NewSettingPage ref={wrapRef} />} />

         
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
