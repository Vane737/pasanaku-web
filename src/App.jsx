import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import NavBar from './components/NavBar';
import { Login, RegisterUser} from './pages/auth/index';

import { HomePage } from './pages/HomePage';
import { Welcome } from './pages/Welcome';
import {NavLoggin} from './components/NavLoggin';
import { CreateGamePage } from './pages/game/CreateGamePage';
import { SendInvitation } from './pages/game/SendInvitation';


const App = () => {
  const idPhoto = localStorage.getItem('idPhoto') ?? 1 ;
  const idOrg = localStorage.getItem('idOrg') ?? 1 ;
  console.log(idOrg);
  console.log(idPhoto);


  return (
    <div className=''>

      <BrowserRouter> 
        <Routes>       {/* El que contendra las rutas */}
          <Route path="/" element={<NavLoggin /> }> 
                  <Route index element={ <Welcome />} />
                  <Route path='login' element={<Login />}/>
                  <Route path='register' element={<RegisterUser />}/>
          </Route>

          <Route path='/partidas'          
          element={
          <div className='flex'>
            <div className='w-full'> 
            <NavBar />
              <Outlet />
            </div>
          </div> 
        }>
            <Route index element={<HomePage /> } />                           {/* Ver Fotografias */}
            <Route path='create' element={<CreateGamePage /> } />               {/* Ver editar */}
            <Route path='invite/:id' element={<SendInvitation /> } />               {/* Ver editar */}
          </Route>

          <Route path='/mis-partidas' 
            element={         
            <div className='flex'>
              <div className='w-full'> 
              <NavBar />
                <Outlet />
              </div>
            </div> 
          }>    
            <Route index element={<HomePage /> } />
            <Route path='photography/profile' element={<HomePage /> } />
            <Route path='photography/upload' element={<HomePage /> } />
            <Route path='photography/:id' element={<HomePage /> } />
            <Route path='sales' element={<HomePage /> } />
          </Route>
        </Routes>
        <div className='flex'>
      </div>
      </BrowserRouter>
      {/* } */}
    </div>
  )
}

export default App;