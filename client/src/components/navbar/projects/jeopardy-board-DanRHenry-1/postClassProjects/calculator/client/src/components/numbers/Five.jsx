import React from 'react'
import { Button } from 'reactstrap'

export default function Five(props) {
  return (
    <Button onClick={() => {
        props.acceptInput(5)
    }} className='btn'>
      5
    </Button>
  )
}
