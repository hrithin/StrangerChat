const asyncWrapper = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next); // Automatically catches errors and forwards to next middleware
    };
  };
  
  export { asyncWrapper } ;