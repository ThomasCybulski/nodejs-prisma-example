import App from './app';
import { routes } from './routes';

// eslint-disable-next-line import/prefer-default-export
export const app = new App(routes);

app.listen();
