import { useNavigate } from 'react-router-dom';

const AddAndRestoreBtns = () => {
  const navigate = useNavigate();
  return (
    <div className='main-btns'>
      <button
        type='button'
        className='add-button'
        onClick={() => navigate('/create')}
      >
        <svg className='plus-icon'>
          <use href='../img/symbol-defs.svg#icon-plus'></use>
        </svg>
      </button>
      <button
        type='button'
        className='restore-button'
        onClick={() => navigate('/restore')}
      >
        <svg className='restore-icon'>
          <use href='../img/symbol-defs.svg#icon-restore'></use>
        </svg>
      </button>
    </div>
  );
};
export default AddAndRestoreBtns;
