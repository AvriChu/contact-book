import { useEffect, useRef, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Loading from '../components/Loading';
import numberList from '../numbersList';
import { useNavigate } from 'react-router-dom';

const CreateContactBur = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneInfo, setPhoneInfo] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameInfo, setNameInfo] = useState('');
  const [nameError, setNameError] = useState('');
  const [createdInfo, setCreatedInfo] = useState(false);
  const [isLoading, useIsLoading] = useState(1);
  const formRef = useRef();
  const navigate = useNavigate();
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
  useEffect(() => {
    useIsLoading(1);
    setTimeout(() => {
      useIsLoading(0);
    }, 1000);
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  }, []);

  const changeNumber = value => {
    setPhoneInfo(value);
    if (!value) {
      setPhoneError('');
      return;
    }
    setPhoneError(isValidPhoneNumber(value) ? '' : 'Невірний номер!');
  };
  const changeName = () => {
    const value = formRef.current.name.value;
    setNameInfo(value);
    const hasSpace = /^\s|\s$/.test(value);
    const firstLetter = value.charAt(0).toLowerCase();
    if (hasSpace) {
      setNameError("Ім'я не має мати пробіли на початку або в кінці!");
      return;
    }
    if (alphabet.indexOf(firstLetter) === -1 && value.length >= 1) {
      setNameError("Ім'я не може починатися з такої букви!");
      return;
    }
    if (value.length >= 2 && value.length <= 15) {
      setNameError('');
      return;
    }
    setNameError('Має бути 2-15 символів!');
  };
  const submitFun = event => {
    event.preventDefault();
    if (createdInfo) {
      return;
    }
    if (!phoneInfo) {
      setPhoneError('Введіть номер!');
      return;
    }
    if (!nameInfo) {
      setNameError("Введіть ім'я!");
      return;
    }
    if (!isValidPhoneNumber(phoneInfo)) {
      setPhoneError('Невірний номер!');
      return;
    }
    const finishedName = nameInfo.charAt(0).toUpperCase() + nameInfo.slice(1);
    const firstLetter = finishedName.charAt(0).toLowerCase();
    const data = localStorage.getItem('contacts');
    let contacts = data
      ? JSON.parse(data)
      : JSON.parse(JSON.stringify(numberList));
    contacts[firstLetter].push({
      name: finishedName,
      number: phoneInfo,
      restore: true,
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    setPhoneError('');
    setPhoneInfo('');
    setNameError('');
    setNameInfo('');
    formRef.current.reset();
    setCreatedInfo(true);
    setTimeout(() => {
      setCreatedInfo(false);
    }, 1000);
  };
  return (
    <div className='create-contact-page'>
      <Loading load={isLoading} />
      <div className={`create-contact-bur ${isVisible ? 'active' : ''}`}>
        <button
          type='button'
          className='close-btn'
          onClick={() => navigate('/')}
        >
          <svg className='cross-icon'>
            <use href='/img/symbol-defs.svg#icon-cross'></use>
          </svg>
        </button>
        <form
          ref={formRef}
          onSubmit={submitFun}
          className='create-contact-form'
        >
          <div className='create-contact-tittle'>
            <h2>Створення</h2>
            <p>нового контакта</p>
          </div>
          <div className='create-contact-all-inputs'>
            <div className='create-contact-input'>
              <label htmlFor='name'>Ім’я</label>
              <input
                name='name'
                placeholder='Ім’я має не бути менше 2 слів'
                type='text'
                id='name'
                required
                value={nameInfo}
                onChange={changeName}
              />
              <p className='error-text' style={{ opacity: nameError ? 1 : 0 }}>
                Помилка: {nameError}
              </p>
            </div>
            <div className='create-contact-input'>
              <label htmlFor='number'>Номер телефону</label>
              <PhoneInput
                country='UA'
                defaultCountry='UA'
                value={phoneInfo}
                onChange={changeNumber}
                international={false}
                placeholder='068 000 0000'
                countryCallingCodeEditable={false}
              />
              <p className='error-text' style={{ opacity: phoneError ? 1 : 0 }}>
                Помилка: {phoneError}
              </p>
            </div>
          </div>
          <button className='create-contact-btn' type='submit'>
            {createdInfo ? (
              <svg className='check-icon'>
                <use href='/img/symbol-defs.svg#icon-check'></use>
              </svg>
            ) : (
              'Створити'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContactBur;
