import React from 'react'
import {Button} from "reactstrap"
export default function Add(props) {
  return (
    <div id='add'>
      <Button onClick={() => {
        if (props.commandQueue[props.commandQueue.length] !== "add" && props.inputArray.length !== 0) {
          props.commandQueue.push("add")
          props.inputArray.map(number => {
            props.workingMemory.push(number)
          }
          )
          props.inputArray = [];
          console.log("commandQueue",props.commandQueue)
          console.log("workingMemory",props.workingMemory)
          console.log("inputArray",props.inputArray)}
        }
        

        } className='btn'>+</Button>
    </div>
  )
}
