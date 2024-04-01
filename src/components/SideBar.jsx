import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CameraIcon } from '@heroicons/react/24/solid';

const SideBar = ({ navLinks }) => {
  const location = useLocation();

  return (
    <aside className="bg-white text-dark w-72 min-h-[calc(100vh)] font-bold drop-shadow-lg">
      <div className="mb-8 text-primary shadow-md p-6 px-5">
        <h2 className="text-2xl font-bold flex items-center">
          <span>
            <CameraIcon className="h-9 w-9 mr-2" />
          </span>
          &nbsp;
          PhotoEvent
        </h2>
      </div>
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to} className="my-1 mx-2">
              <Link
                to={link.to}
                className={`p-3 flex items-center rounded-md ${location.pathname === link.to ? 'bg-primary text-white bg-opacity-100' : 'hover:bg-primary_light bg-opacity-100'}`}
              >
                {link.icon && <span className="h-5 w-5 mr-2">{link.icon}</span>}
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;

SideBar.propTypes = {
  navLinks: PropTypes.array.isRequired,
};


