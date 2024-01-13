import jwt from "jsonwebtoken";

export async function generateJwtToken(data, secret) {
    try {
        const token = await jwt.sign({ data }, secret, { expiresIn: '24h' });
        return token
    } catch (error) {
        console.error("Error generate jwt token:", error);
        throw error;
    }
}
