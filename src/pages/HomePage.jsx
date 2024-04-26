import { Link, useNavigate } from "react-router-dom";


import CardIcon from "../components/CardIcon";
import banner from '../assets/banner.png';
import { useEffect, useState } from "react";
import api from "../apiAxios/axios";

export const HomePage = () => {
  
  const navigate = useNavigate();
  
  const [partidas, setPertidas] = useState([]);
  const id =  localStorage.getItem('id');
  console.log(id);


  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        const response = await api.get(`/jugadores/${ id }/participaciones`);
        if (response.status === 200) {
          console.log(response.data.data);
          setPertidas(response.data.data);
        } else {
          console.error('Error al obtener partidas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener partidas:', error);
      }
    };

    fetchPartidas();
  }, []);

  // const handleClickEdit = ( id )=>{
  //   navigate(`/edit/${id}`);
  // }

  const handleClickCreate = ( idGame, idPart ) => {
    navigate(`partida/${ idGame }/invite/${ idPart }`);
  }
    return (
      <div className="w-full">
              <div className="w-full">
                <div className='relative'>
                  <img className="w-full object-cover" src={banner} alt="Card" />
                  <Link
                  // type="button"
                  to={`create/${ id }`}
                  className="rounded-md bg-primary text-color_primary font-bold py-2 px-4 absolute left-40 top-72 shadow-md"
                  // onClick={handleClickCreate}
                >
                    Empezar a jugar
                  </Link>
                </div>
                <div className="w-full flex justify-center">
                  <div className="w-10/12"> 
                    <h2 className="text-2xl font-bold my-8 font-sans text-secondary_dark">Mis partidas</h2>
                      <div   className='grid grid-cols-3 gap-x-28 gap-y-4 mb-24'>
                        {partidas.map( ( game ) => (
                          <CardIcon key={game.id} title={game.partida.nombre} state={game.estado}  onClickInvite ={ () => handleClickCreate( game.partida.id, game.id,)} />
                          ))} 
                      </div>            
                </div>
                </div>
              </div>
          </div>
    );
  }
  