import { Flex, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd'


const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskId);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);
  
    const newColumn = {
      ...sourceCol,
      taskId: newTaskIds
    };
  
    return newColumn;
  };

const HomePage = () => {

    const initialData = {
        tasks: {
            1: {id: 1, content: "How are you ?"},
            2: {id: 2, content: "Ever heard of Chakra-UI ?"},
            3: {id: 3, content: "Implement using next.js"},
            4: {id: 4, content: "How old are you ?"},
            5: {id: 5, content: "Watch a series called Farzi on prime ?"},
            6: {id: 6, content: "Don't forget to buy charger for nothing phone 2a "},
            7: {id: 7, content: "Add chakra-UI to your project"},
            8: {id: 8, content: "Don't forget to visit the doctor for appointment"},
            9: {id: 9, content: "You have a flight to catch at 7:00pm"},
        },
        columns: {
            "column-01": {
                id: 'column-01',
                title: 'TO DO',
                taskId: [1,2,3,4]
            },
            "column-02": {
                id: 'column-02',
                title: 'IN PROGRESS',
                taskId: [5,6]
            },
            "column-03": {
                id: 'column-03',
                title: 'REVIEW',
                taskId: [7]
            },
            "column-04": {
                id: 'column-04',
                title: 'DONE',
                taskId: [8,9]
            }
        },

        columnOrder: ["column-01", "column-02", "column-03", "column-04"],
    }

    const [state, setState] = useState(initialData)
    const [newTodoText, setNewTodoText] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onAddCard = (columnId, cardText) => {
        const newId = Object.keys(state.tasks).length + 1;
        const newTask = { id: newId, content: cardText };
        const newColumns = {
            ...state.columns,
            [columnId]: {
                ...state.columns[columnId],
                taskId: [...state.columns[columnId].taskId, newId],
            },
        };
        const newState = {
            ...state,
            tasks: {
                ...state.tasks,
                [newId]: newTask,
            },
            columns: newColumns,
        };
        setState(newState);
    };

    const onDragEnd = (result)=> {
        const {destination, source} = result

        if(!destination){
            return
        }

        if(destination.droppableId == source.droppableId && destination.index == source.index){
            return
        }

        const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    const sourceTaskIds = Array.from(sourceCol.taskId);
    const destinationTaskIds = Array.from(destinationCol.taskId);
    const [removed] = sourceTaskIds.splice(source.index, 1);
    destinationTaskIds.splice(destination.index, 0, removed);
  
    const newColumns = {
      ...state.columns,
      [sourceCol.id]: {
        ...sourceCol,
        taskId: sourceTaskIds,
      },
      [destinationCol.id]: {
        ...destinationCol,
        taskId: destinationTaskIds,
      },
    };
  
    const newState = {
      ...state,
      columns: newColumns,
    };
    setState(newState);
  }
    
    

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Flex justifyContent={'space-between'} gap={'20px'} padding={'10px'} >
        {state.columnOrder.map(columnId=> {
            const column = state.columns[columnId]
            const tasks = column.taskId.map(taskId=> state.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} onAddCard={onAddCard} setNewTodoText={setNewTodoText}/>
        })}
    </Flex>
    </DragDropContext>
  )
}

export default HomePage