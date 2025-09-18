import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import AddBook from "./pages/AddBook"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <Toaster toastOptions={{
        ariaProps: {
          role: "alert",
          "aria-live": "assertive"
        }
      }} />
      <main id="main-content" aria-label="Main Content">
        <Routes>
          <Route path="/" element={<Dashboard aria-label="Dashboard Page" />} />
          <Route path="/add-book" element={<AddBook aria-label="Add Book Page" />} />
        </Routes>
      </main>
    </>
  )
}

export default App
