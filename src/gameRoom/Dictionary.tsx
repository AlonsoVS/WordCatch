import React from 'react';

const Dictionary:React.FC = () => {

  const REQUEST_URL:string = 'https://api.dictionaryapi.dev/api/v2/entries/es/';

  const words:Array<string> = [ 'aarónico', 'aaronita', 'aba', 'ababa', 'ababillarse',
                                'ababol', 'abacá','abacal', 'abacalero', 'abacería' ];

  return (
    <div>
      <dl>
        {words.map(word => (
          <>
            <dt>{word}</dt>
            <dd>{`${REQUEST_URL}${word}`}</dd>
          </>
        )
        )}
      </dl>
    </div>
  );
}

export default Dictionary;