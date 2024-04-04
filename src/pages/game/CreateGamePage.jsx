// RegisterUser.js
import { useEffect, useState } from 'react';
import { MyModalMessage } from '../../components/utils/MyModalMessage';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import api from '../../apiAxios/axios';
import CustomListBox from '../../components/CustomListBox';
// import axios from '../../api/gatewayApi'; // Asumiendo que tienes un archivo axios para manejar tus solicitudes HTTP


const lapsos = [
  { id: 1, nombre: 'Semanal' },
  { id: 2, nombre: 'Quincenal' },
  { id: 3, nombre: 'Mensual' }
]

export const CreateGamePage = () => {
  const navigate = useNavigate();
  const [monedas, setMonedas] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [selectedLapso, setSelectedLapso] = useState(lapsos[0]);
  
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get(`/moneda`);
        if (response.status === 200) {
          console.log(response);
          setMonedas(response.data);
          setSelectedCoin(response.data[0]);
        } else {
          console.error('Error al obtener roles:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };

    fetchRoles();
  }, []);
  
    const { nombre, participantes, pozo , fechaInicio, formState, onInputChange } = useForm({
      nombre: '',
      pozo: 0,
      participantes: 0,
      fechaInicio:'',
      lapso: lapsos[0].nombre,
      estado: 'Espera',
      monedaId: monedas.length > 0 ? monedas[0].id : '',
    });

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {


        console.log(formState);
        const formData = {
          ...formState,
          pozo: parseFloat(formState.pozo), // Parsear a número
          participantes: parseInt(formState.participantes), // Parsear a entero
          monedaId: formState.monedaId.toString(), // Convertir a cadena de texto
        };
        console.log(formData);
          navigate('/');
          await api
          .post(`/partida`, formData)
          .then((res) => {
            console.log(res);

          })
          .catch((err) => {
            console.log(err);
          });
        } catch(error) {
        
            console.log('entro al error try catch');
          }
        };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);
    setIsAccept(accept);
  };

  return (
    <>
      
{       
      monedas.length > 0 && 
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
                  name="fechaInicio"
                  value= { fechaInicio }
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
                <label className="basis-1/2 font-bold text-color_secondary ">Monto total</label>
                <input
                    className="basis-1/2 border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md"
                    type="number"
                    name="pozo"
                    value= { pozo }
                    placeholder={'0,0'}
                    onChange={ onInputChange }
                    />

              </div>
              <div className='flex flex-row items-center mb-8'>
                <label className="basis-1/2  font-bold text-color_secondary">Moneda</label>
              {    (monedas.length === 0) ? 
                  <p>Cargando monedas...</p>
                  :
                <CustomListBox
                    className="basis-1/2"
                    options={monedas}
                    selected={selectedCoin}
                    setSelected={
                      (value) => {
                        console.log('desde el setselect',value);
                        setSelectedCoin(value);
                        onInputChange({ target: { name: 'monedaId', value } 
                      })}}

                    />
                }
              </div>
              <div className="w-full">
              <label className="block font-bold text-color_secondary mb-6">Duración de ronda</label>
                {/* <CustomListBox  name="lapso" options={lapsos} selected={ lapso } setSelected={ (value) => onInputChange({ target: { name: 'lapso', value } }) } /> */}
                <CustomListBox
                    name="lapso"
                    options={lapsos}
                    selected={selectedLapso}
                    setSelected={ 
                      (value) => {
                      setSelectedLapso(value)
                      onInputChange({ target: { name: 'lapso', value }})
                    }}
                    />

                </div>

              <button 
                className='w-full bg-primary my-12 px-3 py-2 font-bold text-md text-secondary_dark rounded-sm shadow-md'
                type="submit"
                >
                Registrar
              </button>
            </form>

            {/* <pre> { JSON.stringify(monedas) } </pre> */}

          </div>
        {isOpen && <MyModalMessage Text={message} estados={closeModal} />}
      </section>
      }
    </>
  );
};
