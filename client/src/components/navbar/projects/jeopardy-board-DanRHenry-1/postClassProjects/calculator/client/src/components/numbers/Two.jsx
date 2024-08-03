import React from 'react'
import { Button } from 'reactstrap'

export default function Two(props) {
  return (
    <Button onClick={() => {
        props.acceptInput(2)
    }} className='btn'>
      2
    </Button>
  )
}
