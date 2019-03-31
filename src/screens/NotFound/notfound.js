import React from 'react'
import './notfound.css'

class NotFound extends React.Component {
  render() {
    return (
       <div className="not-found-container">
         <div className="not-found-oops">
           404
         </div>
         <div className="not-found-content">
           Page Not Found
         </div>
       </div>
    )
  }
}
export default NotFound