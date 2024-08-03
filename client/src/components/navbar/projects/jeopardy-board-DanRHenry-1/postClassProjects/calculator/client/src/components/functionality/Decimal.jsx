import React from 'react'
import { Button } from 'reactstrap'
export default function Decimal(props) {
    return (
        <Button onClick={() => {
            let dot = "dot"
          props.acceptInput(dot)
      }} className='btn'>.</Button>
  )
}
