import { FC} from 'react';
import {MenuView} from './MenuView'
import { ConnectWallet } from './ConnectWallet';
import './css/MenuBar.css'

export const MenuBar: FC = () => {
   
    return (
        <div className="wallet-bar">
            <MenuView/>
            <ConnectWallet/>
        </div>
    );
};