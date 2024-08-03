import React from 'react'
import { Button } from 'reactstrap'
export default function Equal(props) {
  return (
    <Button onClick={() => {
    //   props.inputArray.pop()
      console.log(props.inputArray)
  }} className='btn'>=</Button>
)
}
