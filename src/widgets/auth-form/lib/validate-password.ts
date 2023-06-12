export const validatePassword = (password: string) => {
  return password.match(/.{4,}/g)
}

export const validateResetPasswords = (
  password: string,
  confirmPassword: string
): string[] => {
  const errors = []

  if (password !== confirmPassword) {
    errors.push("Passwords not equal")
  }

  if (!validatePassword(password)) {
    errors.push("Password too short")
  }

  return errors
}
