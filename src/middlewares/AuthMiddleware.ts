import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default class AuthMiddleware {
	public authenticate = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response> => {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({
				error: 'Auth token not found'
			});
		}

		const [, token] = authHeader.split(' ');

		try {
			const decoded = await jsonwebtoken.verify(token, process.env.JWT_SECRET);
			const { id, name, email } = decoded as {
				id: number;
				name: string;
				email: string;
			};
			req.user = { id, name, email };
			next();
		} catch (err) {
			return res.status(401).json({
				error: 'Auth token invalid'
			});
		}
	};
}
