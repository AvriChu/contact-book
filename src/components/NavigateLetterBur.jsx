import { useState } from 'react';

const NavigateLetterBur = props => {
  const [activeLetter, setActiveLetter] = useState(null);

  return (
    <div className='navigate-letter-bur'>
      {props.letterList.map(letter => (
        <a
          key={letter}
          href={'#' + letter}
          onClick={() => setActiveLetter(letter)}
          className={activeLetter === letter ? 'active' : ''}
        >
          {letter}
        </a>
      ))}
    </div>
  );
};
export default NavigateLetterBur;
