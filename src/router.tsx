import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/index/MainPage";
import RootLayout from "./pages/index/RootLayout";


import { ReactRouterError } from "./shared/extra/ReactRouterError";
import { LoaderElipse } from "./shared/loaders/Loaders";
import { AppUser } from "./state/types/base";

// const RootLayout = lazy(() => import("./pages/index/RootLayout"));
// const MainPage = lazy(() => import("./pages/index/MainPage"));

const AuthLayout = lazy(() => import("./pages/auth/AuthLayout"));
const LoginPage = lazy(() => import("./pages/auth/Login"));
const SignupPage = lazy(() => import("./pages/auth/Signup"));

const TestLayout = lazy(() => import("./components/test/TestLayout"));
const Test = lazy(() => import("./components/test/Test"));

const ShopsLayout = lazy(() => import("./pages/shops/ShopsLayout"));
const Shops = lazy(() => import("./pages/shops/Shops"));
const OneShop = lazy(() => import("./pages/shops/OneShop"));

const TenantsLayout = lazy(() => import("./pages/tenants/TenantsLayout"));
const Tenants = lazy(() => import("./pages/tenants/Tenants"));

const PrintLayout = lazy(() => import("./pages/print/PrintLayout"));
const Print = lazy(() => import("./pages/print/Print"));


export function makeRouter(user: AppUser) {
    return createBrowserRouter([
        {
            path: '/',
            element: <RootLayout user={user} />,
            // loader:userLoader(queryClient),
            errorElement: <ReactRouterError />,
            children: [
                { index: true, element: <MainPage user={user} /> },
                {
                    path: '/shops',
                    element: <Suspense fallback={<LoaderElipse />}><ShopsLayout user={user} /></Suspense>
                    ,
                    children: [
                        {
                            index: true,
                            element: <Suspense fallback={<LoaderElipse />}> <Shops user={user} /></Suspense>
                            ,
                            // loader: deferredBlogPostsLoader,
                        },
                        {
                            path: ':id',
                            element: <Suspense fallback={<LoaderElipse />}> <OneShop user={user} /></Suspense>
                            ,
                            // loader: deferredBlogPostsLoader,
                        },

                    ],
                },
                {
                    path: '/tenants',
                    element: <Suspense fallback={<LoaderElipse />}><TenantsLayout user={user} /></Suspense>
                    ,
                    children: [
                        {
                            index: true,
                            element: <Suspense fallback={<LoaderElipse />}> <Tenants user={user} /></Suspense>
                            ,
                            // loader: deferredBlogPostsLoader,
                        },


                    ],
                },

                {
                    path: '/auth',
                    element: <Suspense fallback={<LoaderElipse />}><AuthLayout user={user} /></Suspense>,
                    children: [
                        {
                            index: true,
                            element: <Suspense fallback={<LoaderElipse />}> <LoginPage /></Suspense>,
                            // loader: deferredBlogPostsLoader,
                        },
                        {
                            path: '/auth/signup',
                            element: <Suspense fallback={<LoaderElipse />}><SignupPage user={user} /></Suspense>,
                            // loader: blogPostLoader,
                        },
                    ],
                }, {
                    path: '/print',
                    element: <Suspense fallback={<LoaderElipse />}><PrintLayout  /></Suspense>,
                    children: [
                        {
                            index: true,
                            element: <Suspense fallback={<LoaderElipse />}><Print  /></Suspense>,
                            // loader: deferredBlogPostsLoader,
                        },

                    ],
                },

                {
                    path: '/test',
                    element: <Suspense fallback={<LoaderElipse />}><TestLayout /></Suspense>,
                    children: [
                        {
                            index: true,
                            element: <Suspense fallback={<LoaderElipse />}><Test user={user} /></Suspense>,
                            // loader: deferredBlogPostsLoader,
                        },

                    ],
                },

            ],
        },

    ]);
}


