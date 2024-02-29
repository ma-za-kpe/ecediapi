const myMiddleware = (req, res, next) => {
  // 2. Implement middleware logic
  console.log("Middleware executed");

  // 3. Call the next function
  next();
};
