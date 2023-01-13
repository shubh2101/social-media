import { useState } from "react";

const useInput = (validate, initialFormValues = "") => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);

  const valueChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const countryValueHandler = (event, val) => {
    setValues({
      ...values,
      country: val,
    });
  };

  const inputBlurHandler = (event) => {
    const { name } = event.target;
    const formErrors = validate(name, values, errors);
    setErrors(formErrors);
  };

  const countryBlurHandler = () => {
    const name = "country";
    const formErrors = validate(name, values, errors);
    setErrors(formErrors);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const passwordShowHandler = () => {
    setPasswordShow(!passwordShow);
  };
  const confirmPassShowHandler = () => {
    setConfirmPassShow(!confirmPassShow);
  };

  return {
    values,
    errors,
    valueChangeHandler,
    inputBlurHandler,
    submitHandler,
    setErrors,
    passwordShow,
    passwordShowHandler,
    confirmPassShow,
    confirmPassShowHandler,
    countryValueHandler,
    countryBlurHandler,
  };
};

export default useInput;
