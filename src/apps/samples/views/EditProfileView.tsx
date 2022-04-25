import { FC, useEffect, useState } from "react";
import { Input, Button } from "antd";
import { error } from "../../../common/utils/Mesg";
import { Profile } from "../../../contracts/profileContract/models";
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

    let tmpProfile : Profile | undefined;

    const {queryProfile} = useQuery();

    const {updateProfile, loading} = useExec();

    const wallet = useConnectedWallet();

    const [txHash, setTxHash] = useState("");

    useEffect(()=>{

        queryProfile((p)=>{

            tmpProfile = p; 

            console.log("tmpPro::", tmpProfile);
        });

    },[wallet?.walletAddress]);


    return <div className="editProfileView">
    <table style={{width:"400px", background:"transparent"}} cellPadding={5} cellSpacing={5}>
        <tr>
            <td align="left" valign="top"  style={{width:"30%"}}><b>Name</b></td>
            <td align="left" valign="top"  style={{width:"70%"}}><Input type="text" 
            style={{maxWidth:"200px", color:"black"}} value ={tmpProfile?.name}/></td>
        </tr>
        <tr>
            <td align="left" valign="top"  style={{width:"30%"}}><b>Bio</b></td>
            <td align="left" valign="top"  style={{width:"70%"}}><TextArea 
            cols={60} rows={3} style={{color:"black"}} value={tmpProfile?.bio}/></td>
        </tr>
        <tr>
            <td align="left" valign="top"  style={{width:"30%"}}><b>Location</b></td>
            <td align="left" valign="top"  style={{width:"70%"}}><Input type="text" 
            style={{maxWidth:"120px", color:"black"}} value={tmpProfile?.bio}/></td>
        </tr>
        <tr>
            <td align="center" colSpan={2}>
                <Button shape="round" onClick={async ()=>{

                    if (tmpProfile) {

                        await updateProfile(tmpProfile, (txInfo)=>{

                            if ( txInfo instanceof Error){
                                error(txInfo.message, 5);
                            }
                            else {
                                setTxHash(txInfo.txhash);
                            }
                        });
                    }
                    
                    
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