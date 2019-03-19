import * as React from 'react';
import '../css/ReplyComponent.css'

class ReplyComponent extends React.Component {
  capitalizeFirstLetter = (string) =>
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const {
      reply: { id, role, type, context },
    } = this.props;

    return (
      <div className="reply-container">
        <div className="row m-0">
          <p className="reply-identification">{this.capitalizeFirstLetter(role)}</p>
          <p className="reply-creation-time">{'02/03/2019'}</p>
        </div>

        <div className="reply-content p-2">
          {context}
        </div>
      </div>
    );
  }
}

export default ReplyComponent;