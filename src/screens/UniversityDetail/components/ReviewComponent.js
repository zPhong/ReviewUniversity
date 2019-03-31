import * as React from 'react';
import moment from 'moment';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import './css/ReviewComponent.css';
import ReplyComponent from './ReplyComponent';
import APIModel from '../../../api/APIModel';
import PostDialog from './Dialog/PostDialog';

const Role = {
  others: 'Người ngoài',
  employee: 'Cán bộ trường',
  student: 'Sinh viên trường'
};

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      displayReplies: false,
      replies: []
    };
    this.lastReplyRef = React.createRef();
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
    this.setState({ replies: data.replies }, () => {
      console.log('asdsadsadsadasdsadsad');
      const repliesLength = data.replies.length;
      if (repliesLength > 0) {
        console.log('+++++++++++++++++++++++');
        const ReplyElement = document.getElementById(`RV${data.replies[repliesLength - 1].id}`);
        console.log(data.replies[repliesLength - 1].id);
        if (ReplyElement) ReplyElement.scrollIntoView({ behavior: 'smooth' });
        console.log('+++++++++++++++++++++++');
      }
    });
  };

  onClickViewReplies = () => {
    const { displayReplies } = this.state;
    this.setState({ displayReplies: !displayReplies });
    this.loadReply();
  };

  formatType = (type) => {
    if (type === 'like') return 'Khen';
    if (type === 'dislike') return 'Chê';
    if (type === 'others') return 'Góp ý';
    return '';
  };

  formatDate = (milliseconds) => {
    return moment(milliseconds).format('HH:mm, DD/MM/YYYY');
  };

  renderReplies = (replies) => {
    const { displayReplies } = this.state;
    if (displayReplies) {
      return replies.map((reply, index) => (
        <ReplyComponent
          ref={(input) => {
            if (index === replies.length - 1) {
              this.lastReplyRef = input;
            }
          }}
          index={index}
          reply={reply}
          key={`RV${reply.id}`}
          id={`RV${reply.id}`}
        />
      ));
    }
    return null;
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const {
      review: { id, type, role, context, numberOfReplies, createAt }
    } = this.props;

    const { displayReplies, replies, show } = this.state;

    return (
      <div id={id} className="review-container">
        <div className="row m-0">
          <p className="review-identification">{Role[role] || ''}</p>
          <p className="review-creation-time">{this.formatDate(createAt)}</p>
        </div>
        <p
          className={
            type === 'like' ? 'review-type' : type === 'dislike' ? 'review-type type-blame' : 'review-type type-other'
          }
        >
          {this.formatType(type)}
        </p>
        <div className="review-content p-2">{context || ''}</div>
        <div className="row p-0 m-0 mt-2 mb-1 w-100">
          <button type="button" className="reply-button btn-info" onClick={this.onShow}>
            Reply
          </button>
          <button type="button" className="show-reply-button" onClick={this.onClickViewReplies}>
            <u>{numberOfReplies > 1 ? `(${numberOfReplies} replies)` : `(${numberOfReplies} reply)`}</u>
          </button>
          <div className="ShareContainer">
            <p>Share </p>
            <FacebookShareButton url={`${document.URL}'?'${id}`} className="Demo__some-network__share-button">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
        </div>
        <div className={displayReplies ? 'row m-0 d-block reply-block show-replies' : 'row m-0 d-block reply-block'}>
          {this.renderReplies(replies)}
        </div>
        {show && <PostDialog context={context} reviewId={id} onClose={this.onClose} dialogType="Reply" />}
      </div>
    );
  }
}

export default ReviewComponent;
