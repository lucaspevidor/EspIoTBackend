import { PrismaClient } from '@prisma/client';

class Client {
	public client: PrismaClient;

	constructor () {
		this.client = new PrismaClient();
	}
}

const prismaClient = new Client();

export default prismaClient.client;
