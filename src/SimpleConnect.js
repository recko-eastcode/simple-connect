import React, { useState } from 'react';
import swal from 'sweetalert';
import styles from './Connect.module.css';
const SimpleConnect = () => {
  //states for the UI
  const [connectBtnText, setConnectBtnText] = useState('Connect Wallet');
  const [accountAddress, setAccountAddress] = useState(null);
  const [disable, setDisable] = useState(false);

  const handleAccountsChanged = (newAccount) => {
    setAccountAddress(newAccount);
  };

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          handleAccountsChanged(result[0]);
          setConnectBtnText('Wallet Connected');
          setDisable(true);
        });
    } else {
      swal('MetaMask not Detected', 'Please install MetaMask', 'error');
    }
  };

  return (
    <div>
      <h1>Simple Connect </h1>
      <button
        className={styles.btnClass}
        disabled={disable}
        onClick={() => {
          connectWalletHandler();
          //   setDisable(true);
        }}
      >
        {connectBtnText}
      </button>
      <h3>
        Account address
        <br /> <span style={{ color: 'green' }}>{accountAddress}</span>
      </h3>
    </div>
  );
};

export default SimpleConnect;
