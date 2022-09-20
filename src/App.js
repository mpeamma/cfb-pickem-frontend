import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import SchedulePage from "./pages/SchedulePage";
import Header from "./components/Header";
import GameSetPage from "./pages/GameSet";
import MyGroupsPage from "./pages/MyGroupsPage";
import GroupPage from "./pages/GroupPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-groups" element={<MyGroupsPage />} />
        <Route path="/schedule/:year/:week" element={<SchedulePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/gameset/:groupId/:year/:week/edit" element={<SchedulePage />} />
        <Route path="/gameset/:groupId/:year/:week" element={<GameSetPage />} />
        <Route path="/group/:groupId" element={<GroupPage />}/>
      </Routes>
    </div>
  );
}

export default App;