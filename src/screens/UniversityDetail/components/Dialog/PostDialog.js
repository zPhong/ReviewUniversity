/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/no-find-dom-node */
import * as React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Recaptcha from 'react-recaptcha';
import './css/PostDialog.css';
import APIModel from '../../../../api/APIModel';
import { Roles, Types, captchaKeyApi, Status } from '../../../../consts';

const dialogDisplayType = {
  Review: 'Nhận Xét',
  Reply: 'Trả lời'
};

class ReviewPostDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'others',
      type: 'others',
      content: '',
      postResult: { id: null, status: null },
      captchaChecked: false
    };
  }

  componentDidMount() {
    const { onClose } = this.props;
    const { responseStatus } = this.state;
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', onClose(responseStatus));
  }

  callback = () => {
    this.setState({ captchaChecked: true });
  };

  onSubmit = async () => {
    const { role, type, content, captchaChecked } = this.state;
    const { universityId, reviewId, dialogType } = this.props;

    const id = dialogType === 'Review' ? { universityId } : { reviewId };

    const data = {
      ...id,
      role,
      type,
      context: content
    };
    if (!captchaChecked || content.length < 15) {
      alert('Vui lòng kiểm tra lại nội dung nhập có đủ tối thiểu 15 chữ hay chưa');
      return;
    }

    let result;
    if (dialogType === 'Review') {
      result = await APIModel.postReview(data);
    } else {
      result = await APIModel.postReply(data);
      if (result && result.id) {
        this.setState({ responseStatus: { status: Status.POST_REPLY_SUCCEED, data: result } });
      }
    }
    document.getElementById('btnClose').click();
  };

  renderContent = () => {
    const { dialogType } = this.props;
    const { role, type, content } = this.state;
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
          <div className="d-flex flex-wrap align-content-end justify-content-between">
            <p>Nội dung (*)</p>
            <div className="d-flex align-items-center">
              {content.length < 15 && (
                <span className="text-warning">Gõ thiếu {15 - content.length} kí tự rồi kìa ^^</span>
              )}
            </div>
          </div>
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
    const { onClose, dialogType, context } = this.props;
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {context && (
                <div className="alert alert-info contentReview" role="alert">
                  {context}
                </div>
              )}
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.renderContent()}
              <Recaptcha
                ref={(e) => (this.recaptchaInstance = e)}
                size="normal"
                sitekey={captchaKeyApi}
                verifyCallback={this.callback}
              />
            </div>
            <div className="modal-footer">
              <button id="btnClose" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>
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
