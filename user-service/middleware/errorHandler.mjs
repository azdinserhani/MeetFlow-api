import AppError from "../utils/AppError.mjs";

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  }
  if (err.isJoi) {
    return res
      .status(400)
      .json({ status: "fail", message: err.details[0].message });
  }
  res.status(500).json({ status: err.status, message: err.message });
};
export default errorHandler;
