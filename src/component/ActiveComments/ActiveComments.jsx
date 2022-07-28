import React from "react";

function ActiveComments({ activeComments }) {
  return (
    <>
      {activeComments
        ? activeComments.map((comment) => {
            return (
              <>
                <div
                  style={{
                    width: "50%",
                    margin: "5px 25%",
                  }}
                  key={comment._id}
                >
                  <div style={{border: "1px solid black",borderRadius: "10px",}}>{`${comment.comment} by ${comment.user}`}</div>
                </div>
              </>
            );
          })
        : null}
    </>
  );
}

export default ActiveComments;
