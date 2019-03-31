import * as React from 'react';
import UniversityItem from './UniversityItem';

const UniversityList = props => {
  const { displayCount, data } = props;
  if (!data) return null;

  const end = displayCount >= data.length ? data.length : displayCount;

  return data
    .slice(0, end)
    .map(university => (
      <UniversityItem key={`item${university.id}`} {...university} />
    ));
};

export default UniversityList;
