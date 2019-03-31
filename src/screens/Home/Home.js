import * as React from "react";
import AutoCompleteTextInput from "./components/AutoCompleteTextInput";
import "./css/Home.css";
import UniversityList from "./components/UniversityList";
import apiModel from "../../api/APIModel";
import moment from "moment";
import LoadingScreen from "react-loading-screen";

const Title = 'Review trường đại học';
const subTitle = 'Hóng phốt, drama của hơn 100 trường đại học tại Việt Nam';
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

    this.getNameFromId = this.getNameFromId.bind(this);
  }

  async componentWillMount() {
    const data = await apiModel.getUniversities();
    universities = data.map((uni) => {
      return { name: uni.name, id: uni.id };
    });
    const recentReviews = await apiModel.getRecentReviews();
    // console.log("aaa", recentReviews);
    this.setState({ data, recentReviews, loading: false });
  }

  formatDate = (milisec) => {
    return moment(milisec).format("HH:mm, DD/MM/YYYY");
  };

  renderTitle = () => {
    return (
       <div className="title-container">
         <LoadingScreen
            loading={this.state.loading}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
            logoSrc={require("./../../assets/icons/logo.svg")}
            text="đang tải dữ liệu"
         />
         <h2 className="font-weight-bold text-light py-4">{Title}</h2>
         <form className="mb-3">
           <div className="form-row TitleForm">
             <div className="d-flex flex-fill h-100">
               <AutoCompleteTextInput suggestions={universities}/>
             </div>
             <div className="col-auto px-0">
               <button className="btn btn-danger button-search" type="button" id="button-addon2">
                 Search
               </button>
             </div>
           </div>
         </form>
       </div>
    );
  };

  getNameFromId(universityId, data) {
    let name = "";
    data.find((item) => {
      if (item.id === universityId) {
        name = item.name;
      }
    });
    return name;
  };

  renderRecentReviews = (recentReviews, data) => {
    return (
       <div className="col-12 d-flex flex-column p-0">
         <h1>Recent reviews</h1>
         {recentReviews.map((item, index) => (
            <div key={index} className="d-flex flex-column pb-3 recentContainer mb-2">
              <div className="recent-reviews-content">
                <span>&diams;</span>
                <a href={`/university/${item.universityId}`}>{item.context}</a>
              </div>
              <div className="recent-reviews-details">
                <a href={`university/${item.universityId}`}>
                  {this.getNameFromId(item.universityId, data)}
                </a>
                &bull;
                <p>{this.formatDate(item.createAt)}</p>
              </div>
            </div>
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
             <div className="col-lg-8 col-12">
               <UniversityList data={data} displayCount={displayCount}/>
               <button type="submit" className="btn btn-success ml-4" onClick={this.onShowMoreClick}>
                 Xem thêm
               </button>
             </div>
             <div className="col-lg-4 col-12 recent-reviews-container">
               {this.renderRecentReviews(recentReviews, data)}
             </div>
           </div>
         </div>
       </div>
    );
  }
}

export default Home;
