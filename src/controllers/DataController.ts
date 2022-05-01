import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class DataController {
	public async create (req: Request, res: Response): Promise<Response> {
		const prisma = new PrismaClient();

		const { mac } = req.params;
		const { data } = req.body;

		const device = await prisma.device.findFirst({
			where: {
				mac,
				ownerId: req.user.id
			}
		});

		if (!device) {
			return res.status(400).json({
				error: 'Device not found'
			});
		}

		const dataCreated = await prisma.deviceData.create({
			data: {
				deviceId: device.id,
				info: data
			}
		});

		if (dataCreated) {
			return res.status(201).json(dataCreated);
		}

		return res.status(500).json({
			error: 'Something went wrong while creating the data'
		});
	}
}

export default new DataController();
