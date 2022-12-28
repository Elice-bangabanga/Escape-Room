import React from 'react';

const DecreaseButton = ({ level, setLevel }) => {
  const MAX_LEVEL = 6;
  return (
    <div className='w-[35px] h-[35px] p-1 rounded-lg bg-white border-dotted border-2 shadow-xl mr-1'>
      <button
        type='button'
        onClick={() => {
          if (level < MAX_LEVEL) setLevel(level + 1);
        }}>
        <img src={`${process.env.PUBLIC_URL}/images/icon/minus.png`} alt='minus' />
      </button>
    </div>
  );
};

const IncreaseButton = ({ level, setLevel }) => {
  return (
    <div className='w-[35px] h-[35px] p-1 rounded-lg bg-white border-dotted border-2 shadow-xl'>
      <button
        type='button'
        onClick={() => {
          setLevel(level - 1);
        }}>
        <img src={`${process.env.PUBLIC_URL}/images/icon/plus.png`} alt='plus' />
      </button>
    </div>
  );
};

export const ResizeButtonContainer = ({ level, setLevel }) => {
  return (
    <div className='flex absolute bottom-2 right-2 z-10'>
      <DecreaseButton level={level} setLevel={setLevel}></DecreaseButton>
      <IncreaseButton level={level} setLevel={setLevel}></IncreaseButton>
    </div>
  );
};
