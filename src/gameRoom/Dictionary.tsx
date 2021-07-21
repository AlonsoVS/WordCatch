import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../utils/Button';
import DictionaryItem from './DictionaryItem';
import WithSelect from './WithSelect';

type Meaning = {
  partOfSpeech:string,
  definitions: Array<Object>
}

type WordDef = {
  word:string,
  phonetics:Array<Object>,
  meanings:Array<Meaning>
};

type Props = {
  onSelectedDone:Function
}

const DictionaryContainer = styled.div`
  height: 70%;
  width: 60%;
  background: white;
  border-radius: 22px;
  padding: 1.5rem;
  overflow: hidden
`
const WordsContainer = styled.div`
  overflow: auto;
  height: 85%;
  border-radius: 22px;
  ::-webkit-scrollbar-track{
    background: #f6a03c;
    border-radius: 100px;
  };
  ::-webkit-scrollbar-thumb {
    background: #003459;
    border-radius: 100px;
    width: 8px;
    background-clip: content-box;
    border: 2px solid transparent;
  };
  ::-webkit-scrollbar {
    width: 8px;
    /* background: #f6a03c; */
    /* border-radius: 20px; */
  };
`
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 15%;
  padding: 0.4rem;
  overflow: hidden;
`

const DicButton = styled(Button)`
  background: ${props => props.selected?'#ffa13d':'#007ea7'};
  color: white;
  font-size: small;
  font-weight: bold;
  margin: 0.1rem;
  padding: 0.6rem;
  width: 32px;
  height: fit-content;
  &:hover {
    background: #ffa13d;
  }
`
const ActionButton = styled(DicButton)`
  display: flex;
  justify-content: center;
  padding: 0.4rem 1rem;
  min-width: 50px;
  max-width: 60px;
  width: min-content;
  &:focus {
    none
  }
`

const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%
`

const LetterButtonsContainer = styled.div`
  display: block;
  overflow: auto
`

const ShowingLetterTitle = styled.span`
  color: white;
  font-size: xxx-large;
  margin: 1rem;
  text-transform: uppercase;
`

const Dictionary:FC<Props> = ({ onSelectedDone }) => {
  const shouldWordsSelect = 6;

  const [wordsDef, setWordsDef]  = useState<Array<WordDef>>([]);

  const [showingLetter, setShowingLetter] = useState<string>('a');

  useEffect(() => {
    setWordsSelected(() => []);
  }, [showingLetter])

  const [letterButtons, setLetterButtons] = useState<Array<string>>([]);

  const [wordsByLetterShowing, setWordsByLetterShowing] = useState<Array<string>>([]);

  const [wordsSelected, setWordsSelected] = useState<Array<any>>([]);

  const REQUEST_URL:string = 'https://api.dictionaryapi.dev/api/v2/entries/es/';

  const getByLetterStart = (dictionary:any):Function => {
    return (letter:string):Array<string> => dictionary[letter];
  }

  const changeLetterShowing:Function = (letter:string) => {
    setShowingLetter(() => letter);
  }

  const getDefinition:Function = (url:string):Function => {
    return async (word:string):Promise<Object> => {
      let definition:any = null;
      await axios
        .get(url.concat(word))
        .then(response => {
          definition = response.data;
        })
        .catch(error => {console.log("An error has occurred loading word definition", error)});
      return definition;
    }
  }

  const getWordsWithDef = (words:Array<string>) => async (maxWords:number, startIndex:number) => {

    const max:number = maxWords;

    let startIdx = startIndex;
    let endIdx = startIndex + max;

    let defs:Array<WordDef> = [];

    const definitionES:Function = getDefinition(REQUEST_URL);

    while (defs.length < max && words.length > 0) {
      const wordsShowing:Array<string> = words.slice(startIdx, endIdx);
      const definitions:Array<Promise<any>> = wordsShowing
        .map(word => definitionES(word));
    
      await Promise.all(definitions).then(response => {
        const found = response.filter(word => word !== null).map(word => word[0]);
        const rest = max - defs.length;
        defs = defs.concat(found.filter((word, index) => index < rest));
      });
      startIdx += max;
      endIdx += max;
    }
    return defs;
  }

  const handleShowMoreWords = (wordsByLetter:Array<string>) => {
    const lastWordShowing = wordsDef[wordsDef.length - 1];
    const startIndex = wordsByLetter.indexOf(lastWordShowing.word) + 1;
    const definitions:Promise<Array<WordDef>> = getWordsWithDef(wordsByLetter)(5, startIndex);
    definitions.then(defsToShow => {
      setWordsDef(() => wordsDef.concat(defsToShow));
    });
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/data').then(response => {
      const words = response.data;

      (letterButtons.length === 0) && setLetterButtons(() => Object.keys(words));

      const wordsByLetterStart:Array<string> = getByLetterStart(words)(showingLetter);

      const definitions:Promise<Array<WordDef>> = getWordsWithDef(wordsByLetterStart)(10, 0);
      definitions.then(defsToShow => {
        setWordsDef(() => defsToShow);
      });

      setWordsByLetterShowing(() => wordsByLetterStart);
    });
  }, [showingLetter]);

  const extractDefinition:Function = (word:WordDef):Object => {
    let def:Object = { word: word.word };
    word.meanings.forEach(meaning => {
      def = { ...def, ...meaning }
    })
    return def;
  }

  const isWordSelected = (word:any) => {
    return wordsSelected.some(item => item.id === word.id);
  }

  const handleWordSelect = (word:any, selected:boolean) => {
    if (selected) {
      if (wordsSelected.length < shouldWordsSelect) {
        setWordsSelected(() => new Array<any>(...wordsSelected, word));
      } else {
        alert(`You must select only ${shouldWordsSelect} words!`);
      }
    } else if (wordsSelected.length > 0) {
        if (wordsSelected.find(element => element.word === word.word)) {
          setWordsSelected(
            () => wordsSelected.filter(element => element.word !== word.word)
          );
        }
    }
  }

  const handleDone = () => {
    if (wordsSelected.length < shouldWordsSelect) {
      alert(`You must select ${shouldWordsSelect} words`);
    } else if (wordsSelected.length > 0) {
      onSelectedDone(wordsSelected);
    } else {
      alert("No words to send");
    }
  }

  return (
    <>
      <ShowingLetterTitle>{showingLetter}</ShowingLetterTitle>
      <DictionaryContainer>
        <WordsContainer>
          {wordsDef.map((wordDef, idx:number) => {
            const id = `${showingLetter}-dic-item-${idx}`;
            const word = {...extractDefinition(wordDef), id };
            const props = {...word, selected: isWordSelected(word) };
            return (
              <WithSelect key={id} onSelect={handleWordSelect}>
                <DictionaryItem { ...props } />
              </WithSelect>
            );
          })}
        </WordsContainer>
        <ButtonsContainer>
          <LetterButtonsContainer>
            {letterButtons.map((letter, idx) => {
              return (
                <DicButton
                  key={idx} 
                  selected={letter === showingLetter} 
                  onClick={()=>changeLetterShowing(letter)}
                >
                  {letter}
                </DicButton>
              )
            })}
          </LetterButtonsContainer>
          <ActionButtonsContainer>
            <ActionButton onClick={() => handleShowMoreWords(wordsByLetterShowing)}>
              Show More
            </ActionButton>
            <ActionButton onClick={handleDone}>
              Done
            </ActionButton>
          </ActionButtonsContainer>
        </ButtonsContainer>
      </DictionaryContainer>
    </>
  );
}

export default Dictionary;