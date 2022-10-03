const Validate = (name, values, errors) => {
  let temp = { ...errors };

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

    default:
      break;
  }

  return { ...temp };
};

export default Validate;
