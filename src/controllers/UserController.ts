import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class UserController {
	public createUser = async (
		req: Request,
		res: Response
	): Promise<Response> => {
		const prisma = new PrismaClient();

		const { name, email } = req.body;

		// check if email in use
		const userFound = await prisma.user.findFirst({
			where: {
				email
			}
		});

		if (userFound) {
			return res.status(400).json({
				error: 'Email already in use'
			});
		}

		const user = await prisma.user.create({
			data: {
				name,
				email
			}
		});

		return res.json(user);
	};
}

export default new UserController();
