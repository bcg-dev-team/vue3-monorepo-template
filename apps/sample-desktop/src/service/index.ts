import { ExampleService } from '@template/api';
import api from './axios';

export const exampleService = new ExampleService(api);

// api.get('/posts/1');
