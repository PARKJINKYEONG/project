import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import { DraggableItem } from "./draggableItem";


const getItems = [{id: "1", content: "교통순", contents: [10,30], type: "range"}, {id: "2", content: "거리순", contents: [100,1000], type: "range"}, {id: "3", content: "가격순", contents: [100000,200000], type: "range"}, {id: "4", content: "평가순", contents: [1,2,3,4,5] , type: "dropdown"}]

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgrey" : "white",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%",
});

export default function ProgressPlan3() {
  const [items, setItems] = useState(getItems);

  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  }, [items]);

  return <>
    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable  key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <IconButton {...provided.dragHandleProps}>
                      <MenuIcon/>
                    </IconButton>
                    <DraggableItem content={item.content} contents={item.contents} type={item.type}></DraggableItem>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </>
}
