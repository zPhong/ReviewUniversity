import * as React from 'react';
import './css/UniversityDetailPage.css';
import ReviewComponent from './components/ReviewComponent';
import appModel from '../../api/APIModel';
import PostDialog from './components/Dialog/PostDialog';
import BackToTopButton from './components/BackToTopButton';

class UniversityDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: [
        {
          name: '',
          location: '',
          reviews: []
        }
      ]
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const data = await appModel.getUniversities('5c7e9dfaf4014336e0a0798b');
    this.setState({ data });
  }

  onClose = () => {
    this.setState({ show: false });
  };

  onShow = () => {
    this.setState({ show: true });
  };

  renderDepartment = () => {};

  handleScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('back-to-top').style.display = 'block';
    } else {
      document.getElementById('back-to-top').style.display = 'none';
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {
      data: { id, name, location, reviews = [], logo, numberOfReviews },
      show
    } = this.state;

    const universityInformation = {
      departments: ['Kinh tế'],
      praiseNumber: reviews.filter((review) => review.type === 'like').length || 0,
      blameNumber: reviews.filter((review) => review.type === 'dislike').length || 0
    };

    return (
      <div className="container-fluid my-container p-0">
        <div className="row d-flex justify-content-center w-100 m-0 header-view">
          <div className="col-6 university-information">
            <div className="col-lg-3 col-12 p-0 d-flex justify-content-center university-image">
              <img src={logo} className="rounded d-block my-logo" alt="logo" />
            </div>
            <div className="col-lg-9 col-12 university-information-details">
              <div className="university-information-details-name m-0">{name}</div>
              <div className="row m-0 h-75">
                <div className="d-block col-lg-5 col-md-12 p-0">
                  <p className="university-information-details-departments m-0 mt-3">
                    {universityInformation.departments.toString().replace(',', ', ')}
                  </p>
                  <p className="university-information-details-location m-0 mt-1">{location}</p>
                  <div className="university-information-details-praise-and-blame mt-1">
                    <a href="./" className="university-information-details-praise text-success">
                      {universityInformation.praiseNumber} khen
                    </a>
                    <a href="./" className="university-information-details-blame text-danger">
                      {universityInformation.blameNumber} chê
                    </a>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 p-0">
                  <button
                    data-toggle="modal"
                    data-target="ReviewPostDialog"
                    type="button"
                    className="university-information-details-button-review"
                    onClick={this.onShow}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="review-number">
          <p>{`${numberOfReviews} review${numberOfReviews > 1 ? 's' : ''}`}</p>
        </div>
        {reviews && reviews.reverse().map((review) => <ReviewComponent review={review} />)}
        {show && <PostDialog universityId={id} onClose={this.onClose} dialogType="Review" />}

        <BackToTopButton scrollStepInPx="50" delayInMs="16.66" />
      </div>
    );
  }
}

export default UniversityDetailPage;
