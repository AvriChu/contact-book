import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import numberList from '../numbersList';

const RestorePage = () => {
  const [isLoading, useIsLoading] = useState(1);
  const [contactsData, setContactsData] = useState({});
  const [restoreContact, setRestoreContact] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    useIsLoading(1);
    const data = localStorage.getItem('contacts');
    let contacts = data ? JSON.parse(data) : numberList;
    if (!data) {
      localStorage.setItem('contacts', JSON.stringify(numberList));
    }
    setContactsData(contacts);
    let found = null;
    Object.values(contacts).forEach(list => {
      list.forEach(contact => {
        if (contact.restore === false) {
          found = contact;
        }
      });
    });
    setRestoreContact(found);
    setTimeout(() => {
      useIsLoading(0);
    }, 1000);
  }, []);
  const handleRestore = () => {
    const updated = { ...contactsData };
    for (const letter in updated) {
      const index = updated[letter].findIndex(c => c.restore === false);
      if (index !== -1) {
        updated[letter][index] = {
          ...updated[letter][index],
          restore: true,
        };
        break;
      }
    }
    setContactsData(updated);
    localStorage.setItem('contacts', JSON.stringify(updated));
    setRestoreContact(null);
  };
  return (
    <div className='restore-page'>
      <Loading load={isLoading} />
      <div className='back-bur'>
        <button type='button'>
          <svg className='icon-back' onClick={() => navigate('/')}>
            <use href='../img/symbol-defs.svg#icon-back'></use>
          </svg>
        </button>
      </div>
      {restoreContact ? (
        <div className='restore-contact-bur'>
          <div className='interaction-buttons'>
            <button type='button' onClick={handleRestore}>
              <svg className='restore-icon'>
                <use href='../img/symbol-defs.svg#icon-restore'></use>
              </svg>
            </button>
          </div>
          <div className='all-info'>
            <div className='name-info'>
              <svg className='accaunt-icon'>
                <use href='../img/symbol-defs.svg#icon-accaunt'></use>
              </svg>
              <p>{restoreContact.name}</p>
            </div>
            <div className='number-info'>
              <svg className='phone-icon'>
                <use href='../img/symbol-defs.svg#icon-phone'></use>
              </svg>
              <p>{restoreContact.number}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='restore-tittle'>
          <h2>Видалених</h2>
          <p>контактів немає!</p>
        </div>
      )}
    </div>
  );
};

export default RestorePage;
