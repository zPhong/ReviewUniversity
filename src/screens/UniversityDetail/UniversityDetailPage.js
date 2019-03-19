import * as React from 'react';
import './css/UniversityDetailPage.css';
import ReviewComponent from './components/ReviewComponent';
import ReplyComponent from './components/ReplyComponent';
import appModel from '../../api/APIModel';

class UniversityDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(data);
    this.setState({ data });
  }

  renderDepartment = () => {};

  render() {
    const {
      data: { name, location, reviews, logo, numberOfReviews }
    } = this.state;

    const universityInformation = {
      departments: ['IT', 'Sex'],
      praiseNumber: 120,
      blameNumber: 56
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
                  {universityInformation.departments
                    .toString()
                    .replace(',', ', ')}
                </p>
                <p className="university-information-details-location m-0">
                  {location}
                </p>
                <div className="university-information-details-praise-and-blame">
                  <a
                    href="./"
                    className="university-information-details-praise text-success"
                  >
                    {universityInformation.praiseNumber} praise
                  </a>
                  <a
                    href="./"
                    className="university-information-details-blame text-danger"
                  >
                    {universityInformation.blameNumber} blame
                  </a>
                </div>
              </div>
              <div className="col-lg-8 col-md-4 p-0">
                <button
                  type="button"
                  className="university-information-details-button-review"
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
        {reviews && reviews.map(review => <ReviewComponent review={review} />)}
        {/* <ReplyComponent reply={reviews.replies[0]} /> */}
      </div>
    );
  }
}

export default UniversityDetailPage;
