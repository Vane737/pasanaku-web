import { PauseCircleIcon, PlayCircleIcon, TrophyIcon } from "@heroicons/react/24/solid";

// eslint-disable-next-line react/prop-types
const CardIcon = ({ title, state, onClick, goInviteClick, goEditClick }) => {
    return (
 
    <div 
        className="rounded-xl h-20 bg-bg_white border-bg_gray border shadow-md hover:bg-slate-50 text-dark text-center items-center p-2" 
        onClick={onClick}
    >
        <div className="flex justify-between">
            <div className="flex justify-start items-start">
                { state == 1 ? 
                    <PlayCircleIcon className='text-iniciado w-11 mt-3'/>
                    : state == 2 ?
                    <PauseCircleIcon className='text-espera w-11 mt-3'/>
                    :
                    <span className="bg-finalizada rounded-full w-9 h-9 mt-3  ">
                        <TrophyIcon className='text-bg_white mt-2 mx-2 w-5 h-5 '/>
                    </span>
                 }
                <div className="mt-1 ml-2 text-color_secondary text-start">
                    <p className="font-bold">{title}</p> 
                    <p className="text-sm mt-1"><span className="font-semibold">Estado: </span>{(state) == 1 ? "Iniciada": state == 2 ? "En espera": "Finalizada" }</p>
                </div>

            </div>
            <div className="flex flex-col">
                <button
                    type="button"
                    className="text-sm rounded-md mt-1 bg-secondary_dark py-0 px-2 border-2  text-bg_white border-secondary_dark hover:bg-secondary font-medium"
                    onClick={ goInviteClick }
                    >
                    Invitar
                </button>
                <button
                        type="button"
                        className="text-sm rounded-md mt-2 bg-bg_white border-secondary py-0 px-2 border-2 text-secondary hover:text-dark font-medium" 
                        onClick={ goEditClick }
                    >
                        Editar
                </button>

            </div>

        </div>
    </div>

    );
  };
  
  export default CardIcon;

