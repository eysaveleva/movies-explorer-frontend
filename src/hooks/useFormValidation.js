import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)


  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const form = evt.target.form;
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
    setErrors(oldErrors => {
      return { ...oldErrors, [name]: validationMessage }
    })
    setIsValid(form.checkValidity())
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
  }, [])

  const reset = useCallback((data = {}) => {
    setValues(data);
    setErrors({});
    setIsValid(false);
  },[])

  return { values, errors, isValid, handleChange, setValue, reset, setIsValid }
}
