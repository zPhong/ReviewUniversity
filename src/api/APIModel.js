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
}

const apiModel = new APIModel();

export default apiModel;
