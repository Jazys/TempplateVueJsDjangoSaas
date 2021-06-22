export default class User {
    constructor(username, email, password) {
      this.username = username;
      this.email = email;
      this.password = password;
    }

    copy(obj) {
      obj && Object.assign(this, obj);
  }
  }