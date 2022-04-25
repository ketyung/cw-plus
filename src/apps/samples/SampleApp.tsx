import { FC } from "react";
import { MenuBar } from "../../common/views/menu/MenuBar";
import { ProfileView } from "./views/ProfileView";
import '../../common/css/view.css';

export const SampleApp : FC = () => {
   
    return <><MenuBar/>
    <ProfileView/>
    </>
};