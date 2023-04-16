export const validateEmail = (email: string) => {
  return email.match(/^{1,}@{1,}/g)
}