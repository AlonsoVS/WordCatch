import { FC, useContext } from "react";
import { GameContext } from "../Game";
import { PlayTurn } from "../Player";

type Props = {
  onPlayTurn:Function,
  playingTurn:boolean,
  id:number,
  turn:PlayTurn,
  wordsToCatch:number
}

const CPUPlayer = ({ onPlayTurn, playingTurn, id, turn, wordsToCatch }:Props) => {
  const wordsToBeSelected = wordsToCatch;
  
  const playWords = (words:Array<any>) => {
    console.log('Words selected');
    onPlayTurn({ ...turn, words }, id);
  }

  const getRandomInt = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const selectWords = (words:any) => {
    let index:Array<number> = [];
    while (index.length < wordsToBeSelected) {
      const idx:number = getRandomInt(0, words.length);
      if (index.indexOf(idx) === -1) {
        index.push(idx);
      }
    }
    return index.map(i => words[i]);
  }

  const autoSelect = () => {
    playingTurn && playWords(selectWords(turn.words));
  }

  return autoSelect();
}

export default CPUPlayer;
