import { createExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

// creates express app, registers all controller routes and returns you express app instance
const server = createExpressServer({
  controllers: [`${__dirname}/controllers/*.ts`],
  development: false
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// run express application on port 3000
server.listen(process.env.HOST_PORT);
