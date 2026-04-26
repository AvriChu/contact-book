const DeleteBur = ({ isOpen, onClose, name, index, letter, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(letter, index);
    onClose();
  };
  return (
    <div
      className={`dark-background ${isOpen ? 'show' : ''}`}
      onClick={onClose}
    >
      <div
        className={`want-delete-bur ${isOpen ? 'show' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <h2>Ви впененні,</h2>
        <p>що хочете видалити {name} з книги? </p>
        <div className='action-buttons'>
          <button
            className='check-button'
            type='button'
            onClick={handleDeleteClick}
          >
            <svg className='check-icon'>
              <use href='/img/symbol-defs.svg#icon-check'></use>
            </svg>
          </button>
          <button className='cross-button' type='button' onClick={onClose}>
            <svg className='cross-icon'>
              <use href='/img/symbol-defs.svg#icon-cross'></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteBur;
