import { ConnectedWallet } from "@terra-money/wallet-provider";
import { LCDClient, MsgExecuteContract, Fee, TxInfo } from "@terra-money/terra.js";


const sleep = (ms : number ) => new Promise((resolve) => setTimeout(resolve, ms));
  
const until = Date.now() + 1000 * 60 * 60;

const untilInterval = Date.now() + 1000 * 60;


const handleTxResult = async (
  result : any, lcd : LCDClient, completion? : (obj : TxInfo | Error) => void,
  setLoading? : (loading: boolean) => void) =>{

  let working : boolean = true; 

  while (working) {
    try {
      let t = await lcd.tx.txInfo(result.txhash);
   
      if ( completion ){

        completion(t);

        if ( setLoading && (t.txhash !== undefined && t.txhash.trim() !== ""))
        {
            setTimeout(()=>{
              setLoading(false);
            }, 1000);
            
            working = false; 
           // console.log("completed::", t);
        }
       
      }
     
    } 
    catch (e : any) {
        
      if (Date.now() < untilInterval) {
          await sleep(500);
      } 
      else if (Date.now() < until) {
          await sleep(1000 * 10);
      } 
      else {
        
        if ( setLoading)
        {
            setTimeout(()=>{
              setLoading(false);
            } , 1000);  
        }

        if ( completion )
          completion(
          new Error(
            `Transaction queued. To verify the status, please check the transaction hash: ${result.txhash}`
          ) );

      }
        
    }
  }
}

export const execute = async (
  contractAddress : string, 
  wallet : ConnectedWallet | undefined, 
  msg : any , completion? : (obj : TxInfo | Error) => void,
  setLoading? : (loading: boolean) => void,  
  fee = new Fee(200000, { uluna: 6000 })) : Promise<TxInfo|undefined>  =>{
    
    if (!wallet) {
      if ( completion )
        completion(new Error("Null wallet or not connected!"));
      return ;
    }

    if ( setLoading)  
      setLoading(true);


    const lcd = new LCDClient({
      URL: wallet.network.lcd,
      chainID: wallet.network.chainID,
    });

  
    try {

      const { result } = await wallet.post({
        fee,
        msgs: [
          new MsgExecuteContract(
            wallet.walletAddress,
            contractAddress,
            msg
          ),
        ],
      });
  
      await handleTxResult(result, lcd, completion, setLoading);
    }
    catch ( e : any ){

      if ( setLoading)
      {
          setTimeout(()=>{
            setLoading(false);
          } , 1000);  
      }


      if ( completion )
        completion( new Error( e.message ) );

    }
}

export const query = async (
  contractAddress : string, 
  wallet : ConnectedWallet | undefined, 
  msg : any ,
  completion? : (obj : any | Error) => void 
)=> {


  if ( !wallet ) {
      if ( completion )
          completion(new Error("Null wallet"));
      return; 
  } 

  const lcd = new LCDClient({
      URL: wallet.network.lcd,
      chainID: wallet.network.chainID,
      gasAdjustment: 1.2,
  });


  let p = lcd.wasm.contractQuery(contractAddress, msg );

  p.then(o=>{

    if ( completion )
        completion(o);
  })
  .catch (e=>{

      if (completion )
          completion(new Error(e.message));
  })
}

