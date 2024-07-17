const respose = (res, status, message, data = null) => {
  let result = {
    status,
    message,
  };

  if (data) {
    result.data = data;
  }

  res.status(status).send(result);
};

module.exports = respose;
