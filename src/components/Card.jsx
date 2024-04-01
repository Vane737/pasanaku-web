// eslint-disable-next-line react/prop-types
const Card = ({ imageSrc, title, description, price, onClick }) => {
    return (
        <div className="w-52 rounded-xl overflow-hidden shadow-lg hover:bg-emerald-50" onClick={onClick}>
        <img className="w-52 h-56 object-cover" src={imageSrc} alt="Card" />
        <div className="px-2 py-1">
            <div className="font-bold font-serif text-dark text-sm">{title}</div>
            <p className="text-gray-700 font-serif  text-base">{description}</p>
            <p className="text-gray-700 font-[system-ui] text-base">{price}</p>
        </div>
        </div>
    );
};

  export default Card;