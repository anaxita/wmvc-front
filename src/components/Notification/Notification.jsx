import React from 'react'


export const Notification = ({text, hide}) => {
  return (
        <span className={"notification"} onClick={hide}>
          {text} !
        </span>
  )
}