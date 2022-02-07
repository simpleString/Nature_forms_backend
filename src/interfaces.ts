export interface IUserData {
  username: string;
  password: string;
}

export interface IPostDTO {
  title: string;
  content: string;
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
