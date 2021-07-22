import React, { FC, useState } from 'react';
import { useTheme } from 'styled-components';
import { ButtonInput, DefinitionContainer, DefinitionMarker, 
          PartOfSpeech, WordContainer, WordForm } from './gameRoomUtils/GuessViewUtils';

type Props = {
  defWord:any,
  sendWord:Function,
  disabled:boolean
}

const GuessWordItem:FC<Props> = ({ defWord, sendWord, disabled }) => {
  const appTheme = useTheme();
  const [word, setWord] = useState<string>('');

  const handleSubmit = (event:any) => {
    if (word.length > 0) sendWord({...defWord, word});
    else alert('You must write a word');
    event.preventDefault();
  }

  const handleChange = (event:any) => {
    setWord(() => event.target.value);
    event.preventDefault();
  }

  return (
    <WordContainer>
      <PartOfSpeech theme={appTheme}>{defWord.partOfSpeech}</PartOfSpeech>
      {defWord.definitions.map((definition:any, index:number) => 
        <DefinitionContainer key={`${defWord.id}-def-${index}`}>
          <DefinitionMarker theme={appTheme}>Def.</DefinitionMarker>
          {definition.definition}
        </DefinitionContainer>)}
      <WordForm theme={appTheme} onSubmit={handleSubmit}>
        <input
          disabled={disabled}
          name='Word Field'
          type='text'
          onChange={handleChange}
          value={word}
          placeholder='Write the word'
        />
        <ButtonInput type='submit' value='Done' disabled={disabled}/>
      </WordForm>
    </WordContainer>
  )
}

export default GuessWordItem;
