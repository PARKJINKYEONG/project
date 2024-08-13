import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, IconButton } from "@mui/material";
import { DraggableItem } from "./draggableItem";


const initItems = [{id: "0", index: "0", content: "교통순", contents: [10,30], type: "range"}, {id: "1", index: "1", content: "거리순", contents: [100,1000], type: "range"}, {id: "2", index: "2", content: "가격순", contents: [100000,200000], type: "range"}, {id: "3", index: "3", content: "평가순", contents: [1,2,3,4,5] , type: "dropdown"}]

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
  const [items, setItems] = useState(initItems);
  const [value, setValue] = useState(2);

  

  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      //잘못된 위치에 드래그시
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    console.log(result);
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
                    <Grid sx={{display:"flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Grid item xs>
                    <DraggableItem content={item.content} contents={item.contents} type={item.type} value={value} setValue={setValue}></DraggableItem>
                    </Grid>
                    <Grid>
                      <IconButton {...provided.dragHandleProps} >
                        <MenuIcon/>
                      </IconButton>
                    </Grid>
                    </Grid>
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
