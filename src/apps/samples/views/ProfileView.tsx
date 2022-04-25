import { FC , useEffect, useState} from "react";
import useQuery from "../../../contracts/profileContract/hooks/useQuery";
import { Profile } from "../../../contracts/profileContract/models";
import { EnvironmentFilled } from "@ant-design/icons";
import { EditFilled } from "@ant-design/icons";
import { CountView, CountType } from "./CountView";
import { EditProfileView } from "./EditProfileView";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import './css/ProfileView.css';
import { Button } from "antd";

export const ProfileView : FC = () => {

    const {queryProfile} = useQuery();

    const [profile, setProfile] = useState<Profile>();

    const [editMode, setEditMode] = useState(false);

    const wallet = useConnectedWallet();

    useEffect(()=>{

        queryProfile((p)=>{
            setProfile(p);
        });

    },[wallet?.walletAddress]);

    const profileView = <div className="profileView"><Button shape="circle" style={{float:"right"}}
    onClick={()=>{ setEditMode(true); }}><EditFilled/></Button>
        <img src={profile?.profile_image_url} title="Profile Image" />
        <div className="nameView">
            <p>{profile?.name}</p>
            <p><EnvironmentFilled/> {profile?.location}</p>
        </div>
        <br/>
        <CountView type={CountType.followers}/>
        <CountView type={CountType.followings}/>
    </div>;

    const view = () =>{

        if (!editMode) 
            return profileView;
        else 
            return <EditProfileView setEditMode={setEditMode}/>;
    } 

    return <>
    { view() }
    </> 
};