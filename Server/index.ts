import express from 'express';

import configureExpress from './config/express';

import healthRoutes from './routes/health.routes';

const app: express.Express = express();
const PORT = process.env.PORT || 8080;

// App configuration
configureExpress(app);

// Add routes to routing table
healthRoutes(app);

// Start the app on PORT
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(` Server is listeing on ${PORT}...`);
});
