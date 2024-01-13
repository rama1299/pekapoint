import dotenv from 'dotenv'
import { validateHash } from '../../helpers/hashing.js'

dotenv.config()
const apiKeyEnv = process.env.VITE_API_KEY ?? 'mainApiKey'

const validateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.query.apiKey;

        if (!apiKey || apiKey === null || apiKey === undefined) {
            return res.status(401).json({ message: 'Unauthorization or Invalid apiKey!' });
        }

        const validation = await validateHash(apiKeyEnv, apiKey);

        if (!validation) {
            return res.status(401).json({ message: 'Unauthorization or Invalid apiKey!' });
        }

        next();
    } catch (error) {
        next(error);
    }
}

export default validateApiKey