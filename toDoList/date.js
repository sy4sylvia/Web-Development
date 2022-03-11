module.exports.getDate = function() {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  let day = today.toLocaleString("en-US", options);

  return day;
}

module.exports.getDay = function() {
  const today = new Date();
  const options = {
    weekday: "long",
  }
  let day = today.toLocaleString("en-US", options);

  return day;
}
