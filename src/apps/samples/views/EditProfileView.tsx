import { FC, useEffect, useState } from "react";
import { Input, Button } from "antd";
import { error } from "../../../common/utils/Mesg";
import { TxInfoView } from "../../../common/views/TxInfoView";
import useQuery from "../../../contracts/profileContract/hooks/useQuery";
import useExec from "../../../contracts/profileContract/hooks/useExec";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import './css/EditProfileView.css';

export interface EditProfileProps {

    setEditMode? : (editMode: boolean) => void,
}

export const EditProfileView : FC <EditProfileProps> = ({
    setEditMode
}) => {

    const { TextArea } = Input;

    const {queryProfile} = useQuery();

    const {updateProfile, loading} = useExec();

    const wallet = useConnectedWallet();

    const [txHash, setTxHash] = useState("");

    const [name, setName] = useState("");

    const [bio, setBio] = useState("");

    const [location, setLocation] = useState("");

    useEffect(()=>{

        queryProfile((p)=>{

            setName(p.name);
            setBio(p.bio ?? "");
            setLocation(p.location ?? "");

        });

    },[wallet?.walletAddress]);


    return <div className="editProfileView">
    <table style={{width:"400px", background:"transparent"}} cellPadding={5} cellSpacing={5}>
        <tr>
            <td align="left" valign="top"  style={{width:"30%"}}><b>Name</b></td>
            <td align="left" valign="top"  style={{width:"70%"}}><Input type="text" 
            style={{maxWidth:"200px", color:"black"}} value ={name}/></td>
        </tr>
        <tr>
            <td align="left" valign="top"  style={{width:"30%"}}><b>Bio</b></td>
            <td align="left" valign="top"  style={{width:"70%"}}><TextArea 
            cols={60} rows={2} style={{color:"black"}} value={bio}/></td>
        </tr>
        <tr>
            <td align="left" valign="top"  style={{width:"30%"}}><b>Location</b></td>
            <td align="left" valign="top"  style={{width:"70%"}}><Input type="text" 
            style={{maxWidth:"120px", color:"black"}} value={location}/></td>
        </tr>
        <tr>
            <td align="center" colSpan={2}>
                <Button shape="round" onClick={async ()=>{

                    await updateProfile({
                        name : name, 
                        wallet_address : wallet?.walletAddress ?? "",
                        bio : bio,
                        location : location,
                    }, (txInfo)=>{

                        if ( txInfo instanceof Error){
                            error(txInfo.message, 5);
                        }
                        else {
                            setTxHash(txInfo.txhash);
                        }
                    });
                
                    
                    
                }}>Update</Button>
                &nbsp;&nbsp;
                <Button shape="round" onClick={async ()=>{

                    if ( setEditMode)
                        setEditMode(false);
                }}>Cancel</Button>
            </td>
        </tr>
    </table>
    <TxInfoView txInfo={txHash} loading={loading}/>
    </div>
}