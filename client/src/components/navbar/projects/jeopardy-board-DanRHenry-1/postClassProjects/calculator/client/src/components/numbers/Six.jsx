import React from 'react'
import { Button } from 'reactstrap'

export default function Six(props) {
  return (
    <Button onClick={() => {
        props.acceptInput(6)
    }} className='btn'>
      6
    </Button>
  )
}
