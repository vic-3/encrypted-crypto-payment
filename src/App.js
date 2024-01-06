import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import QRCODE from "./images/qrcode.png"
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

function App() {
  let {id, amount, slug} = useParams()
  const [username, setUsername] = useState("")
  const [currency, setCurrency] = useState(slug)
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState("")
  const [transactions, setTransactions ] = useState([])


  const copyFn = () => {
    
      // Get the text field
      var copyText = document.getElementById("address-field");
    
      // Select the text field
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices
    
       // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value);
    
      // Alert the copied text
      Swal.fire("Copied","Wallet address copied", "success");
    
  }

  const confirmPayment = () => {
    // const data = {
    //   id,
    //   amount,
    //   currency
    // }
console.log("working")
const form = document.getElementById('image-form');
const imageInput = document.getElementById('file');
setLoading(true)


    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

    try {
        const response = axios.post(`${API_URL}/confirm-payment.php`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important!
            },
        })
        .then((res)=>{
          Swal.fire('Under Review','We are confirming your deposit','warning')
          .then(()=>{
            handleBack()
          })
          console.log(res.data)
          setLoading(false)
        })

        
    } catch (error) {
        console.error('Error uploading image:', error);
    }



    // axios.post(`${API_URL}/confirm-payment.php`, {data})
    // .then((res)=>{
    //   Swal.fire('Under Review','We are confirming your deposit','warning')
      
    // })
  }


  useEffect(()=>{
      axios.get(`${API_URL}/get-user.php?id=${id}`)
      .then((res)=>{
          const user = res.data
          setUsername(user.username)
          // email = user.email
          // photo = user.image
          //console.log(res.data)
      })

      if(currency == "BTC"){
        setAddress("bc1qy0qyf6nja7v6rtul6eqwrsf8e9ckjnjjqfsept")
      }
      else if(currency == "ETH"){
        setAddress("0x826598419622c1187A43791743234700e7d93DDF")
      }
      else if(currency == "BNB"){
        setAddress("bnb1ggx0ukukpunld6405lfnmp2lmzn58nauyfrc9s")
      }

      else if(currency == "USDT"){
        setAddress("TX4HZymX5ydk4naLRSASRZ89bLAoWJ4uiB")
      }

      // else if(currency == "BNB"){
      //   setAddress("bnb1s6n4lnx3jm4n365q9q58ema44leqp8nt3r5w95")
      // }
      // else if(currency == "USDT-ERC20"){
      //   setAddress("0x9c4A1cEAC3405B3f0cDBC844a8689F179527d517")
      // }
      // else if(currency == "USDT-TRC20"){
      //   setAddress("TJx1iYi88ARc8zAXoWqVpGvnNJjBDGTwDS")
      // }
      // else if(currency == "polygon"){
      //   setAddress("0x7f526445c3AB11B3D8d2dFd98a6c0dc4e9245b8e")
      // }
      // else if(currency == "Shib"){
      //   setAddress("0x9c4A1cEAC3405B3f0cDBC844a8689F179527d517")
      // }
      // else if(currency == "arb-eth"){
      //   setAddress("0x7f526445c3AB11B3D8d2dFd98a6c0dc4e9245b8e")
      // }
      // else if(currency == "sol"){
      //   setAddress("31SD4bHL3XPU7S2DzUSAu9qiVVDfisB3ha9ZxHDw6WBJ")
      // }
      // else if(currency == "LTC"){
      //   setAddress("ltc1qq6tneq59vcjcl4ytzpxm8ppr7nz2vrus44v6g0")
      // }
      // else if(currency == "xrp"){
      //   setAddress("rKAqeDAFdozwE1iA2V5f79a5VwSKEfuBFB")
      // }
      // else if(currency == "DOGE"){
      //   setAddress("DGVpQFwkes1jMs4TPR59sq96ZdDkZSjb3G")
      // }
      // else if(currency == "ADA"){
      //   setAddress("addr1q864tj9hw2fhtmtky73k4lsayvxm2l5sepyrackx6d7xgkr60tsmph6qhs8v0wal4zqas68r6k7gajhjdqsktyjje50qtw0nqm")
      // }
      // else if(currency == "BCH"){
      //   setAddress("qqxfddtxqmmy64r4mulah6grncnd050ynyea7tkvma")
      // }
      // else if(currency == "Busd"){
      //   setAddress("0x9c4A1cEAC3405B3f0cDBC844a8689F179527d517")
      // }
      // else if(currency == "bnb-bsc"){
      //   setAddress("0x47a51C53D35c2CF43f0D53f13a70017273F8cE4A")
      // }
      // else if(currency == "XRP"){
      //   setAddress("rntVbZZfmFNSPJcAmhbkMb79SnNuNSPwuF")
      // }
      
      else {
        setAddress("Invalid Currency")
      }



      axios.get(`${API_URL}/get-transactions.php?id=${id}`)
      .then((res)=>{
          //console.log(res.data)
          setTransactions(res.data)
      })
      
  },[])

  const handleBack = () => {
    window.history.back()
  }



  return (
    <>
      <div className="welcome-bar">
        <div className="flex-within-welcome">
        <button onClick={handleBack}  className="user-icon"><i className='fa fa-arrow-left'></i></button> 
          <p>Welcome, {username}</p>
          
          

        </div>
      </div>

      <div className= "after-container">
        <div className="left-side">
          <div className='header-flex'>

          <h1>INVOICE PAYMENT DETAILS</h1>

         {!loading && ( <button className='confirm-pay-btn' id='confirm-btn' onClick={()=>{document.getElementById("file").click()}}>confirm payment</button>)
         || 
         <button className='confirm-pay-btn' id='confirm-btn'>Confirming ...</button>
         }
          <form method="post" encType='multipart/form-data' style={{"display":"inline"}} id='image-form'>
          <input type='file' name="file" id='file' accept="image/*" onChange={confirmPayment} hidden/>
          </form>
          

         
          
          </div>

          <p>Pay to:</p>
          <input className="wallet-ad-container px-2" value={`${address}`} id="address-field"  readOnly/>
          <button className="copy-button" onClick={copyFn}><FontAwesomeIcon icon={ faCopy } /> Copy</button>
      
        <hr className='hr'></hr>
        <p>
          NETWORK: 
          {(currency=="BTC") && "Bitcoin"}
          {(currency=="ETH") && "ERC-20"}
          {(currency=="USDT") && "TRC-20"}
          {(currency=="BNB") && "BEP-20"}

          </p>
         
        <hr className='hr'></hr> 


        <p>QR CODE:</p>
        <img src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${address}`} className='qrcode'></img>
        <p className='p'>If the QR code doesn't work with your wallet, simply copy and paste the <br />  address displayed above.</p>

        <hr className='hr'></hr>

        <p>Invoice Amount:</p>
        <p className='p-bold'>${amount} ON {currency}</p>

        <hr className='hr'></hr>

        <p>Amount Due:</p>
        <p className='p-bold'>${amount} ON {currency}</p>

        <hr className='hr'></hr>

       

      
        </div>

        <div className="right-side">

          <h1>PAYMENT(S) HISTORY</h1>

          <p className='p'>Real-time historical records of your incoming invoice payments</p>
          <div className='overflow-cont'>
          <div className='topic-cont'>
            <div className='topics'>TRANSACTION ID</div>
            
            <div className='topics'>AMOUNT</div>
            <div className='topics'>STATUS</div>
            <div className='topics'>DATE</div>
          </div>

          
          {
            transactions.length > 0 && (

              transactions.map((trx) => {
                return(
                  <div key={trx.trx_id} className='transact-cont'>
                    <div className='transact'>#{trx.trx_id}</div>
                    
                    <div className='transact'>${trx.amount}</div>
                    <div className='transact'><div className='status'>{trx.status}</div></div>
                    <div className='transact'>{trx.date} </div>

                  </div>
                )
              })
             
            )
          }

          {/* <div className='transact-cont'>
            <div className='transact'>#352</div>
            
            <div className='transact'>$2509.6774193548</div>
            <div className='transact'><div className='status'>PENDING</div></div>
            <div className='transact'>Thursday 10th of August 2023 </div>

          </div>
          <div className='transact-cont'>
            <div className='transact'>#890</div>
           
            <div className='transact'>$2509.6774193548</div>
            <div className='transact'><div className='status'>APPROVED</div></div>
            <div className='transact'>Thursday 10th of August 2023 </div>

          </div> */}

          </div>

        </div>




      </div>



      <div className='modal fade' id='my-modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              Confirm Payment
            </div>
            <div className='modal-body'>

            </div>

          </div>
        </div>
      </div>
      </>
  );
}

export default App;
