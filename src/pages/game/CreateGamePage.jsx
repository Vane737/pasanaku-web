// RegisterUser.js
import { Fragment, useState } from 'react';
import { MyModalMessage } from '../../components/utils/MyModalMessage';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox, Listbox, Transition } from '@headlessui/react'

// import api from '../../api/gatewayApi';
import { useForm } from '../../hooks/useForm';
import api from '../../apiAxios/axios';
import CustomListBox from '../../components/CustomListBox';
// import axios from '../../api/gatewayApi'; // Asumiendo que tienes un archivo axios para manejar tus solicitudes HTTP


const lapsos = [
  { id: 1, nombre: 'Semanal' },
  { id: 2, nombre: 'Quincena' },
  { id: 3, nombre: 'Mensual' }
]

const monedas = [
    { id: 1, nombre: 'Bs' },
    { id: 2, nombre: '$us' }
]

export const CreateGamePage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [query, setQuery] = useState('')

  // const { nombre, telefono, ci, email, direccion, contraseña, formState, onInputChange } = useForm({
  const { nombre, cuotaInicial, participantes, moneda, pozo, lapso, habilitado, formState, onInputChange } = useForm({
    nombre: '',
    cuotaInicial: '',
    participantes: '',
    pozo: '',
    lapso: lapsos[0].nombre,
    habilitado: '',
    moneda: monedas[0].id,
    // contraseña: '',
    cuentas: []
  });
  
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  
  
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {

        console.log(formState);
          navigate('/mis-partidas/send-invitation');
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
        <section className=" container mx-auto px-40 py-8 items-center max-w-4xl border justify-center mt-5 border-gray-300 rounded-lg">
          <div className='flex text-center text-dark justify-center items-center mb-8'>
              <h2 className="text-2xl text-secondary_dark font-bold">
                Registrar nueva partida
              </h2>
            </div>
          <div className="flex flex-col">

          <form onSubmit={ handleSubmit }>
              <label className="block font-bold my-6 text-color_secondary">Nombre de la partida</label>
              <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md"
                  type="text"
                  name="nombre"
                  value= { nombre }
                  placeholder={'Nombre'}
                  onChange={ onInputChange }
                  autoComplete="username"
                />
              <label className="block font-bold text-color_secondary my-6">Fecha de inicio</label>
              <input
                  className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md "
                  type="date"
                  name="habilitado"
                  value= { habilitado }
                  placeholder={'date'}
                  onChange={ onInputChange }
                />
              <div className='flex flex-row items-center  my-6'>
                <label className="basis-1/2 font-bold text-color_secondary">Cantidad de personas</label>
                <input
                    className="basis-1/2 border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                    type="number"
                    name="participantes"
                    value= { participantes }
                    placeholder={'0'}
                    onChange={ onInputChange }
                    />
              </div>
              <div className='flex flex-row items-center my-6'>
                <label className="basis-1/2 font-bold text-color_secondary ">Cuota inicial</label>
                <input
                    className="basis-1/2 border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md"
                    type="number"
                    name="cuotaInicial"
                    value= { cuotaInicial }
                    placeholder={'0,0'}
                    onChange={ onInputChange }
                    />

              </div>
              <div className='flex flex-row items-center mb-8'>
                <label className="basis-1/2  font-bold text-color_secondary">Moneda</label>
                {/* <CustomListBox className="basis-1/2" name="moneda" options={monedas} selected={ moneda } setSelected={ (value) => onInputChange({ target: { name: 'moneda', value } }) } /> */}
                <CustomListBox
                    className="basis-1/2"
                    name="moneda"
                    options={monedas}
                    selected={moneda}
                    setSelected={(value) => onInputChange({ target: { name: 'moneda', value } })}
                    />
                {/* <input
                    className="basis-1/2 border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md mb-3"
                    type="text"
                    name="moneda"
                    value= { moneda }
                    placeholder={'0,00'}
                    onChange={ onInputChange }
                    /> */}
              </div>
              <div className="w-full">
              <label className="block font-bold text-color_secondary mb-6">Duración de ronda</label>
                {/* <CustomListBox  name="lapso" options={lapsos} selected={ lapso } setSelected={ (value) => onInputChange({ target: { name: 'lapso', value } }) } /> */}
                <CustomListBox
                    name="lapso"
                    options={lapsos}
                    selected={lapso}
                    setSelected={(value) => onInputChange({ target: { name: 'lapso', value } })}
                    />

                </div>

              <button 
                className='w-full bg-primary my-12 px-3 py-2 font-bold text-md text-secondary_dark rounded-sm shadow-md'
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