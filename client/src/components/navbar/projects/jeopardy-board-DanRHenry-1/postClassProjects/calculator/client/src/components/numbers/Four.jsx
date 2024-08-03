import React from 'react'
import { Button } from 'reactstrap'
export default function Four(props) {
  return (
    <Button onClick={() => {
        props.acceptInput(4)
    }} className='btn'>
      4
    </Button>
  )
}
