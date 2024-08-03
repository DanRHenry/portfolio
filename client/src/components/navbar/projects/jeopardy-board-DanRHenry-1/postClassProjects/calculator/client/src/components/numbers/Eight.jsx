import React from 'react'
import { Button } from 'reactstrap'

export default function Eight(props) {
  return (
    <Button onClick={() => {
        props.acceptInput(8)
    }} className='btn'>
      8
    </Button>
  )
}
