import { profileName, profileJob } from "../utils/constants.js";

export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name,
      job: this._job,
    };

    return userInfo;
  }

  setUserInfo() {
    profileName.textContent = this._name;
    profileJob.textContent = this._job;
  }
}
