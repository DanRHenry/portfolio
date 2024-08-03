import React from 'react'
import { Button } from 'reactstrap'
export default function PosNeg(props) {
  return (
    <div>
      <Button onClick={props.toggleUnary}>+/-</Button>
    </div>
  )
}
