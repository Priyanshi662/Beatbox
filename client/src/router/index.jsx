import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import HomeLayout from "../layout/HomeLayout.jsx";
import LibraryPage from "../pages/LibraryPage.jsx";
import PlaylistsPage from "../pages/PlaylistsPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ArtistPage from "../pages/ArtistPage.jsx";
import ArtistsPage from "../pages/ArtistsPage.jsx";
import FavoritesPage from "../pages/FavoritesPage.jsx";
import PlaylistPage from "../pages/PlaylistPage.jsx";
import CreatePlaylistPage from "../pages/CreatePlaylistPage.jsx";
import EditPlaylistPage from "../pages/EditPlaylistPage.jsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Navigate to="/home" replace /> },
			{
				path: "/home",
				element: <HomePage />,
			},
			{
				path: "library",
				element: <LibraryPage />,
			},
			{
				path: "playlists",
				element: <PlaylistsPage />,
			},
			{
				path: "playlists/:id",
				element: <PlaylistPage />,
			},
			{
				path: "playlists/create",
				element: <CreatePlaylistPage />,
			},
			{
				path: "playlists/edit/:id",
				element: <EditPlaylistPage />,
			},
			{
				path: "artists",
				element: <ArtistsPage />,
			},
			{
				path: "artist/:id",
				element: <ArtistPage />,
			},
			{
				path: "favorites",
				element: <FavoritesPage />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
]);