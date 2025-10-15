// 从 React 库导入核心对象，用于使用 JSX 和创建组件。
import React from "react"; 
// 从 React 18 的新入口导入 createRoot，用于在页面中挂载 React 应用。
import { createRoot } from "react-dom/client";
// 从 react-router 导入:
// - BrowserRouter：用于包裹整个应用，使其支持前端路由（基于 URL）。
// - Routes：用于定义路由容器，代替旧版的 <Switch>。
// - Route：用于定义单个路由路径和对应渲染的组件。
// - Navigate：用于在路由中重定向页面。
import { BrowserRouter, Route, Navigate, Routes} from "react-router";
// 导入自定义页面组件 HomePage，对应网站首页内容。
import HomePage from "./pages/homePage";
// 导入电影详情页组件 MoviePage，用于展示单个电影的详细信息。
import MoviePage from "./pages/movieDetailsPage";
// 导入 FavoriteMoviesPage 组件，用于展示用户收藏的电影页面。
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
// 导入 MovieReviewPage 组件，用于显示或添加电影评论。
import MovieReviewPage from "./pages/movieReviewPage";
// 导入网站头部组件 SiteHeader，一般用于显示导航栏或网站统一头部 UI。
import SiteHeader from './components/siteHeader'
// 从 react-query (新版 @tanstack/react-query) 导入：
// - QueryClient：创建全局客户端实例，用于管理缓存、请求状态等。
// - QueryClientProvider：用于将 QueryClient 包裹应用，使子组件可以使用 react-query。
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// 导入 react-query 的开发者工具组件，用于调试查询状态和缓存。
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from './pages/upcomingMoviesPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

// QueryClientProvider: 让所有子组件可以使用react query来进行数据请求、缓存、状态管理
// ReactQueryDevtools: 查看 React Query 的缓存、请求状态等。
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};



const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
