import {Routes,Route} from "react-router-dom"
import Home from "./Components/Home/Home"
import BookDetails from "./Components/BookDetails/BookDetails"
import AddBook from "./Components/AddBook/AddBook"
import Contact from "./Components/Contact/Contact"
import About from "./Components/About/About"

function App(params) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:id" element = {
        <BookDetails/>
      }/>
      <Route path="/contact" element = {
        <Contact/>
      }/>
      <Route path="/about" element = {
        <About/>
      }/>
      <Route path="/addBook" element = {
        <AddBook/>
      }/>
    </Routes>
  )
}

export default App