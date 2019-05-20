import axios from "axios";

class Sender {
  constructor(options) {
    this._name = "Sender";

    this._error = null;
  }

  validate(data) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      valid = false;

    this._error = null;

    if (
      data.name.length < 1 ||
      data.email.length < 1 ||
      data.message.length < 1
    )
      this._error = "empty_error";
    else if (!re.test(data.email)) this._error = "email_error";
    else valid = true;

    return valid;
  }

  submit(data) {
    return new Promise((resolve, reject) => {
      let form = new FormData(),
        url = "php/mailto.php";

      form.append("name", data.name);

      form.append("email", data.email);

      form.append("message", data.message);

      axios
        .post(url, form)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  }

  get error() {
    return this._error;
  }
}

export default {
  install(Vue) {
    let sender = new Sender();

    Object.defineProperty(Vue.prototype, "$sender", {
      get() {
        return sender;
      }
    });
  }
};
