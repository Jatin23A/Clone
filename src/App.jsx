import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Category from "./pages/Category";
import Search from "./pages/Search";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />

      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/category" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;