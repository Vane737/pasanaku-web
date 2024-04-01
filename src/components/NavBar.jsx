import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo1.png';
// import classNames from 'classnames'



const navigation = [
  { name: 'Home', to: '/home', current: false },
  { name: 'Mis partidas', to: '/home', current: false },
  { name: 'Reglas', to: '/reglas', current: false },
  { name: 'Acerca', to: '/acerca', current: false },
  { name: 'Contacto', to: '/contactanos', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

    return (
      <Disclosure as="nav" className="bg-primary shadow-lg pt-2 h-20">
        {({ open }) => (
          <>
            <div className="mx-auto sm:px-6 lg:px-8  w-11/12">
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

              </div>



                
                <div className="absolute inset-y-0 w-28 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-secondary p-1 text-bg_white hover:text-white focus:outline-none focus:ring-2 focus:ring-bg_gray focus:ring-offset-2 focus:ring-offset-secondary"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
  
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      // as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              to="#"
                              className={classNames(active ? 'bg-secondary' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Mi perfil
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              to="#"
                              className={classNames(active ? 'bg-secondary' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Configuraciones
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/home"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Cerrar sesión
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
  
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    to={item.to}
                    className={classNames(
                      item.current ? 'bg-secondary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
}