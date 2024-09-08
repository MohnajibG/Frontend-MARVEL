import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// Components:
import Header from "./components/Header";

// Pages:
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/comicsCharacter";
function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters search={search} />} />
        <Route path="/comics" element={<Comics search={search} />} />
        <Route path="/comics/:characterId" element={<Character />} />
      </Routes>
    </Router>
  );
}

export default App;
