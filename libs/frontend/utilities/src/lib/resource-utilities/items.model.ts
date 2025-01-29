// Based on: https://danielsogl.medium.com/functional-programming-in-angular-exploring-inject-and-resources-fd0311fd4445

export interface ItemInterface extends Post {}

export interface Post {
  userId: number | string;
  id: number;
  title: string;
  body: string;
}

