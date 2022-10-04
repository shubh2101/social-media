import { useState } from "react";

const initialFormValues = {
  firstname: "",
  lastname: "",
  email: "",
  dob: "1996-01-01",
  gender: "female",
  country: "",
  password: "",
  confirmpassword: "",
};
const useInput = (validate) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState("");

  const valueChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const inputBlurHandler = (event) => {
    const { name } = event.target;
    const formErrors = validate(name, values, errors);
    setErrors(formErrors);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log("form submitted");
  };

  return {
    values,
    errors,
    valueChangeHandler,
    inputBlurHandler,
    submitHandler,
    setErrors,
  };
};

export default useInput;
