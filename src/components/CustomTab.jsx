import { useState } from 'react'
import PropTypes from 'prop-types';
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CustomTab = ({ categories, onClickInvite, onClickPart }) => {
  const [selected, setSelected] = useState(categories[0]);
  console.log(selected);
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-md  border-bg_gray border-2 bg-secondary/30 p-1">
        {categories.map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                'w-full rounded-md py-2 px-10 text-sm font-bold leading-5 ',
                'ring-white/50 ring-offset-2 ring-offset-secondary_dark focus:outline-none focus:ring-2',
                selected
                  ? 'bg-secondary/40 text-secondary_dark shadow'
                  : 'text-secondary_dark hover:bg-white/[0.12] hover:text-secondary'
              )
            }
            onClick={() => {
              setSelected(category);
              selected === 'Invitados' ? onClickInvite() : onClickPart();
            }}
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
  
};
CustomTab.propTypes = {
  categories: PropTypes.array.isRequired,
  onClickInvite: PropTypes.func.isRequired,
  onClickPart: PropTypes.func.isRequired,
}; 
export default CustomTab;