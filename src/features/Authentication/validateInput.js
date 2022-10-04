const Validate = (name, values, errors) => {
  let temp = { ...errors };
  console.log(values);

  switch (name) {
    case "firstname":
      const nameRegex = /^[A-Za-z]+$/;
      temp.firstname = nameRegex.test(values.firstname)
        ? ""
        : "First name should contain only alphabets.";

      break;
    case "lastname":
      temp.lastname = values.lastname ? "" : "Last name is required.";
      break;

    case "email":
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      temp.email = emailRegex.test(values.email) ? "" : "Email is not valid.";
      break;

    case "password":
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
      console.log({ password: values.password });
      temp.password = passwordRegex.test(values.password)
        ? ""
        : "Min 6 chars, at least 1 letter,1 number and 1 special char";
      break;

    case "confirmpassword":
      temp.confirmpassword =
        values.confirmpassword === values.password
          ? ""
          : "Passwords do not match";
      break;

    default:
      break;
  }

  return { ...temp };
};

export default Validate;
