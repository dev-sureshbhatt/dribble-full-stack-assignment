import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUpFlow from './pages/SignUpFlow'
import UploadImage from './pages/UploadImage'
import SurveyPage from './pages/SurveyPage'
import ThankYou from './pages/ThankYou'
import {Provider} from 'react-redux' 
import store from './features/auth/store'

function App() {

  

  return (
    <Provider store={store}>
    <BrowserRouter>
    
    <Routes>
      
      <Route index element={<SignUpFlow />} />    
      <Route path='/upload-image' element={<UploadImage />} />
      <Route path='/survey' element={<SurveyPage />} />
      <Route path='/thank-you' element={<ThankYou />} />
      
    </Routes>

    </BrowserRouter>
    </Provider>
  )
}

export default App
