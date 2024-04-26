

import PropTypes from 'prop-types';


 const SidePartida = ({ partida }) => {
  return (
    <div className="px-5 py-5 items-center h-72 border mx-10 mt-10 mb-5 bg-bg_white border-bg_gray rounded-lg">
    <h2 className="text-lg text-color_secondary font-extrabold">
      { partida.nombre}
    </h2>
    <p className="my-2">
      <span className="text-color_secondary font-bold">Estado:</span>{" "}
      { partida.estado}
    </p>
    <p className="my-2">
      <span className="text-color_secondary font-bold">Ronda:</span> 0
    </p>
    <p className="my-2">
      <span className="text-color_secondary font-bold">Monto inicial:</span> { partida.coutaInicial } 
    </p>
    <p className="my-2">
      <span className="text-color_secondary font-bold">
        Participantes:
      </span>{" "}
      { partida.participantes }
    </p>
    <p className="my-2">
      <span className="text-color_secondary font-bold">Inicia el:</span>{" "}
      {new Date( partida.fechaInicio ).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}
    </p>
  </div>
  )
}

SidePartida.propTypes = {
    partida: PropTypes.object.isRequired,

  }; 

  export default SidePartida;