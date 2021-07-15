import React, { FC } from 'react'

type Item = {
  word: string,
  definitions: Array<Object>,
  partOfSpeech: string
}

const DictionaryItem:FC<Item> = ({word, definitions, partOfSpeech}) => {
  return (
    <div style={{
      border: '1px solid #4d4d4d',
      borderRadius: '12px',
      margin: '1rem',
      padding: '1rem'
    }}>
      <dt>
        {word}
      </dt>
      <li>
        {partOfSpeech}
      </li>
      {definitions.map(def => <dd>{def.definition}</dd>)}
    </div>
  )
}

export default DictionaryItem;
