import apiUrl from './config';

class APIModel {
  getUniversities = async id => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Universities${id ? `/${id}` : ''}`)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  postReview = async reviewData => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Reviews`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        alert(JSON.stringify(responseData));
      });
  };

  postUniversity = async universityData => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Universities`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(universityData)
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        alert(JSON.stringify(responseData));
      });
  };
}

const apiModel = new APIModel();

export default apiModel;
