import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUpFlow from './components/SignUpFlow'
import UploadImage from './pages/UploadImage'
import SurveyPage from './pages/SurveyPage'
import Navbar from './components/Navbar'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    
    <Routes>
      
      <Route index element={<SignUpFlow />} />
    
    
      <Route path='/upload-image' element={<UploadImage />} />
      <Route path='/survey' element={<SurveyPage />} />
      
    </Routes>

    </BrowserRouter>
  )
}

export default App
