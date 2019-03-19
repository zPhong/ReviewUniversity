import * as React from 'react';
import './css/UniversityDetailPage.css';
import ReviewComponent from './components/ReviewComponent';
import appModel from '../../api/APIModel';
import PostDialog from './components/Dialog/PostDialog';

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
  }

  async componentDidMount() {
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

  render() {
    const {
      data: { id, name, location, reviews = [], logo, numberOfReviews },
      show
    } = this.state;

    const universityInformation = {
      departments: ['IT', 'Sex'],
      praiseNumber: reviews.filter((review) => review.type === 'like').length || 0,
      blameNumber: reviews.filter((review) => review.type === 'dislike').length || 0
    };

    return (
      <div className="container-fluid">
        <h1>{name}</h1>
        <div className="university-information">
          <img src={logo} className="rounded d-block my-logo" alt="logo" />
          <div className="university-information-details pl-3">
            <p className="university-information-details-name m-0">{name}</p>
            <div className="row m-0">
              <div className="d-block col-lg-4 col-md-8 p-0">
                <p className="university-information-details-departments m-0">
                  {universityInformation.departments.toString().replace(',', ', ')}
                </p>
                <p className="university-information-details-location m-0">{location}</p>
                <div className="university-information-details-praise-and-blame">
                  <a href="./" className="university-information-details-praise text-success">
                    {universityInformation.praiseNumber} praise
                  </a>
                  <a href="./" className="university-information-details-blame text-danger">
                    {universityInformation.blameNumber} blame
                  </a>
                </div>
              </div>
              <div className="col-lg-8 col-md-4 p-0">
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
        <div className="line" />
        <div className="review-number">
          <p>{`review${numberOfReviews > 1 ? 's' : ''} ${numberOfReviews}`}</p>
        </div>
        {reviews && reviews.reverse().map((review) => <ReviewComponent review={review} />)}
        {show && <PostDialog universityId={id} onClose={this.onClose} dialogType="Review" />}
      </div>
    );
  }
}

export default UniversityDetailPage;
