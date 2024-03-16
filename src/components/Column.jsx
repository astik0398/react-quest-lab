import { Button, Flex, Heading, Input, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const Column = ({ column, tasks, onAddCard, setNewTodoText }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newCardText, setNewCardText] = useState('');

    const addCard = () => {
        onAddCard(column.id, newCardText);
        onClose();
    };

  return (

    <>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Input onChange={(e)=> setNewCardText(e.target.value)} marginTop={'20px'} placeholder='Enter todo'/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={addCard}>Add Todo</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    <Flex style={{ width: "400px", height: "98vh", flexDirection:'column', boxShadow: 'hsla(0, 0%, 0%, 0.24) 0px 3px 8px', borderRadius:'15px'}}>
      <Flex style={{ padding:'10px', backgroundColor:'white', marginBottom:'20px', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}}>
        <Heading color={'grey'} margin={'auto'} as='h3' size='md'>{column.title}</Heading >
      </Flex>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableShapshot) => {
         return <Flex
            flexDirection={"column"}
            px={"2rem"}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => {
                console.log(task.id);
             return <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Flex
                    marginBottom={"1.5rem"}
                    rounded={"5px"}
                    boxShadow= 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                    padding={'20px'}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={{
                        ...draggableProvided.draggableProps.style,
                        backgroundColor: draggableSnapshot.isDragging
                          ? "cyan"
                          : column.id == "column-01" ? '#97f0f1' : column.id == 'column-02' ? '#d996fe' : column.id == 'column-03' ? '#fedada' :
                           '#c6ff89'
                      }}
                  >
                    <Heading textAlign={'justify'} size={'sm'}>{task.content}</Heading>
                  </Flex>
                )}
              </Draggable>
             
        })}
        <Button onClick={onOpen} colorScheme="blue">Add a card</Button>
         {droppableProvided.placeholder}
          </Flex>;
        }}
      </Droppable>
    </Flex>
    </>
  );
};

export default Column;
