import * as React from 'react';
import './css/UniversityItem.css';

function UniversityItem(props) {
  const {
    id,
    name,
    location,
    logo,
    department,
    numberOfReviews,
    positive,
    negative
  } = props;
  return (
    <div className="row UniversityItemContainer">
      <img className="rounded logo" src={logo} alt={`logo_${name}`} />
      <div className="content">
        <a className="universityName text-monospace" href={`/:${id}`}>
          {name}
        </a>
        <p className="m-0">{location}</p>
        <p className="m-0">
          {department && department.toString().replace(',', ', ')}
        </p>

        <div className="row">
          <a href={`/:${id}`} className="text-success text-monospace">
            {positive}
          </a>
          <span className="mx-2" />
          <a
            href={`/:${id}`}
            className="negativeText text-danger text-monospace"
          >
            {negative}
          </a>
        </div>
        <a className="ml-auto" href={`/:${id}`}>
          <p className="m-0 ml-auto text-monospace">{`Review ${numberOfReviews}`}</p>
        </a>
      </div>
    </div>
  );
}

export default UniversityItem;
