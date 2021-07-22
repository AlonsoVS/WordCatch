import React, { FC } from 'react'
import { useTheme } from 'styled-components'
import { DefinitionContainer, DefinitionMarker, DictionaryItemContainer, 
        PartOSpeeshContainer, WordContainer } from './gameRoomUtils/DictionaryUtils'

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

const DictionaryItem:FC<Props> = ({ word, definitions, partOfSpeech , selected, id}) => {
  const appTheme = useTheme();
  return (
    <DictionaryItemContainer theme={appTheme} selected={selected}>
      <WordContainer theme={appTheme}>
        {word}
      </WordContainer>
      <PartOSpeeshContainer theme={appTheme} selected={selected} key={`${id}-partOSpeech`}>
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
