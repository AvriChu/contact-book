const Loading = ({ load }) => {
  return (
    <div
      style={{ opacity: load, pointerEvents: load === 0 ? 'none' : 'auto' }}
      className='loading-page'
    >
      <img className='loading-icon' src='/img/icons_loading.svg'></img>
    </div>
  );
};

export default Loading;
