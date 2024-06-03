import AbstractService from "./index";
import { teams } from "./api";

class TeamService extends AbstractService {
  constructor() {
    super(teams);
  }
}

const instance = new TeamService();

export default instance;
