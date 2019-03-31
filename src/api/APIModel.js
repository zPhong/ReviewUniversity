import apiUrl from './config';

class APIModel {
  getUniversities = async (id) => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Universities${id ? `/${id}` : ''}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  getReply = async (id) => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Reviews${id ? `/${id}` : ''}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  getRecentReviews = async () => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Reviews/newest`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  postReview = async (reviewData) => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Reviews`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.id) return response;
        return response.Context.toString().replace(',', '\n');
      });
  };

  postReply = async (replyData) => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Replies`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(replyData)
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.id) return true;
        return response.Context.toString().replace(',', '\n');
      });
  };

  postUniversity = async (universityData) => {
    // eslint-disable-next-line no-undef
    return fetch(`${apiUrl}Universities`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(universityData)
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.id) return true;
        return response.Context.toString().replace(',', '\n');
      });
  };
}

const apiModel = new APIModel();

export default apiModel;
