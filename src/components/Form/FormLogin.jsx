import {useState} from 'react'
import PropTypes from 'prop-types'


// eslint-disable-next-line react/prop-types
export const FormLogin = ({fields = [], initialValues = {} , button = '', getValues}) => {

  const [formValues, setFormValues] = useState(initialValues);
  
  //para que se pueda inscribir en sus inputs
  const handleInputChange = ({target}) => {
    const { name, value } = target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const onFormSubmit = (e)=>{
    e.preventDefault();
    getValues(formValues);
    setFormValues(initialValues)
  }
  return (
    <form onSubmit={onFormSubmit} >  
      {
        fields.map((field, i)=>(
          <div className='' key={i}>
            <label className='block mb-2'>{field.label}</label>
            <input className="border border-gray-300 px-3 py-2 w-full rounded-md" type={field.type} 
            name={field.name} 
            value={formValues[field.name]}
            placeholder={"Introduce tus datos.."}
            onChange={handleInputChange}
            />
          </div>
        ))
      }
      <input className="bg-primary rounded-md p-2 mt-10 text-white font-semibold w-full"  type="submit" value={button} />
    </form>
  )
}

FormLogin.proptypes = {
  fields: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  button: PropTypes.string.isRequired,
  getValues: PropTypes.func
}
