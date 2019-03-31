const POST_REVIEW_SUCCEED = 'post_review_succeed';
const POST_REVIEW_FAILED = 'post_review_failed';

const POST_REPLY_SUCCEED = 'post_reply_succeed';
const POST_REPLY_FAILED = 'post_reply_failed';

const Status = {
  POST_REPLY_FAILED,
  POST_REPLY_SUCCEED,
  POST_REVIEW_FAILED,
  POST_REVIEW_SUCCEED
};

const captchaKeyApi = '6LeR_JkUAAAAAGErmsKDv410V24gf5bHBHfeyfug';

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

export { Status, captchaKeyApi, Roles, Types };
