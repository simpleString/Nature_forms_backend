export interface IUserData {
  email: string;
  password: string;
}

export interface IUserSignDTO {
  username: string;
  surname: string;
  password: string;
  email: string;
  status: string;
}

export interface IPostDTO {
  title: string;
  content: string;
  categoryId: number;
  img: string
}

export interface ITestFormDTO {
  title: string;
  options: {
    id: number;
    name: string;
  }[];
  rightAnswer: number;
}

export interface ITestAnswerDTO {
  testId: number;
  answerId: number;
}
