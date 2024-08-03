import React from 'react'
import { Button } from 'reactstrap'
export default function Backspace(props) {
  return (
        <Button onClick={() => {
          props.inputArray.pop()
          console.log(props.inputArray)
      }} className='btn'>BKSP</Button>
  )
}