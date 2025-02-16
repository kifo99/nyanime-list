export const errorHandler = (errors = null, message = "", status = 500) => {
  const error = new Error(message);
  error.statusCode = status;
  if (errors) error.data = errors;

  throw error;
};
