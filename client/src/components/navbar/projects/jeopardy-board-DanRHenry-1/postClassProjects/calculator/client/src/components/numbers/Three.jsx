import React from 'react'
import { Button } from 'reactstrap'

export default function Three(props) {
  return (
    <Button onClick={() => {
        props.acceptInput(3)
    }} className='btn'>
      3
    </Button>
  )
}
