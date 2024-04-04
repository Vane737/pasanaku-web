import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'monedaId') {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value.id  // Solo guardar el ID de la moneda
      }));
    } else if (name === 'lapso') {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value.nombre  // Solo guardar el nombre del lapso
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};


// import { useState } from "react";


// export const useForm = ( initialForm = {} ) => {
  
//     const [ formState, setFormState ] = useState( initialForm );

//     // const onInputChange = ({ target }) => {
//     //     const { name, value } = target;
//     //     setFormState({
//     //         ...formState,
//     //         [ name ]: value
//     //     });
//     // }
//     const onInputChange = (e) => {
//         const { name, value } = e.target;
      
//         if (name === 'idMoneda') {
//           setFormState((prevState) => ({
//             ...prevState,
//             [name]: value.id  // Solo guardar el ID de la moneda
//           }));
//         } else if (name === 'lapso') {
//           setFormState((prevState) => ({
//             ...prevState,
//             [name]: value.nombre  // Solo guardar el nombre del lapso
//           }));
//         } else {
//           setFormState((prevState) => ({
//             ...prevState,
//             [name]: value
//           }));
//         }
//       };

//     const onResetForm = () => {
//         setFormState( initialForm );
//     }

//     return {
//         ...formState,
//         formState,
//         onInputChange,
//         onResetForm,
//     };
// }