import React, { FC, useState } from "react";
import { ButtonInput, GuessTitle, WordForm } from "./GuessViewUtils";

export type PlayerData = {
  userId:string
  roomId:string
}

type Props = {
  onDataSubmit:Function, 
  action:string, 
  dataType:string
}

const Title = GuessTitle;

const UserRoomDataView:FC<Props> = ({ onDataSubmit, action, dataType }) => {
  const [data, setData] = useState<string>('');

  const handleDataSubmit = (e:any) => {
    e.preventDefault();
    onDataSubmit({
      [dataType]:data
    });
  }
  const handleDataChange = (e:any) => {
    e.preventDefault();
    setData(() => e.target.value);
  }

  const titleField = dataType === 'userId'? 'Player Name':'Room Name';
  return (
    <>
      <Title>{titleField}</Title>
      <WordForm onSubmit={handleDataSubmit}>
        <input 
          type='text' 
          placeholder={`Insert a ${titleField}`} 
          value={data} 
          onChange={handleDataChange}/>
        <ButtonInput type='submit' value={action}/>
      </WordForm>
    </>
  )
}

export default UserRoomDataView;
