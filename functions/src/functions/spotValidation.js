function LoginValidations(value, half, weekly, daily, monthly) {
  if (value.spotName === "") {
    return "Spot Name is Required!";
  } else if (value.spotAddress === "") {
    return "Spot Address is Required!";
  }
  if (value.noOfSpot === "") {
    return "No Of Spot is Required!";
  } else if (value.spotDescription === "") {
    return "Spot Description is Required!";
  }
  if (half && value.halfDayPrice === 0) {
    return "Half Day Price is Required!";
  } else if (daily && value.dailyPrice === 0) {
    return "Daily Day Price is Required!";
  } else if (weekly && value.weeklyPrice === 0) {
    return "Weekly Day Price is Required!";
  } else if (monthly && value.monthlyPrice === 0) {
    return "Monthly Day Price is Required!";
  } else if (value.endDate === "") {
    return "End Date is Required!";
  } else if (value.startDate === "") {
    return "Start Date is Required!";
  } else if (value.firstImageUrl === "") {
    return "First Image is Required!";
  } else if (value.secondImageUrl === "") {
    return "Second Images is Required!";
  } else if (value.thirdImageUrl === "") {
    return "Third Image is Required!";
  } else if (
    half === false &&
    weekly === false &&
    daily === false &&
    monthly === false
  ) {
    return "Select Any Availability Price";
  } else if (value.check === false) {
    return "Please Accept the Term and Policy";
  }
  return "All Clear";
}

export function spotOption(daily, weekly, monthly, halfday) {
  if (halfday) {
    return "Half Day";
  } else if (weekly) {
    return "WEEKLY";
  } else if (daily) {
    return "DAILY";
  } else if (monthly) {
    return "MONTHLY";
  }
  return "";
}

export default LoginValidations;
