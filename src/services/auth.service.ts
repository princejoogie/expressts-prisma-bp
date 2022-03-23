import { Response } from "../types";

interface GetMessageResponse {
  message: string;
}

class AuthService {
  static instance: AuthService;

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private constructor() {
    // eslint-disable-next-line no-console
    console.log("AuthService created");
  }

  public async getMessage(): Promise<Response<GetMessageResponse>> {
    return { data: { message: "Hello" } };
  }
}

export default AuthService;
