import PrismaClient from '../database/client';
import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

class AuthController {
	public authenticate = async (
		req: Request,
		res: Response
	): Promise<Response> => {
		const prisma = PrismaClient;
		const { name, email } = req.body;
		const userFound = await prisma.user.findFirst({
			where: {
				email
			}
		});

		if (!userFound) {
			return res.status(400).json({
				error: 'User not found'
			});
		}

		if (userFound.name !== name) {
			return res.status(400).json({
				error: 'User not found'
			});
		}

		// Authenticate user with jsonWebToken
		const token = jsonwebtoken.sign(
			{
				id: userFound.id,
				email: userFound.email,
				name: userFound.name
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '6h'
			}
		);

		return res.json({
			token,
			user: {
				id: userFound.id,
				name: userFound.name,
				email: userFound.email
			}
		});
	};
}

export default new AuthController();
