import * as React from 'react';
import '../css/ReviewComponent.css';
import ReplyComponent from './ReplyComponent';

class ReviewComponent extends React.Component {
  // onClickViewReplies = () => {
  //   return(
  //     <ReplyComponent reply={replies}/>
  //   );
  // };

  render() {
    const {
      review: { type, role, context }
    } = this.props;

    return (
      <div className="container">
        <div className="row m-0">
          <p className="review-identification">{role || ''}</p>
          <p className="review-creation-time"></p>
        </div>
        <p
          className={type === 'Khen' ? 'review-type' : 'review-type type-blame'}
        >
          {type || ''}
        </p>
        <div className="review-content p-2">{context || ''}</div>
        <button type="button" className="reply-button">
          reply
        </button>
        <button
          type="button"
          className="show-reply-button"
          onClick={this.onClickViewReplies}
        >
          {/* <u>
            {replies.length > 1
              ? `(${replies.length} replies)`
              : `(${replies.length} reply)`}
          </u> */}
        </button>
      </div>
    );
  }
}

export default ReviewComponent;
