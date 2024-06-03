import AbstractService from "./index";
import { players } from "./api";
import axios from "axios";

class PlayerService extends AbstractService {
  constructor() {
    super(players);
  }

  unassigned = () => {
    return new Promise((resolve, reject) => {
      const params = {};

      const headers = {
        accept: 'application/json',
      };

      axios
        .get(`${this.api}/available/`, { params, headers })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
const instance = new PlayerService();

export default instance;
