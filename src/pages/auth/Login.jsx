
import {Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

import { MyModalMessage } from '../../components/utils/MyModalMessage';

import api from '../../api/gatewayApi';
import { useForm } from '../../hooks/useForm';
import logo from '../../assets/Logo1.png';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
export const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { password, email, formState, onInputChange } = useForm({
    email: '',
    password: '',
  });


  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      // navigate('/');
          // console.log(formState);
          await api
          .post(`/jugadores/login`, formState)
          .then((res) => {
            localStorage.setItem("id", res.data.data.id);
            console.log('se guardo en el localStorage');
            // se guardo en el localStorage
            navigate('/partidas');
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        } catch(error) {
          console.log(error);
          //       setMessage(errorMessage);
          //     } else {
          //       console.log("Error desconocido");
          //       setMessage("Error desconocido");
          //     }
          }
        };



  //   } catch (error) {
  //     console.error(error);

  //     if (error.response && error.response.data && error.response.data.errores) {
  //       const errorMessage = error.response.data.errores.errors.length < 2 ?
  //         error.response.data.errores.errors[0].msg :
  //         "Datos ingresados incorrectos";

  //       console.log(errorMessage);
  //       setMessage(errorMessage);
  //     } else {
  //       console.log("Error desconocido");
  //       setMessage("Error desconocido");
  //     }

  //     setIsOpen(true);
  //   }
  // };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className=" container mx-auto px-14 p-8 items-center max-w-md border justify-center mt-5 border-gray-300 rounded-md">
    <div className='flex text-center text-dark justify-center items-center mb-8'>
        <div>
          <img className="w-48 object-cover mx-auto mb-10" src={logo} alt="Card" />
          <h2 className="text-2xl text-secondary_dark font-bold">
            Iniciar sesión en tu cuenta
          </h2>
        </div>
      </div>
    <div className="flex flex-col">

    <form onSubmit={ handleSubmit }>
        {/* <label className="block mb-2">Nombre</label> */}
        
        <input
            className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
            type="email"
            name="email"
            value= { email }
            placeholder={'Correo electrónico'}
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
            className="absolute right-3 top-5 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeSlashIcon className="h-6 w-6 text-gray-400" /> : <EyeIcon className="h-6 w-6 text-gray-400" />}
          </button>
        </div> 
        <button 
          className='w-full bg-primary my-5 px-3 py-2 font-semibold text-md text-secondary_dark rounded-sm shadow-md'
          type="submit"
          >
          Registrar
        </button>
        {/* <p></p> */}
        <div className='text-center'>
          <small className='text-secondary_dark text-center'>¿No tienes una cuenta? <Link className='font-bold hover:text-secondary'>Registrarme</Link></small>
        </div>
      </form>

      {/* <pre> { JSON.stringify(formState) } </pre> */}

    </div>
  {isOpen && <MyModalMessage Text={message} estados={closeModal} />}
</section>
  )
}
