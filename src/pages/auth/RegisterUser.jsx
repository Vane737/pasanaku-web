// RegisterUser.js
import { useState } from 'react';
import { MyModalMessage } from '../../components/utils/MyModalMessage';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
// import api from '../../api/gatewayApi';
import { useForm } from '../../hooks/useForm';
import api from '../../apiAxios/axios';
// import axios from '../../api/gatewayApi'; // Asumiendo que tienes un archivo axios para manejar tus solicitudes HTTP



export const RegisterUser = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // const { nombre, telefono, ci, email, direccion, contraseña, formState, onInputChange } = useForm({
  const { nombre, telefono, ci, email, direccion, formState, onInputChange } = useForm({
    nombre: '',
    telefono: '',
    ci: '',
    email: '',
    direccion: '',
    // contraseña: '',
    cuentas: []
  });
  
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  
  
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
          navigate('/');
          // console.log(formState);
          // console.log('handlesubmit');
          // await api
          // .post(`/jugadores`, formState)
          // .then((res) => {
          //   console.log(res);

          // })
          // .catch((err) => {
          //   console.log(err);
          // });
          // Realizar la solicitud HTTP para registrar al usuario
        } catch(error) {
        
            console.log('entro al error try catch');
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
              {/* <div className="relative">
                <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                  type={showPassword ? 'text' : 'password'}
                  name="contraseña"
                  value={ contraseña }
                  placeholder={'Contraseña'}
                  onChange={onInputChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-5 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeSlashIcon className="h-6 w-6 text-gray-400" /> : <EyeIcon className="h-6 w-6 text-gray-400" />}
                </button>
              </div> */}
              <button 
                className='w-full bg-primary mt-5 px-3 py-2 font-semibold text-md text-secondary rounded-sm shadow-md'
                type="submit"
                >
                Registrar
              </button>
            </form>

            {/* <pre> { JSON.stringify(formState) } </pre> */}

          </div>
        {isOpen && <MyModalMessage Text={message} estados={closeModal} />}
      </section>
    </>
  );
};
  {/* <input
      className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
      type="password"
      name="contraseña"
      value= { contraseña }
      placeholder={'Contraseña'}
      onChange={ onInputChange }
    /> */}