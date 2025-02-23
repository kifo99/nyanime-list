export const errorHandler = (errors = null, message = "", status = 500) => {
  console.log(`Throwing error: ${message}, Status: ${status}`);
  const error = new Error(message);
  error.statusCode = status;
  if (errors) error.data = errors;

  throw error;
};
