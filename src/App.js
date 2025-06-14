import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import CifraViewer from "./components/js/CifraViewer"
import CifraViewer2 from "./components/js/CifraViewer2"
import Header from "./components/js/Header"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/cifraviewer" element={<CifraViewer />} />
          <Route path="/cifraviewer2" element={<CifraViewer2 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
