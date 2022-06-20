import 'dotenv/config';

import { App } from './app';
import { PORT_RESERVE } from './app/constants';
import { userRouter } from './app/entity/user';
import { usersRouter } from './app/entity/users';

const PORT = process.env.PORT || PORT_RESERVE;

const app = new App();

app.addRouter(usersRouter);
app.addRouter(userRouter);

app.listen(PORT, () => console.log(`SIMPLE CRUD API started on port: ${PORT}`));
