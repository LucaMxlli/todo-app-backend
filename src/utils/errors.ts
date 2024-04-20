export const InternalServerError = {
  status: 500,
  message: "Internal Server Error",
  errorcode: 1,
};

export const BodyError = (message: string = "Wrong Input") => {
  return {
    status: 422,
    message: message,
    errorcode: 3,
  } as IBasicResponse;
};

export const NotFoundError = (message: string = "Not Found") => {
  return {
    status: 404,
    message: message,
    errorcode: 4,
  };
};

export const UnauthorizedError = (message: string = "Unauthorized") => {
  return {
    status: 401,
    message: message,
    errorcode: 2,
  };
};

export const ForbiddenError = (message: string = "Forbidden") => {
  return {
    status: 403,
    message: message,
    errorcode: 5,
  };
};
