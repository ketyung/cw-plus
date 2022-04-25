import { FC} from "react";
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Button, Dropdown, Menu } from "antd";
import './css/ConnectWallet.css';

export const ConnectWallet : FC = () =>{

    const {status, availableConnectTypes,connect, disconnect} = useWallet();

    const connectTypeMenu = (
        <Menu style={{borderRadius:"12px",background:"#78d",padding:"10px"}}>
         {availableConnectTypes.map((connectType, index) => (
             <Menu.Item className="connect-menu-item" key={"connect"+index} 
             onClick={()=> connect(connectType)}>{connectType}</Menu.Item>
         ))}
        </Menu>
    );

    return <div style={{marginTop:"10px"}}>
        
        {(status === WalletStatus.WALLET_NOT_CONNECTED  || status=== WalletStatus.INITIALIZING) ? (
        <>
          {<Dropdown overlay={connectTypeMenu} trigger={['click']}>
          <Button className="customButton" shape="round" onClick={(e)=>{e.preventDefault();}}>Connect Wallet</Button>
          </Dropdown>}
        </>
      ) : <></>}
      {status === WalletStatus.WALLET_CONNECTED && (
        <Button className="customButton" onClick={() => disconnect()} shape="round">
          Disconnect
        </Button>
      )}
    </div>
}