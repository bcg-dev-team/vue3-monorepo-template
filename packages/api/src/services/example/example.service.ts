import { AxiosInstance } from 'axios';

export class ExampleService {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  // 개인 회원가입
  example() {
    return this.axios.get('/posts/1');
  }
}
