import React,{useState, useEffect} from 'react';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
export const MenuView : React.FC = () => {

    const connectedWallet = useConnectedWallet();

    const [balance, setBalance] = useState("");

    const lcd = useLCDClient();

    function fetchBalance(){

       if (connectedWallet) {

            lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {

                let allCoins = coins.toArray().filter((c)=> c.denom === "uluna" );
                
                if ( allCoins.length > 0)
                    setBalance(allCoins[0].amount + " " + allCoins[0].denom);

                // console.log("coins::", allCoins);
            });
    
        }
    }

    useEffect (()=>{

        fetchBalance();

    }, [connectedWallet]);


    return  <span>
        <div style={{backgroundColor:"#789"}}>
           <span style={{color:"white",marginLeft:"10px", float:"left"}}>{connectedWallet?.walletAddress}</span>
           { connectedWallet ? 
           <span style={{color:"white", float:"left", marginLeft:"10px"}}>Balance : {balance}</span>
           : <></>}
        </div>
    </span>
}

