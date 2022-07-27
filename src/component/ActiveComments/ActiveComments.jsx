import React from 'react'

function ActiveComments({activeComments}) {
  return (
            <>{
            activeComments ?
              activeComments.map((comment) => {
                return(
              <>
              <div style={{ width: "100%" }} key={comment._id}>
              <span>{`${comment.comment} by ${comment.user}`}</span>
              </div>
              </>
                )
              }): null
            }
         </>
  )
}

export default ActiveComments