import { Landing } from './pages/Landing'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { RecoilRoot } from 'recoil';
import { Footer } from './components/Footer';
import { Studio } from './pages/Studio';
import { Suspense } from 'react';
import EditProfile from './pages/EditProfile';
import { EditCredential } from './pages/EditCredential';

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
            <Route path='/profile' element={<EditProfile />} />
            <Route path='/update' element={<EditCredential />} />
            <Route path='/studio/1' element={<Studio />} />
            <Route path='/studio/2' element={<Studio />} />
            <Route path='/studio/3' element={<Studio />} />
          </Routes>
        </Suspense>
        <br />
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App

{/* <Sidebar/><OutputCard/> */}