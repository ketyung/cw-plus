import React,{useState, useEffect} from 'react';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { shortenStringTo, fromMicro, copy } from '../../utils/funcs';
import { Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

export const MenuView : React.FC = () => {

    const connectedWallet = useConnectedWallet();

    const [balance, setBalance] = useState("");

    const lcd = useLCDClient();

    function fetchBalance(){

       if (connectedWallet) {

            lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {

                let allCoins = coins.toArray().filter((c)=> c.denom === "uluna" );
                
                if ( allCoins.length > 0)
                    setBalance(fromMicro(allCoins[0].amount.toNumber()).toFixed(3) + " luna" );//+ allCoins[0].denom);

                // console.log("coins::", allCoins);
            });
    
        }
    }

    useEffect (()=>{

        fetchBalance();

    }, [connectedWallet]);


    return  <span>
        <div style={{backgroundColor:"#789", marginTop:"10px"}}>
             <span style={{color:"white",marginLeft:"10px",float:"left"}}> 
             <Button shape="circle" style={{width:"20px",height:"30px"}} onClick={()=>{
                copy(connectedWallet?.walletAddress ?? "");
            }}><CopyOutlined/></Button></span>
           <span style={{color:"white",marginLeft:"10px",float:"left"}}> 
            {shortenStringTo(connectedWallet?.walletAddress ?? "", 16)}</span>
           { connectedWallet ? 
           <span style={{color:"white", float:"left", marginLeft:"10px"}}>Balance : {balance}</span>
           : <></>}
        </div>
    </span>
}

