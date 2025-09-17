import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import AddBook from "./pages/AddBook"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </>
  )
}

export default App
