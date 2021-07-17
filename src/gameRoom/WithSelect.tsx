import { cloneElement, FC, ReactElement, useEffect, useState } from "react";

type Props = {
  children:any,
  onSelect:Function
}

const WithSelect:FC<Props> = ({children, onSelect}) => {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => setSelected(() => !selected);    
  useEffect(() => {
    onSelect(children.props, selected);
  }, [selected]);

  return (
    <div onClick={handleSelect} key={children.props.id}>
      {cloneElement(children, {selected:selected})}
    </div>
  )
}

export default WithSelect;