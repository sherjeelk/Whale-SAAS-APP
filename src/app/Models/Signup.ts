
  export interface User {
    id: string;
    name: string;
    picture: string;
    email: string;
    createdAt: Date;
  }

  export interface Signup {
    token: string;
    user: User;
  }



