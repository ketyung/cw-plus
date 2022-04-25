import { FC , useEffect, useState} from "react";
import useQuery from "../../../contracts/profileContract/hooks/useQuery";
import { Profile } from "../../../contracts/profileContract/models";
import { EnvironmentFilled } from "@ant-design/icons";
import { CountView, CountType } from "./CountView";
import './css/ProfileView.css';

export const ProfileView : FC = () => {

    const {queryProfile} = useQuery();

    const [profile, setProfile] = useState<Profile>();

    useEffect(()=>{

        queryProfile((p)=>{
            setProfile(p);
        });

    },[]);

    return <div className="profileView">
        <img src={profile?.profile_image_url} title="Profile Image" />
        <div className="nameView">
            <p>{profile?.name}</p>
            <p><EnvironmentFilled/> {profile?.location}</p>
        </div>
        <br/>
        <CountView type={CountType.followers}/>
        <CountView type={CountType.followings}/>
    </div>
};