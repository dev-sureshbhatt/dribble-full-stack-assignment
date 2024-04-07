import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUpFlow from './components/SignUpFlow'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<SignUpFlow />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
