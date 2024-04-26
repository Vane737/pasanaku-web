import { useEffect, useState } from "react";
import { MyModalMessage } from "../../components/utils/MyModalMessage";
import { useNavigate, useParams } from "react-router-dom";
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Tab } from "@headlessui/react";
import api from "../../apiAxios/axios";
import { useForm } from "../../hooks/useForm";
import SidePartida from "../../components/SidePartida";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SendInvitation = () => {
  const navigate = useNavigate();
  const { idGame, idPart } = useParams();
  const { nombre, telefono, email, formState, onInputChange } = useForm({
    nombre: "",
    telefono: "",
    email: "",
    estado: "Espera",
    participanteId: parseInt(idPart),
  });
  
  
  const [invitados, setInvitados] = useState([]);
  const [participantes, setParticipantes] = useState(null);
  const [partida, setPartida] = useState({});
  const [rondas, setRondas] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Invitados");
  const [ ganador, setGanador ] = useState("");

  const obtenerInvitados = async () => {
    try {
      const response = await api.get(`/partida/${idGame}/invitados`);
      setInvitados(response.data.data);
    } catch (error) {
      console.error("Error al obtener los invitados:", error);
    }
  };

  const obtenerParticipantes = async () => {
    try {
      const response = await api.get(`/partida/${idGame}/participantes`);
      setParticipantes(response.data.data);
      console.log("Participantes: ", response.data.data);
    } catch (error) {
      console.error("Error al obtener los participantes:", error);
    }
  };

  const handleCreateInvitacion = async (e) => {
    e.preventDefault();
    try {
      // navigate("/");
      // console.log('handlesubmit');
      await api
        .post(`/invitacion`, formState)
        .then((res) => {
          console.log(res);
          obtenerInvitados();
        })
        .catch((err) => {
          console.log(err);
        });
      // Realizar la solicitud HTTP para registrar al usuario
    } catch (error) {
      console.log("entro al error try catch");
    }
  };

  useEffect(() => {
    obtenerPartida();
    obtenerInvitados();
  }, []);

  const obtenerPartida = async () => {
    try {
      const response = await api.get(`/partida/${idGame}`);
      console.log(response.data);
      setPartida(response.data);
      if (response.data.estado === "Iniciada") {
        handleTabChange('Participantes')
      }
      console.log("Rondas: ", response.data);
      setRondas(response.data.rondasEnpartida);
    } catch (error) {
      console.error("Error al obtener la partida:", error);
    }
  };

  const handleSubmit = async (id) => {
    try {
      console.log(id);
      await api
        .post(`/invitacion/enviar/${id}`)
        .then((res) => {
          console.log(res);
          setMessage("Invitación enviada correctamente");
          setIsOpen(true);
          obtenerPartida();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error al crear invitación:", error);
    }
  };
  const handleAllSubmit = async () => {
    try {
      console.log(idGame);
      await api
        .post(`/invitacion/enviarTodos/${idGame}`)
        .then((res) => {
          console.log(res);
          setMessage("Invitaciones enviadas correctamente");
          setIsOpen(true);
          obtenerInvitados();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error al crear invitación:", error);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "Invitados") {
      obtenerInvitados();
    } else if (tab === "Participantes") {
      obtenerParticipantes();
    }
  };

  const handleDetail = async (id) => {
    try {
      console.log(id);
      await api
        .get(`/ronda/${id}`)
        .then((res) => {
          setGanador(res.data.subasta.ganador, '-', res.data.subasta.resultado)
          console.log(res.data.subasta);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error al crear invitación:", error);
    }
  };

  const handleInitGame = async (id) => {
    try {
      console.log(id);
      await api
        .put(`/partida/iniciar/${idGame}`)
        .then((res) => {
          console.log(res);
          setMessage(
            "Se ha iniciado la partida en 10 mins antes de comenzar la subasta"
          );
          setIsOpen(true);
          obtenerInvitados();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error al crear invitación:", error);
    }
  };
  const closeModal = ({ open, accept }) => {
    setIsOpen(open);
    setIsAccept(accept);
  };

  return (
    <div className="flex flex-row">
      <div className="basis-3/12 h-min-screen-minus-navbar bg-primary opacity-90">
        <SidePartida partida={partida} />
        <div className="flex justify-between mx-10">
          {
            partida.estado === 'Espera' &&
            <button
              className=" bg-secondary_dark px-8 py-2 hover:bg-violet-950 hover:bg-opacity-100 hover:text-white font-semibold text-md text-bg_white rounded-sm shadow-md"
              onClick={() => handleInitGame(idGame)}
            >
              Iniciar Partida
            </button>
            // <FontAwesomeIcon icon="fa-solid fa-spinner" spin />
          }

        </div>
      </div>

      <div className="basis-9/12 px-12">
        <section className="px-20 py-8 w-full border mt-12 border-gray-300 rounded-lg">
          { partida.estado === 'Espera' ?  
            <div className="flex flex-col justify-start ">
              <h2 className="text-xl text-color_secondary font-bold">
                {" "}
                Nueva invitación
              </h2>
              <form
                onSubmit={handleSubmit}
                className="justify-between items-end w-full text-md"
              >
                <div className="flex flex-row">
                  <div className="basis-4/6 ">
                    <div className="flex flex-row items-center my-5">
                      <label className="basis-2/5 font-bold text-color_secondary">
                        Nombre
                      </label>
                      <input
                        className="basis-3/5 border bg-input bg-opacity-50 border-gray-300 px-3 py-2 w-full rounded-md"
                        type="text"
                        name="nombre"
                        value={nombre}
                        placeholder={"Nombre"}
                        onChange={onInputChange}
                        autoComplete="username"
                      />
                    </div>
                    <div className="flex flex-row items-center my-5">
                      <label className="basis-2/5 font-bold text-color_secondary">
                        Teléfono
                      </label>
                      <input
                        className="basis-3/5 border bg-input bg-opacity-50 border-gray-300 px-3 py-2 w-full rounded-md"
                        type="tel"
                        name="telefono"
                        value={telefono}
                        placeholder="Teléfono"
                        onChange={onInputChange}
                      />
                    </div>
                    <div className="flex flex-row items-center my-5">
                      <label className="basis-2/5 font-bold text-color_secondary">
                        Correo electrónico
                      </label>
                      <input
                        className="basis-3/5 border bg-input bg-opacity-50 border-gray-300 px-3 py-2 w-full rounded-md"
                        type="email"
                        name="email"
                        value={email}
                        placeholder={"Correo"}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="basis-2/6 w-full"></div>
                </div>

                <div className="text-end">
                  <button
                    className="bg-secondary px-16 py-2 font-bold text-md text-bg_white rounded-md shadow-md "
                    type="submit"
                    onClick={handleCreateInvitacion}
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
            : 
            <div className="flex flex-col justify-start ">
            <h2 className="text-xl text-color_secondary font-bold">
              {" "}
              Rondas
            </h2>
            <div className="justify-between items-end w-full mt-5 text-md">
              {
                rondas.map((ronda ) => (
                  <div
                    key={ronda.id}
                    className="border border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center"
                  >
                    <div className="flex space-x-4 mt-2 text-center">
                      <h3 className="font-semibold w-40 text-color_primary">
                        {ronda.nombre}
                      </h3>
                      <p className="text-color_secondary w-40">
                        <span className="font-bold"></span>{" "}
                        {new Date( ronda.fechaInicio ).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                      </p>
                      <p className="text-color_secondary w-60">
                        <span className="font-bold"></span>{" "}
                        {ronda.estado}
                      </p>
                      {/* <p className="text-color_primary w-36">
                        <span className="font-extrabold"></span>{" "}
                        {ronda.estado}
                      </p> */}
                    </div>
                    { ronda.estado === 'Iniciada' &&(
                      <div className="flex space-x-2">
                        {
                        ganador === "" ?
                        (<button
                          type="button"
                          className="relative rounded-md bg-bg_white  border-secondary hover:border-secondary_dark border-2 font-bold p-1 hover:text-secondary_dark text-secondary hover:bg-opacity-90 hover:text-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          onClick={() => handleDetail(ronda.id)}
                        >
                          Ver detalles
                        </button>
                        ): (
                          <p className="text-color_secondary w-60">
                          <span className="font-bold"></span>{" "}
                          {ganador}
                        </p>
                        )

                        }

                      </div>
                    )}
                  </div>
                ))
              }
            </div>
          </div>
          }
          {isOpen && <MyModalMessage Text={message} estados={closeModal} />}
        </section>

        <section className="px-20 py-8 w-full border mt-12 border-gray-300 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-color_secondary font-bold">
              Lista de {selectedTab}
            </h2>
            { partida.estado === 'Espera' && 
              <>
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-md  border-bg_gray border-2 bg-secondary/30 p-1">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-md py-2 px-10 text-sm font-bold leading-5 ",
                          "ring-white/50 ring-offset-2 ring-offset-secondary_dark focus:outline-none focus:ring-2",
                          selected
                            ? "bg-secondary/40 text-secondary_dark shadow"
                            : "text-secondary_dark hover:bg-white/[0.12] hover:text-secondary"
                        )
                      }
                      onClick={() => handleTabChange("Invitados")}
                    >
                      Invitados
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-md py-2 px-10 text-sm font-bold leading-5 ",
                          "ring-white/50 ring-offset-2 ring-offset-secondary_dark focus:outline-none focus:ring-2",
                          selected
                            ? "bg-secondary/40 text-secondary_dark shadow"
                            : "text-secondary_dark hover:bg-white/[0.12] hover:text-secondary"
                        )
                      }
                      onClick={() => handleTabChange("Participantes")}
                    >
                      Participantes
                    </Tab>
                  </Tab.List>
                </Tab.Group>
                <button
                  className="bg-secondary hover:bg-secondary_dark px-10 py-2 font-bold text-md text-bg_white rounded-md shadow-md"
                  onClick={handleAllSubmit}
                >
                  Invitar a todos
                </button>
              </>
            }
          </div>
          <div>
            <div className="w-full my-6">
              {selectedTab === "Invitados"  ? (
                invitados.map(
                  (invitado) =>
                    invitado.estado !== "Aceptada" && (
                      <div
                        key={invitado.id}
                        className="border border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center"
                      >
                        <div className="flex space-x-4 mt-2 text-center">
                          <h3 className="font-semibold w-36 text-color_primary">
                            {invitado.nombre}
                          </h3>
                          <p className="text-color_secondary w-24">
                            <span className="font-bold"></span>{" "}
                            {invitado.telefono}
                          </p>
                          <p className="text-color_secondary w-60">
                            <span className="font-bold"></span> {invitado.email}
                          </p>
                          <p className="text-color_primary w-36">
                            <span className="font-extrabold"></span>{" "}
                            {invitado.estado}
                          </p>
                        </div>
                        { partida.estado === 'Espera' && 
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              className="relative rounded-md bg-bg_white  border-secondary hover:border-secondary_dark border-2 font-bold p-1 hover:text-secondary_dark text-secondary hover:bg-opacity-90 hover:text-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                              onClick={() => handleSubmit(invitado.id)}
                            >
                              <PaperAirplaneIcon className="w-6 h-6 " />
                            </button>
                            <button
                              type="button"
                              className="relative rounded-md bg-bg_white  border-secondary hover:border-secondary_dark border-2 font-bold p-1 hover:text-secondary_dark text-secondary hover:bg-opacity-90 hover:text-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                              onClick={handleSubmit}
                            >
                              <PencilSquareIcon className="w-6 h-6 " />
                            </button>
                            <button
                              type="button"
                              className="relative rounded-md bg-bg_white  border-secondary hover:border-secondary_dark border-2 font-bold hover:text-secondary_dark text-secondary hover:bg-opacity-90 hover:text-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                              onClick={handleSubmit}
                            >
                              <XMarkIcon className="w-8 h-8 " />
                            </button>
                          </div>
                        }
                      </div>
                    )
                )
              ) : participantes ? (
                participantes.map((participante) => (
                  <div
                    key={participante.id}
                    className="border border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center"
                  >
                    <div className="flex space-x-4 mt-2 text-center">
                      <h3 className="font-semibold w-36 text-color_primary">
                        {participante.jugador.nombre}
                      </h3>
                      <p className="text-color_secondary w-24">
                        <span className="font-bold"></span>{" "}
                        {participante.jugador.telefono}
                      </p>
                      <p className="text-color_secondary w-60">
                        <span className="font-bold"></span>{" "}
                        {participante.jugador.email}
                      </p>
                      <p className="text-color_primary w-36">
                        <span className="font-extrabold"></span>{" "}
                        {participante.rol.nombre}
                      </p>
                    </div>
                    { partida.estado === 'Espera' && 
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="relative rounded-md bg-bg_white  border-secondary hover:border-secondary_dark border-2 font-bold hover:text-secondary_dark text-secondary hover:bg-opacity-90 hover:text-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          onClick={handleSubmit}
                        >
                          <XMarkIcon className="w-8 h-8 " />
                        </button>
                      </div>
                    }
                  </div>
                ))
              ) : (
                <p>No hay participantes registrados en la partida aún</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
