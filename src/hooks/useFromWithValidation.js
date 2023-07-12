import {useEffect, useState} from "react";

export function useFormWithValidation({ initValues = {}, validators }) {
  const initErrors = {};
  Object.keys(validators).forEach((name) => {
    const isInvalid = validators[name](initValues[name] || '').length > 0
    initErrors[name] = isInvalid ? 'initiallyInvalid' : ''
  })

  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState(initErrors);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitResultMessage, setSubmitResultMessage] = useState('');

  useEffect(() => {
    setIsValid(!Object.values(errors).some((err) => err.length > 0))
  }, [errors])

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    const error = validators[name] ? validators[name](value) : ''

    const newValues = {...values, [name]: value};
    const newErrors = {...errors, [name]: error };

    setValues(newValues);
    setErrors(newErrors);
    setSubmitResultMessage('');
  };

  const getError = (name) => errors[name] === 'initiallyInvalid' ? '' : errors[name]

  return {
    values,
    handleChange,
    getError,
    isValid,
    setIsValid,
    submitResultMessage,
    setSubmitResultMessage,
    isLoading,
    setIsLoading
  };
}
