import { useState } from 'react';
import DeleteBur from '../components/DeleteBur';
import { useNavigate } from 'react-router-dom';

const AllActiveNumbers = ({ contacts, letter, onDelete }) => {
  const [activeContact, setActiveContact] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  if (!contacts) return null;
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setActiveContact(null);
    }, 200);
  };
  return (
    <div className='all-active-contact-bur'>
      {contacts
        .map((contact, index) => ({ contact, index }))
        .filter(item => item.contact.restore)
        .map(({ contact, index }) => (
          <div key={index} className='active-contact-bur'>
            <div className='interaction-buttons'>
              <button
                type='button'
                onClick={() => {
                  setActiveContact(contact);
                  setActiveIndex(index);
                  setIsOpen(true);
                }}
              >
                <svg className='trash-icon'>
                  <use href='/img/symbol-defs.svg#icon-trash'></use>
                </svg>
              </button>
              <button
                type='button'
                onClick={() => {
                  navigate(`/edit/${letter}/${index}`);
                }}
              >
                <svg className='edit-icon'>
                  <use href='/img/symbol-defs.svg#icon-edit'></use>
                </svg>
              </button>
            </div>
            <div className='all-info'>
              <div className='name-info'>
                <svg className='accaunt-icon'>
                  <use href='/img/symbol-defs.svg#icon-accaunt'></use>
                </svg>
                <p>{contact.name}</p>
              </div>

              <div className='number-info'>
                <svg className='phone-icon'>
                  <use href='/img/symbol-defs.svg#icon-phone'></use>
                </svg>
                <p>{contact.number}</p>
              </div>
            </div>
          </div>
        ))}
      <DeleteBur
        isOpen={isOpen}
        onClose={handleClose}
        name={activeContact?.name}
        index={activeIndex}
        letter={letter}
        onDelete={onDelete}
      />
    </div>
  );
};

export default AllActiveNumbers;
