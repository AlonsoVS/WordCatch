import React from 'react';
import Dictionary from '../src/gameRoom/Dictionary';

const playgame:React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Dictionary/>
    </div>
  );
}

export default playgame;