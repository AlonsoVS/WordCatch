import { useState } from "react";

export type PlayerData = {
  userId:string
  roomId:string
}

const UserRoomDataView = ({ onDataSubmit, action }:{onDataSubmit:Function, action:string}) => {
  const [userId, setUserId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  const handleDataSubmit = (e:any) => {
    e.preventDefault();
    onDataSubmit({
      userId,
      roomId,
    });
  }
  const handleUserIdCange = (e:any) => {
    e.preventDefault();
    setUserId(() => e.target.value);
  }
  const handleRoomIdChange = (e:any) => {
    e.preventDefault();
    setRoomId(() => e.target.value);
  }
  return (
    <div>
      <h2>{`${action} room`}</h2>
      <form onSubmit={handleDataSubmit}>
        <input type='text' placeholder='Insert a userID' value={userId} onChange={handleUserIdCange}/>
        <input type='text' placeholder='Insert a roomID' value={roomId} onChange={handleRoomIdChange}/>
        <input type='submit' value={action}/>
      </form>
    </div>
  )
}

export default UserRoomDataView;
