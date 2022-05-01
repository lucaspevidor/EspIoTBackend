import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class DeviceController {
	public async create (req: Request, res: Response): Promise<Response> {
		const prisma = new PrismaClient();

		const { mac, name } = req.body;
		if (!mac || !name) {
			return res.status(400).json({
				error: 'MAC address and name are required'
			});
		}

		const deviceFound = await prisma.device.findFirst({
			where: {
				mac
			}
		});

		if (deviceFound) {
			return res.status(400).json({
				error: 'Device already registered'
			});
		}

		const device = await prisma.device.create({
			data: {
				mac,
				name,
				ownerId: req.user.id
			}
		});

		if (device) {
			return res.status(201).json(device);
		}

		return res.status(500).json({
			error: 'Something went wrong while creating the device'
		});
	}

	public async get (req: Request, res: Response): Promise<Response> {
		const prisma = new PrismaClient();

		const { mac } = req.params;
		const { id } = req.user;

		const device = await prisma.device.findFirst({
			where: {
				mac,
				ownerId: id
			}
		});

		if (device) {
			return res.status(200).json(device);
		}

		return res.status(404).json({
			error: 'Device not found'
		});
	}

	public async getAll (req: Request, res: Response): Promise<Response> {
		const prisma = new PrismaClient();

		const { id } = req.user;

		const devices = await prisma.device.findMany({
			where: {
				ownerId: id
			}
		});

		if (devices) {
			return res.status(200).json(devices);
		}

		return res.status(200).json({
			devices: []
		});
	}

	public async delete (req: Request, res: Response): Promise<Response> {
		const prisma = new PrismaClient();

		const { mac } = req.params;
		const { id } = req.user;

		if (!mac || !id) {
			return res.status(400).json({
				error: 'MAC address and user id are required'
			});
		}

		const deviceFound = await prisma.device.findFirst({
			where: {
				mac,
				ownerId: id
			}
		});

		if (!deviceFound) {
			return res.status(400).json({
				error: 'Device not found'
			});
		}

		const result = await prisma.device.delete({
			where: {
				id: deviceFound.id
			}
		});

		if (result) {
			return res.status(200).json({
				message: 'Device deleted'
			});
		}

		return res.status(500).json({
			error: 'Something went wrong while deleting the device'
		});
	}
}

export default new DeviceController();
