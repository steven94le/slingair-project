import React, { useState, createContext } from "react";

export const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const initialForm = {
    flight: "",
    seat: "",
    givenName: "",
    surname: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const handleFormChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <FormContext.Provider
      value={{ initialForm, formData, setFormData, handleFormChange }}
    >
      {children}
    </FormContext.Provider>
  );
};
