import React from 'react'
import { Button } from 'reactstrap'
export default function MC(props) {
  return (
    <div>
    <Button onClick={() => {
    console.log(props.inputArray)
  }} className='btn'>=</Button>
    </div>
  )
}
