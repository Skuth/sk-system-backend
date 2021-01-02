import { ErrorRequestHandler } from "express"
import { ValidationError } from "yup"

interface ValidationErrors {
  [Key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {}

    error.inner.forEach((err, index) => {
      const errIndex = err.path || `Error ${index}`
      errors[errIndex] = err.errors
    })

    return res.status(400).json({ message: "Validation fails", errors })
  }

  console.log(error)

  return res.status(500).json({ message:  "Internal server error" })
}

export default errorHandler