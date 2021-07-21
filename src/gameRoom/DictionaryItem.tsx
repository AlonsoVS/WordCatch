import React, { FC } from 'react'
import styled from 'styled-components'

type Definition = {
  antonyms:Array<string>,
  definition:string,
  synonyms:Array<string>
}

type Props = {
  word: string,
  definitions: Array<Definition>,
  partOfSpeech: string,
  selected?:boolean,
  id:number
}

const DictionaryItemContainer = styled.div`
  border: 1px solid;
  border-color: ${props => props.selected?'#ffa13d':'#003459'};
  border-radius: 22px;
  background: ${props => props.selected?'#ffa13d':'transparent'};
  color: ${props => props.selected?'white':'#003459'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: large;
  margin: 1rem;
  padding: 2rem
`

const WordContainer = styled.span`
  align-items: center;
  background: #003459;
  border-radius: 12px;
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin: 1rem;
  padding: 0.2rem;
  text-transform: capitalize;
`

const PartOSpeeshContainer = styled.span`
  align-self: center;
  background: ${props  => props.selected ? '#247ea7' : '#f6a03c'};
  border-radius: 10px;
  color: white;
  font-size: xx-small;
  letter-spacing: 0.02rem;
  margin: 0.5rem;
  padding: 0.4rem;
  text-transform: uppercase;
  width: fit-content;
`

const DefinitionContainer = styled.a`
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

const DictionaryItem:FC<Props> = ({ word, definitions, partOfSpeech , selected, id}) => {
  return (
    <DictionaryItemContainer selected={selected}>
      <WordContainer>
        {word}
      </WordContainer>
      <PartOSpeeshContainer selected={selected} key={`${id}-partOSpeech`}>
        {partOfSpeech}
      </PartOSpeeshContainer>
      {definitions.map((def, index) => 
          <DefinitionContainer key={`${id}-def-${index}`}>
            <DefinitionMarker>Def.</DefinitionMarker>
            {def.definition}
          </DefinitionContainer>)}
    </DictionaryItemContainer>
  )
}

export default DictionaryItem;
