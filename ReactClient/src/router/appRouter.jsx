import { createBrowserRouter,createRoutesFromElements,Route } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import RootLayout from "../layouts/RootLayout";
import SignInPage from "../pages/singin/SignInPage";
import Forget_Password from "../pages/users/Forget";
import Dashboard from "../pages/dashboard/Dashboard";
import BrowsingLog from "../pages/log/BrowsingLog";
import ErrorLog from "../pages/log/ErrorLog";
import AppMenu from "../pages/menus/AppMenu";
import MenuGroup from "../pages/menus/MenuGroup";
import User from "../pages/users/User";
import UserRole from "../pages/users/UserRole";
import Password from "../pages/users/Password";
import Profile from "../pages/users/Profile";
import Contact from "../pages/others/Contact";
import Faq from "../pages/others/Faq";
import DisplayFaq from "../pages/others/DisplayFaq";
import AppSettings from "../pages/settings/AppSettings";
import NotFound_404 from "../pages/error/NotFound_404";
import Unauthorized_401 from "../pages/error/Unauthorized_401";
import Forbidden_403 from "../pages/error/Forbidden_403";
import Unexpected_Error from "../pages/error/Unexpected_Error";

export const appRouter=createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<LandingLayout/>}/>
            <Route path="/signin" element={<SignInPage/>}/>
            <Route path="/forget/:hash" element={<Forget_Password/>}/>
            <Route element={<RootLayout/>} errorElement={<Unauthorized_401/>}>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="menu" element={<AppMenu/>}/>
                <Route path="menu-group" element={<MenuGroup/>}/>
                <Route path="users" element={<User/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="change-password" element={<Password/>}/>
                <Route path="display-faq" element={<DisplayFaq/>}/>
                <Route path="user-role" element={<UserRole/>}/>
                <Route path="browse-log" element={<BrowsingLog/>}/>
                <Route path="error-log" element={<ErrorLog/>}/>
                <Route path="contact" element={<Contact/>}/>
                <Route path="faq" element={<Faq/>}/>
                <Route path="settings" element={<AppSettings/>}/>
            </Route>
            <Route path="/unauthorize" element={<Unauthorized_401/>}/>
            <Route path="/forbidden" element={<Forbidden_403/>}/>
            <Route path="/unexpected" element={<Unexpected_Error/>}/>
            <Route path="*" element={<NotFound_404/>}/>
        </>
    )
)