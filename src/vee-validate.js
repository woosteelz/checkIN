import { required, email, max, password, min, confirmed } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("min", {
  ...min,
  message: "This field must be {length} characters or larger"
});

extend("max", {
  ...max,
  message: "This field must be {length} characters or less"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("password", {
  validate: value => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/.test(value);
  },
  message: "This field must be a valid password"
});

extend("confirmed", {
  ...confirmed,
  message: "It does not match"
});