import React from 'react'
import { Button } from 'reactstrap'

export default function Nine(props) {
  return (
    <Button onClick={() => {
        props.acceptInput(9)
    }} className='btn'>
      9
    </Button>
  )
}
