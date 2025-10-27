/**
 * Correctly wraps an async Express route handler.
 * It ensures that any promise rejection (error) inside the async function
 * is automatically passed to the next() function for Express to catch
 * with the global error handler.
 *
 * @param {Function} fn - The async function (req, res, next) => {...} to wrap.
 */
const asyncHandler = (fn) => {
  // Returns the standard Express middleware function (req, res, next)
  return (req, res, next) => {
    // 1. Executes the async function (fn)
    // 2. Uses Promise.resolve() to ensure the return value is a Promise
    // 3. Catches any rejection (error) and calls next(error)
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
