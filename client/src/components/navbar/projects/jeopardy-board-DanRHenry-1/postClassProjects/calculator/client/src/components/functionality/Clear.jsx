import React from 'react'
import { Button } from 'reactstrap'
export default function Clear(props) {
  return (
    <div>
      <Button onClick={props.clearInputArray} className='btn'>C</Button>
    </div>
  )
}
