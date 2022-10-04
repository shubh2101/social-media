const Validate = (name, values, errors) => {
  let temp = { ...errors };

  switch (name) {
    case "firstname":
      const nameRegex = /^[A-Za-z]+$/;

      temp.firstname = values.firstname
        ? nameRegex.test(values.firstname)
          ? ""
          : "First name should contain only alphabets."
        : "First name is required.";

      break;

    case "lastname":
      temp.lastname = values.lastname ? "" : "Last name is required.";

      break;

    case "email":
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      temp.email = values.email
        ? emailRegex.test(values.email)
          ? ""
          : "Email is not valid."
        : "Email is required";

      break;

    case "password":
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

      temp.password = values.password
        ? passwordRegex.test(values.password)
          ? ""
          : "Min 6 chars containing letter, number and special char."
        : "Password is required.";

      break;

    case "confirmpassword":
      temp.confirmpassword = values.confirmpassword
        ? values.confirmpassword === values.password
          ? ""
          : "Passwords do not match."
        : "Confirm password is required.";

      break;

    case "country":
      temp.country = values.country ? "" : "Select your country.";

      break;

    default:
      break;
  }

  return { ...temp };
};

export default Validate;
