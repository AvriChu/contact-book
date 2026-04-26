import NavigateLetterBur from '../components/NavigateLetterBur';
import AllActiveNumbers from '../components/AllActiveNumbers';
import AddAndRestoreBtns from '../components/AddAndRestoreBtns';
import Loading from '../components/Loading';
import numberList from '../numbersList';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [contactsData, setContactsData] = useState({});
  const [isLoading, useIsLoading] = useState(1);
  useEffect(() => {
    useIsLoading(1);
    const data = localStorage.getItem('contacts');
    if (data) {
      setContactsData(JSON.parse(data));
    } else {
      localStorage.setItem('contacts', JSON.stringify(numberList));
      setContactsData(numberList);
    }
    setTimeout(() => {
      useIsLoading(0);
    }, 1000);
  }, []);
  const alphabet = [
    'а',
    'б',
    'в',
    'г',
    'ґ',
    'д',
    'е',
    'є',
    'ж',
    'з',
    'і',
    'ї',
    'й',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'ю',
    'я',
  ];
  const handleDelete = (letter, index) => {
    const updated = { ...contactsData };
    Object.keys(updated).forEach(key => {
      updated[key] = updated[key].filter(c => c.restore !== false);
    });
    updated[letter] = updated[letter].map((c, i) =>
      i === index ? { ...c, restore: false } : c,
    );
    setContactsData(updated);
    localStorage.setItem('contacts', JSON.stringify(updated));
  };
  return (
    <div className='all-home-page'>
      <Loading load={isLoading} />
      <NavigateLetterBur letterList={alphabet} />
      {alphabet.map(letter => (
        <div key={letter}>
          <p id={letter} className='letter-number'>
            {letter}
          </p>
          <AllActiveNumbers
            contacts={contactsData[letter]}
            letter={letter}
            onDelete={handleDelete}
          />
        </div>
      ))}
      <AddAndRestoreBtns />
    </div>
  );
};

export default HomePage;
