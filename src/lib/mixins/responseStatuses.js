const convertToResponse = function( statusCode, response ) {
  return { statusCode, response };
};
module.exports = {
  SUCCESS ( res, data ) {
    const statusCode = 200;
    return res.status(statusCode).send(convertToResponse(statusCode, data));
  },
  SERVER_ERROR ( res, data ) {
    const statusCode = 500;
    return res.status(statusCode).send(convertToResponse(statusCode, data));
  },
  UNAUTHORIZED ( res, data ) {
    const statusCode = 403;
    return res.status(statusCode).send(convertToResponse(statusCode, data));
  },
  PRECONDITION_FAILED ( res, data ) {
    const statusCode = 412;
    return res.status(statusCode).send(convertToResponse(statusCode, data));
  },
  CONFLICTS ( res, data ) {
    const statusCode = 409;
    return res.status(statusCode).send(convertToResponse(statusCode, data));
  },
  NOT_FOUND ( res, data ) {
    const statusCode = 404;
    return res.status(statusCode).send(convertToResponse(statusCode, data));
  },
};