import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "../layouts/AppLayout";
import PostList from "../pages/posts/PostList";
import PostForm from "../pages/posts/PostForm";
import PostDetail from "../pages/posts/PostDetail";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/posts" replace={true} />
            },
            {
                path: "posts",
                element: <PostList />
            },
            {
                path: "posts/new",
                element: <PostForm mode="create" />
            },
            {
                path: "posts/:id", // id 동적 파라미터 -> useParam()을 통해 id 값을 가져옴
                element: <PostDetail />
            },
            {
                path: "posts/:id/edit",
                element: <PostForm mode="edit" />
            },
            {
                path: "auth/login",
                element: <LoginPage />
            },
            {
                path: "auth/register",
                element: <RegisterPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]);