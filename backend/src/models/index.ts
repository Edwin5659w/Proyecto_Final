export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
}

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    content: string;
}