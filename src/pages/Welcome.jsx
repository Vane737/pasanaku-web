import { useNavigate } from "react-router-dom";

import banner from '../assets/banner.png';

export const Welcome = () => {
  const navigate = useNavigate();
  // const idUser = localStorage.removeItem('idUser');
  // console.log(idUser);

  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await api.get(`/partida`);
  //       if (response.status === 200) {
  //         console.log(response.data);
  //         // setMonedas(response.data);
  //       } else {
  //         console.error('Error al obtener roles:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener roles:', error);
  //     }
  //   };

  //   fetchRoles();
  // }, []);


  const handleClickCreate = ()=>{
    navigate(`login`);
  }

  // const handleCardClick = ( id ) => {
  //   navigate(`/fotografias/view/${id}`);
  // }
    return (
      <div className="w-full">
        <div className="w-full">
          <div className='relative'>
            <img className="w-full object-cover" src={banner} alt="Card" />
            <button
            type="button"
            className="rounded-md bg-primary text-color_primary font-bold py-2 px-4 absolute left-40 top-72 shadow-md"
            onClick={handleClickCreate}
          >
              Empezar a jugar
            </button>
          </div>
          {/* <div className="w-full flex justify-center"> */}
            {/* <div className="w-10/12">  */}
              {/* <h2 className="text-2xl font-bold my-8 font-sans text-secondary_dark">Mis partidas</h2>
                <div   className='grid grid-cols-3 gap-x-28 gap-y-4'>
                  {listData.map( ( game ) => (
                    <CardIcon key={game.id} title={game.title} state={game.estado}  onClick={handleClickCreate} />
                    ))} 
                </div>             */}
          {/* </div> */}
          {/* </div> */}



        </div>
    </div>
    );
  }
  