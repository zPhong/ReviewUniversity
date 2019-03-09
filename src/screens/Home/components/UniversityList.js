import * as React from 'react';
import UniversityItem from './UniversityItem';

const UniversityList = props => {
  const { displayCount, data } = props;
  const end = displayCount >= data.length ? data.length - 1 : displayCount;
  return data
    .slice(0, end)
    .map(university => (
      <UniversityItem key={`item${university.id}`} {...university} />
    ));
};

export default UniversityList;
