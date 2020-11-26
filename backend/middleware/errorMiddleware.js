const notFound = (req, res, next) => {  //customized url not found error 
  const error = new Error(`URL not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandeler = (err, req, res, next) => {   //customized error handeler
  const statusCode = (res.statusCode === 200)? 500: res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production'? null: err.stack
  })
}

export { notFound, errorHandeler };