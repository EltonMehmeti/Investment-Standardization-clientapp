import React from "react";
import { useDrag } from "react-dnd";
import icon from '../assests/img/draggable-svgrepo-com.png'

function ColumnTitle({ title }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "column",
    item: { title: title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "10px",
        border: isDragging ? "2px solid pink" : "2px solid #ccc",
        borderRadius: "4px",
        margin: "4px",
        cursor: "move",
      }}
      className="text-black bg-white flex flex-row justify-between"
    >
      <img  src={icon} className="w-6 h-8"/>
      {title}
    </div>
  );
}

export default ColumnTitle;
