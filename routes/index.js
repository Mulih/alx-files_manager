import express from 'express';
import AppController from '../controllers/AppController';

function controllerRouting(app) {
	const router = express.Router();
	app.use('/', router);

	//App controller
	// Should return if redis is alive and DB is alive too
	router.get('/status', (req, res) => {
	});

	// Should return the number of users and files in DB
	router.get('/stats', (req, res) => {
		AppController.getStats(req, res);
	});
}

export default controllerRouting;
