import React from 'react'
import { Button } from 'reactstrap'
export default function One(props) {
  return (
    <Button onClick={() => {
      props.acceptInput(1)
    }} className='btn'>
      1
    </Button>
  )
}
