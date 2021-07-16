import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
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

const Dictionary:React.FC = () => {

  const [wordsDef, setWordsDef]  = useState<Array<WordDef>>([]);

  const [showingLetter, setShowingLetter] = useState<string>('a');

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
        .catch(error => {console.log("An error has occurred loadig word definition", error)});
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

  const handleWordSelect = (word:any, selected:boolean) => {
    if (selected) {
      setWordsSelected(() => new Array<any>(...wordsSelected, word));
    } else if (wordsSelected.length > 0) {
        if (wordsSelected.find(element => element.word === word.word)) {
          setWordsSelected(
            () => wordsSelected.filter(element => element.word !== word.word)
          );
        }
    }
  }

  return (
    <div style={{
      height: '65%',
      width: '60%',
      background: '#03a9f4',
      borderRadius: '12px',
      padding: '1rem',
      overflow: 'hidden'
    }}>
      <div style={{ overflow: 'auto', height: '90%' }}>
        {wordsDef.map((wordDef, idx:number) => {
          const word = extractDefinition(wordDef);
          const props = {...word, id:idx};
          return (
            <WithSelect onSelect={handleWordSelect}>
              <DictionaryItem {...props} />
            </WithSelect>
          );
        })}
      </div>
      <div style={{ margin: '1rem' }}>
        {letterButtons.map((letter, idx) => {
          return (
            <button key={idx} onClick={()=>changeLetterShowing(letter)}>
              {letter}
            </button>
          )
        })}
        <button onClick={() => handleShowMoreWords(wordsByLetterShowing)}>
          Show More
        </button>
      </div>
    </div>
  );
}

export default Dictionary;