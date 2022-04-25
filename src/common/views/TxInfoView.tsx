import { FC } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { terraFinderURI } from "../utils/funcs";
import { Spin } from "antd";

export interface TxInfoViewProps {

    txInfo? : string, 

    loading? : boolean,
}

export const TxInfoView : FC <TxInfoViewProps>  = ({
    txInfo, loading
}) =>{

    const wallet = useConnectedWallet();

   
    const spinner = () =>{

        return loading ? 
         <span>Processing...<Spin style={{marginLeft:"4px"}} size="small"/></span> : <></>;
    } 

    const txInfoView = (txInfo : string ) => {

        return <span>Tx Info : <a target="_blank" href={terraFinderURI(txInfo,wallet)}>{txInfo.substring(0,10)+"..."}</a></span>
        
    }

  
    return <>
    <p className="txInfoView">{(txInfo && txInfo.trim() !== "") ? 
        <>{txInfoView(txInfo)}</>
        : <>{spinner()}</>}
    </p>
    </>

}