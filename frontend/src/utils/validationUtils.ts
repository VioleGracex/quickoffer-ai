export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateSignUpPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const validateSignInPassword = (password: string): boolean => {
    if (password === "adminpassword") return true; // Special case for admin
    return validateSignUpPassword(password); // Normal validation for other users
  };
  