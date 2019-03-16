import apiUrl from './config';

class APIModel {
  getUniversities = async () => {
    // eslint-disable-next-line no-undef
    fetch(`${apiUrl}Universities`)
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
