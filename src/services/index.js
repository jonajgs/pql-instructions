import axios from 'axios';

class AbstractService {
  constructor(api) {
    this.api = api;
  }

  get = () => {
    return new Promise((resolve, reject) => {
      const params = {};

      const headers = {
        accept: 'application/json',
      };

      axios
        .get(this.api, { params, headers })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // eslint-disable-next-line class-methods-use-this
  store = (data) => {
    return new Promise((resolve, reject) => {
      console.log('aqui', this.api)
      axios
        .post(this.api, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        })
    });
  };

  // eslint-disable-next-line class-methods-use-this
  update = (id, data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.api.get}/${id}`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // eslint-disable-next-line class-methods-use-this
  retrieve = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.api.get}/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // eslint-disable-next-line class-methods-use-this
  remove = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.api.get}/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        })
    });
  };
}

export default AbstractService;
