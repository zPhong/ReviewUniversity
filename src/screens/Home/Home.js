import * as React from 'react';
import AutoCompleteTextInput from './components/AutoCompleteTextInput';
import './css/Home.css';
import UniversityList from './components/UniversityList';
import apiModel from '../../api/APIModel';
import moment from 'moment';
import LoadingScreen from 'react-loading-screen';

const Title = 'Review trường đại học';
let universities = [];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCount: 3,
      data: [],
      recentReviews: [],
      loading: true
    };
  }

  async componentWillMount() {
    const data = await apiModel.getUniversities();
    universities = data.map((uni) => {
      return { name: uni.name, id: uni.id };
    });
    let recentReviews = await apiModel.getRecentReviews();
    recentReviews = recentReviews.reverse();
    // console.log("aaa", recentReviews);
    this.setState({ data, recentReviews, loading: false });
  }

  formatDate = (milisec) => {
    return moment(milisec).format('HH:mm, DD/MM/YYYY');
  };

  renderTitle = () => {
    return (
      <div className="Title">
        <LoadingScreen
          loading={this.state.loading}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          logoSrc={require('./../../assets/icons/logo.svg')}
          text="đang tải dữ liệu"
        />
        <h2 className="font-weight-bold text-light mb-5">{Title}</h2>
        <form className="mb-3">
          <div className="form-row TitleForm">
            <div className="d-flex flex-fill h-100">
              <AutoCompleteTextInput suggestions={universities} />
            </div>
            <div className="col-auto px-0">
              <button className="btn btn-danger" type="button" id="button-addon2">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  renderRecentReviews = (data) => {
    return (
      <div className="col-4 d-flex flex-column pl-5">
        <h1>Recent reviews</h1>
        {data.map((item, index) => (
          <p key={index} className="d-flex flex-column pb-3 recentContainer">
            <a href="#">{item.context}</a>
            <p className="max-text">{this.formatDate(item.createAt)}</p>
          </p>
        ))}
      </div>
    );
  };

  onShowMoreClick = () => {
    const { displayCount } = this.state;
    this.setState({ displayCount: displayCount + 2 });
  };

  render() {
    const { displayCount, data, recentReviews } = this.state;
    return (
      <div className="Container">
        <div className="px-3 bg-dark pb-1">{this.renderTitle()}</div>
        <div className="px-3 general-content pb-1">
          <div className="row">
            <div className="col-8">
              <UniversityList data={data} displayCount={displayCount} />
              <button type="submit" className="btn btn-success ml-4" onClick={this.onShowMoreClick}>
                Xem thêm
              </button>
            </div>
            {this.renderRecentReviews(recentReviews)}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
