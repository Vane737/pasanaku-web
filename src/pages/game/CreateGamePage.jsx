// RegisterUser.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import api from '../../apiAxios/axios';
import CustomListBox from '../../components/CustomListBox';


const lapsos = [
  { id: 1, nombre: 'Semanal' },
  { id: 2, nombre: 'Bisemanal' },
  { id: 3, nombre: 'Mensual' }
]

export const CreateGamePage = () => {
  const navigate = useNavigate();
  const [monedas, setMonedas] = useState([]);

  const [selectedCoin, setSelectedCoin] = useState({});
  const [selectedLapso, setSelectedLapso] = useState(lapsos[0]);
  const id =  localStorage.getItem('id');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get(`/moneda`);
        if (response.status === 200 || response.status === 201 ) {
          console.log(response);
          setMonedas(response.data);
          setSelectedCoin(response.data[0]);
        } else {
          console.error('Error al obtener monedas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener Monedas:', error);
      }
    };

    fetchRoles();
  }, []);
  
    const { nombre, participantes, coutaInicial , fechaInicio, horaInicio, formState, onInputChange } = useForm({
      nombre: '',
      coutaInicial: 0,
      participantes: 0,
      fechaInicio:'',
      horaInicio:'',
      lapso: lapsos[0].nombre,
      estado: 'Espera',
      monedaId: monedas.length > 0 ? monedas[0].id : 1,
    });

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {

      const fechaISO = `${formState.fechaInicio}T${formState.horaInicio}:00Z`;
        // console.log(formState);
        const formData = {
          ...formState,
          coutaInicial: parseFloat(formState.coutaInicial), // Parsear a número
          participantes: parseInt(formState.participantes), // Parsear a entero
          monedaId: parseInt(formState.monedaId), // Convertir a cadena de texto
          fechaInicio: fechaISO,
        };
        const idJugador = parseInt(id);
        console.log( {createPartidaDto: formData, idJugador});
        await api
        .post(`/partida`,  {createPartidaDto: formData, idJugador})
        .then((res) => {
          console.log('Respuesta correcta',res.data.id);
          navigate('/partidas');
          })
          .catch((err) => {
            console.log('Ha ocurrido un error', err);
          });
        } catch(error) {
        
            console.log('entro al error try catch');
          }
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
              <div className='flex flex-row items-center my-6'>
                <div className='basis-1/2 mr-2'>
                  <label className="block font-bold my-6  text-color_secondary">Hora de inicio</label>
                  <input
                      className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md"
                      type="time"
                      name="horaInicio"
                      value= { horaInicio }
                      placeholder={'Hora'}
                      onChange={ onInputChange }
                      autoComplete=""
                      />
                </div>
                <div className='basis-1/2 ml-2'>
                  <label className="block font-bold text-color_secondary my-6">Fecha de inicio</label>
                  <input
                      className="border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md "
                      type="date"
                      name="fechaInicio"
                      value= { fechaInicio }
                      placeholder={'date'}
                      onChange={ onInputChange }
                      />
                </div>
              </div>
              <div />
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
                <label className="basis-1/2 font-bold text-color_secondary ">Monto inicial</label>
                <input
                    className="basis-1/2 border bg-input bg-opacity-90 border-gray-300 px-3 py-2 w-full rounded-md"
                    type="number"
                    name="coutaInicial"
                    value= { coutaInicial }
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

      </section>
      }
    </>
  );
};
