import React from 'react'
import { Button } from 'reactstrap'

export default function Seven(props) {
  return (
    <Button onClick={() => {
        props.acceptInput(7)
    }} className='btn'>
      7
    </Button>
  )
}