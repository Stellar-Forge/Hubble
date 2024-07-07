import { Landing } from './pages/Landing'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { RecoilRoot } from 'recoil';
import { Footer } from './components/Footer';
import { Studio } from './pages/Studio';
import { Suspense } from 'react';

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
      <Suspense fallback={"loading..."}>
          <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/studio' element={<Studio />} />
          </Routes>
        </Suspense>
        <br />
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
