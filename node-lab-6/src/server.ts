import app from './app';
import { env } from './config/env';
import { connectDB } from './config/database';

const startServer = async () => {
	try {
		await connectDB();

		app.listen(env.PORT, () => {
			console.log(`Server is running on http://localhost:${env.PORT}`);
			console.log(`Environment: ${env.NODE_ENV}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
};

startServer();
