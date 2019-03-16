import * as React from 'react';
import '../css/UniversityDetailPage.css';
import ReviewComponent from '../components/js/ReviewComponent';
import ReplyComponent from '../components/js/ReplyComponent';


class UniversityDetailPage extends React.Component {
  renderDepartment = () => {
  };

  render() {
    const titlePage = 'University Information of Technology'; // this.props.titlePage;
    const javLink = 'http://tuoitre.uit.edu.vn/wp-content/uploads/2015/07/logo-uit.png';

    const universityInformation = {
      name: 'University Information of Technology',
      departments: ['IT', 'Sex'],
      location: 'Thu Duc District, HCM city',
      praiseNumber: 120,
      blameNumber: 56,
      reviewNumber: 203,
    };

    const review = {
      identification: 'Sv Trường',
      creationTime: '02/03/2019 20:13',
      type: 'Khen',
      content: 'Trường quá tốt, thầy dạy nhiệt tình, bạn học thì chăm, hơi thiếu gái',
      replies:
        [
          {
            identification: 'Xaolonist',
            creationTime: '11/03/2019 21:53',
            content: 'Bớt xạo lồn lại đi bạn ơi! Trường dạy như con cặc ngta vậy mà chém gió thì giỏi',
          },
          {
            identification: 'Chó hùa',
            creationTime: '11/03/2019 21:54',
            content: 'Xaolonist nói đúng đấy bạn, Trường tệ lắm!',
          },
          {
            identification: 'Bênh-Vực-er',
            creationTime: '11/03/2019 22:02',
            content: 'Mấy thánh bớt bớt giùm, trường dạy vậy là tốt lắm rồi, coi trường ngta đi rồi nói',
          }
        ]
    };

    return (
      <div className="container-fluid">
        <h1>{titlePage}</h1>
        <div className="university-information">
          <img src={javLink} className="rounded d-block my-logo" alt="logo"/>
          <div className="university-information-details pl-3">
            <p className="university-information-details-name m-0">
              {universityInformation.name}
            </p>
            <div className="row m-0">
              <div className="d-block col-lg-4 col-md-8 p-0">
                <p className="university-information-details-departments m-0">
                  {universityInformation.departments.toString().replace(',', ', ')}
                </p>
                <p className="university-information-details-location m-0">
                  {universityInformation.location}
                </p>
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
                <button type="button" className="university-information-details-button-review">Review</button>
              </div>
            </div>
          </div>
        </div>
        <div className="line"/>
        <div className="review-number">
          {universityInformation.reviewNumber > 1 ?
            <p>{universityInformation.reviewNumber} reviews</p>
          :
            <p>{universityInformation.reviewNumber} review</p>
          }
        </div>
        <ReviewComponent review={review}/>
        <ReplyComponent reply={review.replies[0]}/>
      </div>
    );
  }
}

export default UniversityDetailPage;