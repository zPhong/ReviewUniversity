/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/no-find-dom-node */
import * as React from "react";
import $ from "jquery";
import ReactDOM from "react-dom";
import Recaptcha from "react-recaptcha";
import "./css/PostDialog.css";
import APIModel from "../../../../api/APIModel";

const captchaKeyApi = "6LeR_JkUAAAAAGErmsKDv410V24gf5bHBHfeyfug";

const Roles = {
  student: "Học sinh",
  employee: "Cán bộ trường",
  others: "Người ngoài"
};

const Types = {
  Review: {
    like: "Khen",
    dislike: "Chê",
    others: "Góp ý"
  },
  Reply: {
    like: "Tán thành",
    dislike: "Phản bác",
    others: "Trung lập"
  }
};

const dialogDisplayType = {
  Review: "Nhận Xét",
  Reply: "Trả lời"
};

class ReviewPostDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "others",
      type: "others",
      content: "",
      captchaChecked: false
    };
  }

  componentDidMount() {
    const { onClose } = this.props;
    $(ReactDOM.findDOMNode(this)).modal("show");
    $(ReactDOM.findDOMNode(this)).on("hidden.bs.modal", onClose);
  }

  callback = () => {
    this.setState({ captchaChecked: true });
  };

  onSubmit = async () => {
    const { role, type, content, captchaChecked } = this.state;
    const { universityId, reviewId, dialogType } = this.props;

    const id = dialogType === "Review" ? { universityId } : { reviewId };

    const data = {
      ...id,
      role,
      type,
      context: content
    };
    if (!captchaChecked || content.length < 15) {
      alert("Vui lòng kiểm tra lại nội dung nhập có đủ tối thiểu 15 chữ hay chưa");
      return;
    }

    let result;
    if (dialogType === "Review") {
      result = await APIModel.postReview(data);
    } else result = await APIModel.postReply(data);

    if (result !== true) {
      alert(result);
    }
    document.getElementById("btnClose").click();

  };

  renderContent = () => {
    const { dialogType } = this.props;
    const { role, type } = this.state;
    return (
       <form className="m-0">
         <div className="form-group row m-0 p-0">
           <h4 className="col-12 col-lg-3 align-self-center">Vai trò</h4>
           <div className="col-12 col-lg-9 CustomDropDown">
             <select
                className="dropdown-toggle form-control"
                value={role}
                onChange={(e) => {
                  this.setState({ role: e.target.value });
                }}>
               <p> {role || "Vai trò của bạn"}</p>
               {Object.keys(Roles).map((key) => (
                  <option className="dropdown-item" value={key}>
                    {Roles[key]}
                  </option>
               ))}
             </select>
           </div>
         </div>

         <div className="form-group row m-0 p-0 mt-2">
           <h4 className="col-12 col-lg-3 align-self-center">Đánh giá</h4>
           <div className="col-12 col-lg-9 CustomDropDown">
             <select
                className="dropdown-toggle form-control"
                value={type}
                onChange={(e) => {
                  this.setState({ type: e.target.value });
                }}>
               <p> {role || "Đánh giá của bạn"}</p>
               {Object.keys(Types[dialogType]).map((key) => (
                  <option className="dropdown-item" value={key}>
                    {Types[dialogType][key]}
                  </option>
               ))}
             </select>
           </div>
         </div>

         <div className="dropdown-divider"/>

         <div className="form-group">
           <h4 className="col-12 align-self-center">Nội dung (*)</h4>
           <textarea
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
               <button id="btnClose" type="button" className="close-btn" data-dismiss="modal" onClick={onClose}>
                 Đóng
               </button>
               <button type="button" className="submit-btn" onClick={this.onSubmit}>
                 {dialogDisplayType[dialogType] || "Đăng"}
               </button>
             </div>
           </div>
         </div>
       </div>
    );
  }
}

export default ReviewPostDialog;
