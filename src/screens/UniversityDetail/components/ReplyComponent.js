import * as React from 'react';
import './css/ReplyComponent.css';

class ReplyComponent extends React.Component {
  fuckingPhong = () => {};

  render() {
    const {
      reply: { identification },
      reply: { creationTime },
      reply: { content }
    } = this.props;

    return (
      <div className="reply-container">
        <div className="row m-0">
          <p className="reply-identification">{identification}</p>
          <p className="reply-creation-time">{creationTime}</p>
        </div>

        <div className="reply-content p-2">{content}</div>
      </div>
    );
  }
}

export default ReplyComponent;
