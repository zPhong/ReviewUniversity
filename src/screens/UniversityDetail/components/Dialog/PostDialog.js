/* eslint-disable react/no-find-dom-node */
import * as React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import './css/PostDialog.css';
import APIModel from '../../../../api/APIModel';

const Roles = {
  student: 'Học sinh',
  employee: 'Cán bộ trường',
  others: 'Người ngoài'
};

const Types = {
  Review: {
    like: 'Khen',
    dislike: 'Chê',
    others: 'Góp ý'
  },
  Reply: {
    like: 'Tán thành',
    dislike: 'Phản bác',
    others: 'Trung lập'
  }
};

const dialogDisplayType = {
  Review: 'Nhận Xét',
  Reply: 'Trả lời'
};

class ReviewPostDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { role: 'others', type: 'others', content: '' };
  }

  componentDidMount() {
    const { onClose } = this.props;
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', onClose);
  }

  onSubmit = async () => {
    const { role, type, content } = this.state;
    const { universityId, reviewId, dialogType } = this.props;

    const id = dialogType === 'Review' ? { universityId } : { reviewId };

    const data = {
      ...id,
      role,
      type,
      context: content
    };

    if (dialogType === 'Review') await APIModel.postReview(data);
    else await APIModel.postReply(data);
  };

  renderContent = () => {
    const { dialogType } = this.props;
    const { role, type } = this.state;
    return (
      <form>
        <div className="form-group">
          <p>Vai trò</p>
          <div className="CustomDropDown">
            <select
              className="dropdown-toggle btn-secondary btn"
              value={role}
              onChange={(e) => {
                this.setState({ role: e.target.value });
              }}
            >
              <p> {role || 'Vai trò của bạn'}</p>
              {Object.keys(Roles).map((key) => (
                <option className="dropdown-item" value={key}>
                  {Roles[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <p>Đánh giá</p>
          <div className="CustomDropDown">
            <select
              className="dropdown-toggle btn-secondary btn"
              value={type}
              onChange={(e) => {
                this.setState({ type: e.target.value });
              }}
            >
              <p> {role || 'Đánh giá của bạn'}</p>
              {Object.keys(Types[dialogType]).map((key) => (
                <option className="dropdown-item" value={key}>
                  {Types[dialogType][key]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <p>Nội dung (*)</p>
          <textarea
            type="text"
            className="w-100"
            placeholder="Nhận xét đi..."
            rows={5}
            required
            onChange={(e) => {
              this.setState({ content: e.target.value });
            }}
          />
        </div>
      </form>
    );
  };

  render() {
    const { onClose, dialogType } = this.props;

    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{this.renderContent()}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>
                Đóng
              </button>
              <button type="button" className="btn btn-primary" onClick={this.onSubmit}>
                {dialogDisplayType[dialogType] || 'Đăng'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewPostDialog;
