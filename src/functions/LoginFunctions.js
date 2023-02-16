function LoginValidations(value) {
  if (value.email === "") {
    return "email is Required!";
  } else if (value.password === "") {
    return "Password is Required!";
  }
  return "All Clear";
}

export default LoginValidations;
