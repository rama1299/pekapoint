import bcrypt from "bcrypt"

export const generateHashPassword = async (password, saltRounds = 10) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
  
      const hashedPassword = await bcrypt.hash(password, salt);
  
      return hashedPassword;
    } catch (error) {
      console.error("Error generating hashed password:", error);
      throw error;
    }
};

export const compareHashPassword = async (password, hashedPassword) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
  
      return match;
    } catch (error) {
      console.error("Error comparing passwords:", error);
      throw error;
    }
  };