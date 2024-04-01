import PropTypes from 'prop-types'


// eslint-disable-next-line react/prop-types
export const MyModalMessage = ({estados, Text}) => {
  const onClickAccept = (IsOpen,IsAccept)=>{
    estados({
      open:IsOpen,
      accept:IsAccept
    })
  }
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-1/3 p-5 rounded-2xl flex flex-col justify-center items-center gap-4">
        <div>
          <p className='font-semibold'>{Text}</p>
        </div>
        <div className="flex justify-around w-full">
          <button className='bg-primary p-2 rounded-2xl font-bold text-dark' onClick={()=>onClickAccept(false,true)}>Aceptar</button>
        </div>
      </div>
    </div>
  )
}

MyModalMessage.proptypes = {
  estados: PropTypes.func.isRequired,
  Text: PropTypes.string.isRequired
}