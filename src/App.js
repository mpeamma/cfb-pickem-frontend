import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import SchedulePage from "./pages/SchedulePage";
import Header from "./components/Header";
import GameSetPage from "./pages/GameSet";
import MyGroupsPage from "./pages/MyGroupsPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-groups" element={<MyGroupsPage />} />
        <Route path="/schedule/:year/:week" element={<SchedulePage />} />
        <Route path="/gameset/:groupId/:year/:week" element={<GameSetPage />} />
      </Routes>
    </div>
  );
}

export default App;