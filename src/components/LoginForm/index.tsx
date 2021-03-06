import React, { useState } from "react";
import { SubmitStyled, FormStyled, SpanStyled } from "./styled";
import { useForm, IFormState } from "../../commons/Hooks/useForm";
import FlexWrapperRow from "./../UI/FlexWrapperRow";
import LoginFormField from "./../LoginFormField";
import validation from "./../../commons/Validation";
import ErrorMessage from "./../ErrorMessage";
import { eventHandler, keyValuePair } from "./../../commons/Types";
import Loader from "../Loader";

const LoginForm = (props: {}) => {
  const initialState: IFormState = {
    values: {
      userName: "",
      password: ""
    },
    validation: {
      userName: [validation.stringRules.isRequired],
      password: [validation.stringRules.isRequired]
    },
    isSubmitted: false,
    isFetching: false
  };

  const { formState, updateValue, values, submitForm, errors } = useForm(
    initialState
  );
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit: eventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    submitForm();
  };

  const togglePasswordVisibility: eventHandler<HTMLSpanElement> = event =>
    setPasswordVisible(!passwordVisible);

  const formFieldData: keyValuePair<string | any> = {
    userName: {
      type: "text"
    },
    password: {
      type: passwordVisible ? "text" : "password",
      component: (
        <SpanStyled onClick={togglePasswordVisibility}>&#128065;</SpanStyled>
      )
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <Loader isFetching={formState.isFetching} />
      {Object.entries(values).map(([name, value]) => (
        <FlexWrapperRow key={`key${name}`}>
          <LoginFormField
            name={name}
            type={formFieldData[name].type}
            value={value}
            handleChange={updateValue}
          />
          {formFieldData[name].component}
          {errors
            .filter(({ field }) => field === name)
            .map(item => (
              <ErrorMessage message={item.message} />
            ))}
        </FlexWrapperRow>
      ))}
      <SubmitStyled type="submit" value="Login" />
    </FormStyled>
  );
};

export default LoginForm;
