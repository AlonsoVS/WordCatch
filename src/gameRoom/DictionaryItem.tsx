import React, { FC } from 'react'

type Definition = {
  antonyms:Array<string>,
  definition:string,
  synonyms:Array<string>
}

type Item = {
  word: string,
  definitions: Array<Object>,
  partOfSpeech: string
}

type Props = {
  word: string,
  definitions: Array<Definition>,
  partOfSpeech: string,
  selected?:boolean,
  id:number
}

const DictionaryItem:FC<Props> = ({ word, definitions, partOfSpeech , selected, id}) => {

  let background = 'green';
  if (selected) background = 'green';
  else background = 'transparent';

  return (
    <div style={{
      border: '1px solid #4d4d4d',
      borderRadius: '12px',
      margin: '1rem',
      padding: '1rem',
      cursor: 'pointer',
      background: background
    }}
    key={id}
    >
      <dt>
        {word}
      </dt>
      <li>
        {partOfSpeech}
      </li>
      {definitions.map((def, index) => <dd key={index}>{def.definition}</dd>)}
    </div>
  )
}

export default DictionaryItem;
