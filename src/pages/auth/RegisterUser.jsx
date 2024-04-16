// RegisterUser.js
import { useState } from 'react';
import { MyModalMessage } from '../../components/utils/MyModalMessage';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useForm } from '../../hooks/useForm';
import api from '../../apiAxios/axios';



export const RegisterUser = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [equals, setEquals] = useState(true);
  const [repeatPass, setRepeatPass] = useState('');
  // const { nombre, telefono, ci, email, direccion, contraseña, formState, onInputChange } = useForm({
  const { nombre, telefono, ci, email, direccion, password, formState, onInputChange } = useForm({
    nombre: '',
    telefono: '',
    ci: '',
    email: '',
    direccion: '',
    password: '',
    cuentas: []
  });
  
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  
  
  const handleChange = (e) => {
    setRepeatPass(e.target.value);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

          if ( password != repeatPass ) {
            setEquals(false) 
            
          }
          else { 
            setEquals(true);
            console.log(formState);
            await api
            .post(`/jugadores/register`, formState)
            .then((res) => {
              console.log(res);
              navigate('/partidas');
            })
            .catch((err) => {
              console.log(err);
            });
          // Realizar la solicitud HTTP para registrar al usuario
          }
        };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);
    setIsAccept(accept);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
        <section className=" container mx-auto px-14 p-8 items-center max-w-md border justify-center mt-5 border-gray-300 rounded-md">
          <div className='flex text-center text-dark justify-center items-center mb-8'>
              <h2 className="text-2xl text-secondary_dark font-bold">
                Regístrate en Pasanaku
              </h2>
            </div>
          <div className="flex flex-col">

          <form onSubmit={ handleSubmit }>
              {/* <label className="block mb-2">Nombre</label> */}
              <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                  type="text"
                  name="nombre"
                  value= { nombre }
                  placeholder={'Nombre'}
                  onChange={ onInputChange }
                  autoComplete="username"
                />
              {/* <label className="block mb-2">Nombre</label> */}
              <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                  type="text"
                  name="telefono"
                  value= { telefono }
                  placeholder={'Teléfono'}
                  onChange={ onInputChange }
                />
              {/* <label className="block mb-2">Nombre</label> */}
              <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                  type="text"
                  name="ci"
                  value= { ci }
                  placeholder={'Carnet de identidad'}
                  onChange={ onInputChange }
                />
              {/* <label className="block mb-2">Nombre</label> */}
              <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                  type="email"
                  name="email"
                  value= { email }
                  placeholder={'Correo electrónico'}
                  onChange={ onInputChange }
                />
              {/* <label className="block mb-2">Nombre</label> */}
              <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                  type="text"
                  name="direccion"
                  value= { direccion }
                  placeholder={'Dirección'}
                  onChange={ onInputChange }
                />
              <div className="relative">
                <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={ password }
                  placeholder={'Contraseña'}
                  onChange={onInputChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 transform-translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeSlashIcon className="h-6 w-6 text-gray-400" /> : <EyeIcon className="h-6 w-6 text-gray-400" />}
                </button>
              </div>
              <div className="relative">
                <small className='text-secondary_dark font-bold pb-5'>Vuelve a escribir la contraseña</small>
                <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3  py-2 w-full rounded-md"
                  type={showRepeatPassword ? 'text' : 'password'}
                  value={ repeatPass }
                  placeholder={'Contraseña'}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 transform-translate-y-1/2"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? <EyeSlashIcon className="h-6 w-6 text-gray-400" /> : <EyeIcon className="h-6 w-6 text-gray-400" />}
                </button>
                {
                  !equals && 
                    <small className='text-finalizada font-semibold'>Las contraseñas no coinciden</small>
                }
              </div>
              <button 
                className='w-full bg-primary mt-5 px-3 py-2 font-semibold text-md text-secondary rounded-sm shadow-md'
                type="submit"
                >
                Registrar
              </button>
            </form>

          </div>
        {isOpen && <MyModalMessage Text={message} estados={closeModal} />}
      </section>
    </>
  );
};