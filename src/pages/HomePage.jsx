import { Link, useNavigate } from "react-router-dom";

import { PlusIcon } from "@heroicons/react/24/solid";

import CardIcon from "../components/CardIcon";
import Card from "../components/Card";
import banner from '../assets/banner.png';
import defaultImage from '../assets/default.jpg';

export const HomePage = () => {
  const navigate = useNavigate();
  // const idUser =  localStorage.getItem('idUser');
  // console.log(idUser);
  const listData = [
    {
      id:"1",
      title: "Vecinos La Morita",
      estado: 1,
    },
    {
      id:"2",
      title: "Vecinos La Morita",
      estado: 2,
    },
    {
      id:"3",
      title: "Vecinos La Morita",
      estado: 3,
    }
  ];

  const handleClickCreate = ()=>{
    navigate(`/mis-partidas/create`);
  }

  const handleCardClick = ( id ) => {
    navigate(`/fotografias/view/${id}`);
  }
    return (
      <div className="w-full">
              <div className="w-full">
                <div className='relative'>
                  <img className="w-full object-cover" src={banner} alt="Card" />
                  <Link
                  // type="button"
                  to={"mis-partidas/create"}
                  className="rounded-md bg-primary text-color_primary font-bold py-2 px-4 absolute left-40 top-72 shadow-md"
                  // onClick={handleClickCreate}
                >
                    Empezar a jugar
                  </Link>
                </div>
                <div className="w-full flex justify-center">
                  <div className="w-10/12"> 
                    <h2 className="text-2xl font-bold my-8 font-sans text-secondary_dark">Mis partidas</h2>
                      <div   className='grid grid-cols-3 gap-x-28 gap-y-4'>
                        {listData.map( ( game ) => (
                          <CardIcon key={game.id} title={game.title} state={game.estado}  onClick={handleClickCreate} />
                          ))} 
                      </div>            
                </div>
                </div>
              </div>
          </div>
    );
  }
  