import { FC, useState } from 'react'
import styled from 'styled-components';

type Props = {
  defWord:any,
  sendWord:Function,
  disabled:boolean
}

const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin: 0.8rem 0;
  padding: 0 1rem;
  width: 100%;
`

const PartOfSpeech = styled.span`
  align-self: center;
  background: #ffa13d;
  border-radius: 10px;
  height: fit-content;
  color: white;
  font-size: xx-small;
  letter-spacing: 0.02rem;
  margin: 0.5rem;
  padding: 0.4rem;
  text-transform: uppercase;
  width: fit-content;
`

const DefinitionContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
`

const DefinitionMarker = styled.span`
  align-items: flex-start;
  color: black;
  display: flex;
  font-size: x-small;
  font-weight: bold;
  margin: 0.3rem 0.8rem;
`

const WordForm = styled.form`
  display: flex;
  flex-direction: row;
  height: fit-content;
  margin: 0.5rem;
  input {
    border: 1px solid;
    border-radius: 10px;
    height: 40px;
    margin: 0.4rem 0.4rem 0;
    padding: 0.5rem;
    width: 100%;
    &:focus, &:hover {
      border: 1px solid #ffa13d;
      border-radius: 10px;
      outline: none;
    };
  };
`

const ButtonInput = styled.input`
  background: #007ea7;
  color: white;
  cursor: pointer;
  width: 10% !important;
  &:focus, &:hover {
    background: #ffa13d
  }
`

const GuessWordItem:FC<Props> = ({ defWord, sendWord, disabled }) => {
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
      <PartOfSpeech>{defWord.partOfSpeech}</PartOfSpeech>
      {defWord.definitions.map((definition:any, index:number) => 
        <DefinitionContainer key={`${defWord.id}-def-${index}`}>
          <DefinitionMarker>Def.</DefinitionMarker>
          {definition.definition}
        </DefinitionContainer>)}
      <WordForm onSubmit={handleSubmit}>
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

export default GuessWordItem
