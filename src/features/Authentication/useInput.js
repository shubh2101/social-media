import { useState } from "react";

const initialFormValues = {
  firstname: "",
  lastname: "",
  email: "",
};
const useInput = (isValidating = false, validate) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

  const valueChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (isValidating) {
      const formErrors = validate(name, { [name]: value }, errors);
      setErrors(formErrors);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log("form submitted");
  };

  return {
    values,
    errors,
    valueChangeHandler,
    submitHandler,
    setErrors,
  };
};

export default useInput;
