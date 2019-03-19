import * as React from 'react';
import './css/ReviewComponent.css';
import ReplyComponent from './ReplyComponent';
import APIModel from '../../../api/APIModel';
import PostDialog from './Dialog/PostDialog';

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      displayReplies: false,
      replies: []
    };
  }

  onClose = () => {
    this.setState({ show: false });
  };

  onShow = () => {
    this.setState({ show: true });
  };

  loadReply = async () => {
    const {
      review: { id }
    } = this.props;
    const data = await APIModel.getReply(id);
    this.setState({ replies: data.replies });
  };

  onClickViewReplies = () => {
    const { displayReplies } = this.state;
    this.setState({ displayReplies: !displayReplies });
    this.loadReply();
  };

  formatType = type => {
    if (type === 'khen') return 'Khen';
    if (type === 'che') return 'Chê';
    return '';
  };

  renderReplies = replies => {
    const { displayReplies } = this.state;
    if (displayReplies) {
      return replies.map(reply => <ReplyComponent reply={reply} />);
    }
    return null;
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const {
      review: { id, type, role, context, numberOfReplies }
    } = this.props;

    const { displayReplies, replies, show } = this.state;

    return (
      <div className="review-container">
        <div className="row m-0">
          <p className="review-identification">
            {this.capitalizeFirstLetter(role) || ''}
          </p>
          <p className="review-creation-time" />
        </div>
        <p
          className={type === 'khen' ? 'review-type' : 'review-type type-blame'}
        >
          {this.formatType(type)}
        </p>
        <div className="review-content p-2">{context || ''}</div>
        <div className="row p-0 m-0 mt-2 mb-1">
          <button
            type="button"
            className="reply-button btn-info"
            onClick={this.onShow}
          >
            Reply
          </button>
          <button
            type="button"
            className="show-reply-button"
            onClick={this.onClickViewReplies}
          >
            <u>
              {numberOfReplies > 1
                ? `(${numberOfReplies} replies)`
                : `(${numberOfReplies} reply)`}
            </u>
          </button>
        </div>
        <div
          className={
            displayReplies
              ? 'row m-0 d-block reply-block show-replies'
              : 'row m-0 d-block reply-block'
          }
        >
          {this.renderReplies(replies)}
        </div>
        {show && (
          <PostDialog reviewId={id} onClose={this.onClose} dialogType="Reply" />
        )}
      </div>
    );
  }
}

export default ReviewComponent;
