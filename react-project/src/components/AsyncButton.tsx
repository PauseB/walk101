import React, { ButtonHTMLAttributes, useState } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClickAsync: () => Promise<any>,
}

const AsyncButton: React.FC<Props> = ({ children, onClickAsync, ...props }) => {
  const [isAwaiting, setIsAwaiting] = useState(false)

  const { onClick, disabled, ...otherProps } = props

  return (
    <button 
      onClick={e => {
        onClick && onClick(e)
        setIsAwaiting(true)
        onClickAsync().finally(() => setIsAwaiting(false))
      }}
      disabled={disabled || isAwaiting}
      {...otherProps}
    >
      {
        isAwaiting
        ? <span className='loading loading-spinner'/>
        : children
      }
    </button>
  );
};

export default AsyncButton;