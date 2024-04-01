import { Disclosure } from '@headlessui/react'
// import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { CameraIcon, HomeIcon } from '@heroicons/react/24/solid'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo1.png';
// import classNames from 'classnames'


const navigation = [
  { name: 'Dashboard', to: '/algo', current: false },
  { name: 'Home', to: '/', current: false },
  { name: 'Acerca', to: '/acerca', current: false },
  { name: 'Contacto', to: '/algo', current: false },
]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export const  NavLoggin = () =>  {
  const location = useLocation();
    const navigate = useNavigate();
  const handleClickCreate = ()=>{
    navigate(`register`);
  }
  const handleClickLoggin = ()=>{
    navigate(`login`);
  }

    return (
    <div>
      <Disclosure as="nav" className="bg-primary pt-2 h-20">
   
          <>
            <div className="mx-auto sm:px-6 lg:px-8 w-11/12">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-none w-56 items-center">
                  {/* <CameraIcon className="h-5 w-5 mr-2" /> */}
                    <Link to="/" className="text-dark">
                    <img className="w-48 object-cover" src={logo} alt="Card" />
                    </Link>
                  </div>
                </div>
                <div className="grow h-14 items-center text-center">
                {/* Aquí agregamos las opciones del navbar */}
                    <div className="flex space-x-4 justify-center items-center h-14">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={`text-color_primary rounded-sm px-3 py-2 text-md font-bold
                            ${location.pathname == item.to ? 'bg-slate-400 text-secondary bg-opacity-20': ' hover:bg-slate-400 hover:text-secondary  hover:bg-opacity-20 '}`}
                          // activeClassName='text-primary hover:bg-opacity-20 hover:bg-slate-400 hover:text-secondary'
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                {/* <ul className="flex space-x-4 justify-center items-center h-14">
                  <li className='px-5'>
                    <Link
                      to="/"
                      className="text-clt_primary hover:text-secondary font-bold"
                      activeClassName="text-secondary"
                    >
                      Home
                    </Link>
                  </li>
                  <li className='px-5'>
                    <Link
                      to="/mis-partidas"
                      className="text-clt_primary wei hover:text-secondary font-bold"
                      activeClassName="text-secondary"
                    >
                      Mis partidas
                    </Link>
                  </li>
                  <li className='px-5'>
                    <Link
                      to="/reglas"
                      className="text-clt_primary hover:text-secondary font-bold"
                      activeClassName="text-secondary"
                    >
                      Reglas
                    </Link>
                  </li>
                  <li className='px-5'>
                    <Link
                      to="/reglas"
                      className="text-clt_primary hover:text-secondary font-bold"
                      activeClassName="text-secondary"
                    >
                      Acerca de
                    </Link>
                  </li>
                </ul> */}
              </div>
                <div className="absolute inset-y-0 right-0 flex-none w-60 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-md bg-bg_white  border-secondary border-2 font-bold p-2 mr-3 text-secondary hover:bg-opacity-90 hover:text-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={handleClickLoggin}
                  >
                    Iniciar sesión

                  </button>
                  <button
                    type="button"
                    className="relative rounded-md bg-secondary  py-2 px-4 text-bg_white hover:text-white hover:bg-secondary hover:bg-opacity-90 font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={handleClickCreate}
                  >
                    Registrar

                  </button>
                </div>
              </div>
            </div>
  

          </>
        
      </Disclosure>
      <Outlet />
    </div>
    )
}