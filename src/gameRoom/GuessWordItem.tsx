import { FC, useState } from 'react'

type Props = {
  defWord:any,
  sendWord:Function,
  disabled:boolean
}

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
    <div>
      {defWord.definitions.map((definition:any, index:number) => <dd key={`${defWord.id}-def-${index}`}>{definition.definition}</dd>)}
      <form onSubmit={handleSubmit}>
        <input
          disabled={disabled}
          name='Word Field'
          type='text'
          onChange={handleChange}
          value={word}
          placeholder='Write the word'
        />
        <input type='submit' value='Done' disabled={disabled}/>
      </form>
    </div>
  )
}

export default GuessWordItem
