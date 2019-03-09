import * as React from 'react';
import './css/UniversityItem.css';

function UniversityItem(props) {
  const {
    id,
    name,
    address,
    logo,
    department,
    reviewCount,
    vote: { positive, negative }
  } = props;
  return (
    <div className="UniversityItemContainer row">
      <img className="rounded logo" src={logo} alt={`logo_${name}`} />
      <div className="content">
        <a className="universityName text-monospace" href={`/:${id}`}>
          {name}
        </a>
        <p className="m-0">{address}</p>
        <p className="m-0">{department}</p>

        <div className="row">
          <a href={`/:${id}`} className="text-success text-monospace">
            {positive}
          </a>
          <a
            href={`/:${id}`}
            className="negativeText text-danger text-monospace"
          >
            {negative}
          </a>
        </div>
        <a className="ml-auto" href={`/:${id}`}>
          <p className="m-0 ml-auto text-monospace">{`Review ${reviewCount}`}</p>
        </a>
      </div>
    </div>
  );
}

export default UniversityItem;
