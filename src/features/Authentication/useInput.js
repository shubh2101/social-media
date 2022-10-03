import { useState } from "react";

const initialFormValues = {
  firstname: "",
  lastname: "",
  email: "",
};
const useInput = (validate) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

  const valueChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    // if (isValidating) {
    //   const formErrors = validate(name, { [name]: value }, errors);
    //   setErrors(formErrors);
    // }
  };
  const inputBlurHandler = (event) => {
    const { name, value } = event.target;
    const formErrors = validate(name, { [name]: value }, errors);
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
