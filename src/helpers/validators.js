exports.isUuid = (param) => {
  const uuidRegexFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegexFormat.test(param);
};

exports.isEmail = (param) => {
  const emailRegexFormat = /\S+@\S+\.\S+$/;
  return emailRegexFormat.test(param);
};

exports.containsEmail = (param) => {
  const multipleEmailRegexFormat = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}(?:[,;][A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4})*$/i;
  return multipleEmailRegexFormat.test(param);
};

exports.isUrl = (param) => {
  const urlRegexFormat = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  return urlRegexFormat.test(param);
};

exports.isPhoneNumber = (param) => {
  const phoneRegexFormat = /^\+\d{9,30}$/;
  return phoneRegexFormat.test(param);
};

exports.min = (minParam) => (param) => minParam <= param;
exports.max = (maxParam) => (param) => maxParam >= param;
exports.inRange = (start, end) => (param) => (param >= start && param <= end);
exports.notInRange = (start, end) => (param) => !(param > start && param < end);
