// this shim is required
import { createExpressServer } from "routing-controllers";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  controllers: [__dirname + "/controllers/*.js"],
});

// run express application on port 3000
app.listen(3000);
