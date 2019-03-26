import * as React from 'react';
import moment from 'moment';
import './css/ReplyComponent.css';

const Role = {
  others: 'Người ngoài',
  employee: 'Cán bộ trường',
  student: 'Sinh viên trường'
};

class ReplyComponent extends React.Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  formatType = (type) => {
    if (type === 'like') return 'Tán thành';
    if (type === 'dislike') return 'Phản bác';
    if (type === 'others') return 'Trung lập';
    return '';
  };

  formatDate = (milisec) => {
    return moment(milisec).format('HH:mm, DD/MM/YYYY');
  };

  render() {
    const {
      index,
      reply: { role, type, context, createAt }
    } = this.props;

    return (
      <div className="reply-container">
        <div className="row m-0">
          <p className="reply-identification">{Role[role]}</p>
          <a className="reply-index" href="#">
            #{`${index + 1}`}
          </a>
        </div>

        <div className="row m-0">
          <p
            className={
              type === 'like' ? 'reply-type' : type === 'dislike' ? 'reply-type type-blame' : 'reply-type type-other'
            }
          >
            {this.formatType(type)}
          </p>
          <p className="reply-creation-time">{this.formatDate(createAt)}</p>
        </div>

        <div className="reply-content p-2">{context}</div>
      </div>
    );
  }
}

export default ReplyComponent;
