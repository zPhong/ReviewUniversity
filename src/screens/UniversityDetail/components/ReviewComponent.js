import * as React from 'react';
import '../css/ReviewComponent.css';
import ReplyComponent from './ReplyComponent';

class ReviewComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayReplies: false,
    }
  }

  onClickViewReplies = () => {
    this.setState({displayReplies: !this.state.displayReplies});
  };

  formatType = (type) => {
    if (type === 'khen') type = 'Khen';
    else if (type === 'che') type = 'Chê';
    else type = '';
    return type;
  };

  renderReplies = (replies) => {
    if ( this.state.displayReplies )
    {
      return (replies.map(reply => <ReplyComponent reply={reply} />));
    }
  };

  capitalizeFirstLetter = (string) =>
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const {
      review: { type, role, context, numberOfReplies}
    } = this.props;

    const replies = [
      {
      "id": "1",
      "role": "kien ngu hoc",
      "type": "khen",
      "context": "string",
      "reviewId": "string"
      },
      {
        "id": "2",
        "role": "phong map",
        "type": "string",
        "context": "string",
        "reviewId": "string"
      },
      {
        "id": "3",
        "role": "string",
        "type": "string",
        "context": "string",
        "reviewId": "string"
      },
      {
        "id": "4",
        "role": "string",
        "type": "string",
        "context": "string",
        "reviewId": "string"
      },
      {
        "id": "5",
        "role": "string",
        "type": "string",
        "context": "string",
        "reviewId": "string"
      },
    ];

    return (

      <div className="review-container">
        <div className="row m-0">
          <p className="review-identification">{this.capitalizeFirstLetter(role) || ''}</p>
          <p className="review-creation-time"></p>
        </div>
        <p className={type === 'khen' ? 'review-type' : 'review-type type-blame'}>
          { this.formatType(type) }
        </p>
        <div className="review-content p-2">{context || ''}</div>
        <div className="row p-0 m-0 mt-2 mb-1">
          <button type="button" className="reply-button btn-info">
            Reply
          </button>
          <button
            type="button"
            className="show-reply-button"
            onClick={this.onClickViewReplies}>
            <u>
            {numberOfReplies > 1
              ? `(${numberOfReplies} replies)`
              : `(${numberOfReplies} reply)`}
          </u>
          </button>
        </div>
        <div className={this.state.displayReplies ? "row m-0 d-block reply-block show-replies" : "row m-0 d-block reply-block"}>
          { this.renderReplies(replies)}
        </div>
      </div>
    );
  }
}

export default ReviewComponent;
