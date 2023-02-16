import fire from "../config/config";

let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export function SignupValidations(value) {
  if (value.firstName === "") {
    return "First Name is Required!";
  } else if (value.lastName === "") {
    return "Last Name is Required!";
  } else if (value.email === "") {
    return "Email is Required!";
  } else if (value.phoneNumber == undefined || value.phoneNumber === "") {
    return "Phone Number is Required!";
  } else if (value.password === "") {
    return "Password is Required!";
  } else if (value.confirmPassword === "") {
    return "Confirm Password is Required";
  } else if (value.confirmPassword !== value.password) {
    return "Password Doesn't Match!";
  } else if (value.checkBox === false) {
    return "Please Accept Terms and Privacy Policy";
  }
  return "All Clear";
}

export function LoginValidations(value) {
  if (value.email === "" && value.password === "") {
    return "All fields required!";
  } else if (value.email === "") {
    return "Email is required!";
  } else if (!regex.test(value.email)) {
    return "Email is not valid!";
  } else if (value.password === "") {
    return "Password is required!";
  }
  return "All Clear";
}

export function CarRegistrationValidation(value) {
  if (value.make === "") {
    return "Car Make Required!";
  } else if (value.model === "") {
    return "Car Model Required!";
  } else if (value.year === "") {
    return "Car Year Required!";
  } else if (value.carColor === "") {
    return "Car Color Required!";
  } else if (value.licenseNumber === "") {
    return "License Number Required!";
  } else if (value.frontLicenseImage === "") {
    return "Front License Image Required!";
  } else if (value.backLicenseImage === "") {
    return "Back License Image Required!";
  }
  return "OK";
}
