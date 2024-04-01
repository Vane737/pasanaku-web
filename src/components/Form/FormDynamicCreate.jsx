
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from '../../hooks/useForm';

export const FormDynamicCreate = ({ fields = [], initialValues = {}, button = '', getValues, roles }) => {
  const [formValues, setFormValues] = useState({ ...initialValues, selectedOption: null });

  
  const { formState, onInputChange, onResetForm, username, email, password } = useForm({
    username: '',
    email: '',
    password: ''
  });
  const handleOptionChange = (option) => {
      // Convertir la cadena a un entero usando parseInt
    const roleId = parseInt(option, 10);

    setFormValues((prevValues) => ({
      ...prevValues,
      selectedOption: option,
      rolId: roleId, // Actualizar rolId como un entero
    }));
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  // Crear una copia del objeto formValues excluyendo el atributo selectedOption
    const formValuesWithoutSelectedOption = { ...formValues };
    delete formValuesWithoutSelectedOption.selectedOption;

    // Enviar el objeto modificado
    getValues(formValuesWithoutSelectedOption);

    // Restablecer los valores iniciales
    setFormValues(initialValues);
  };

  return (
    <form onSubmit={onFormSubmit}>
      {/* <div className="flex justify-around mb-3">
        {roles.map((role) => (
          role.name !== "Invitado" && (
            <div key={role.id} className="flex items-center">
              <input
                type="radio"
                id={`role-${role.id}`}
                name="role"
                value={role.id.toString()}
                checked={formValues.selectedOption === role.id.toString()}
                onChange={() => handleOptionChange(role.id.toString())}
                className="mr-2 "
              />
              <label htmlFor={`role-${role.id}`} className={`px-2 py-1  rounded-md ${
                formValues.selectedOption === role.id.toString() ? 'bg-secondary text-white' : 'text-primary font-bold border border-primary'
              }`}>
                {`Soy ${role.name}`}
              </label>
            </div>
          )
        ))}
      </div> */}

      {fields.map((field, i) => (
        // Excluir el campo 'rolId' para que no se muestre como entrada adicional
        field.name !== 'rolId' && (
          <div key={i}>
            <label className="block mb-2">{field.label}</label>
            <input
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
              type={field.type}
              name={field.name}
              value={formValues[field.name] || ''}
              placeholder={'Introduce tus datos..'}
              onChange={handleInputChange}
            />
          </div>
        )
      ))}

      {formValues.selectedOption === '2' && (
        <div>
          {/* Agregar campos específicos para el rol de Fotógrafo */}
          <label className="block mb-2">Especialidades Fotográficas</label>
          <input
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
            type="text"
            name="photographicSpecialties"
            value={formValues.photographicSpecialties || ''}
            placeholder={'Introduce tus especialidades fotográficas..'}
            onChange={handleInputChange}
          />
        </div>
      )}

      {formValues.selectedOption === '3' && (
        <div>
          {/* Agregar campos específicos para el rol de Organizador */}
          <label className="block mb-2">Compañía</label>
          <input
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
            type="text"
            name="company"
            value={formValues.company || ''}
            placeholder={'Introduce el nombre de la compañía..'}
            onChange={handleInputChange}
          />

          <label className="block mb-2">Dirección</label>
          <input
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
            type="text"
            name="address"
            value={formValues.address || ''}
            placeholder={'Introduce la dirección..'}
            onChange={handleInputChange}
          />
        </div>
      )}

      <input className="bg-primary rounded-md p-2 mt-3 text-white font-semibold w-full" type="submit" value={button} />
    </form>
  );

};

FormDynamicCreate.propTypes = {
  fields: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  button: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  getValues: PropTypes.func,
};

  // return (
  //   <form onSubmit={onFormSubmit}>
  //     <div className="flex justify-between mb-3">
  //       {roles.map((role) => (
  //         <div key={role.id} className="flex items-center">
  //           <input
  //             type="radio"
  //             id={`role-${role.id}`}
  //             name="role"
  //             value={role.id.toString()}
  //             checked={formValues.selectedOption === role.id.toString()}
  //             onChange={() => handleOptionChange(role.id.toString())}
  //             className="mr-2 "
  //           />
  //           <label htmlFor={`role-${role.id}`} className={`px-2 py-1  rounded-md ${
  //             formValues.selectedOption === role.id.toString() ? 'bg-secondary text-white' : 'text-primary font-bold border border-primary'
  //           }`}>
  //             {role.name}
  //           </label>
  //         </div>
  //       ))}
  //     </div>
  
  //     {fields.map((field, i) => (
  //       // Excluir el campo 'rolId' para que no se muestre como entrada adicional
  //       field.name !== 'rolId' && (
  //         <div key={i}>
  //           <label className="block mb-2">{field.label}</label>
  //           <input
  //             className="border border-gray-300 px-3 py-2 w-full rounded-md"
  //             type={field.type}
  //             name={field.name}
  //             value={formValues[field.name] || ''}
  //             placeholder={'Introduce tus datos..'}
  //             onChange={handleInputChange}
  //           />
  //         </div>
  //       )
  //     ))}
  //     <input className="bg-primary rounded-md p-2 mt-3 text-white font-semibold w-full" type="submit" value={button} />
  //   </form>
  // );