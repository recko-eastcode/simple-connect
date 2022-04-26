import React, { useState } from 'react'
import swal from 'sweetalert'
import styles from './Connect.module.css'
const SimpleConnect = () => {
	//states for the UI
	const [connectBtnText, setConnectBtnText] = useState('Connect Wallet')
	const [accountAddress, setAccountAddress] = useState(null)
	const [accountBalance, setAccountBalance] = useState('')

	let userAccounts
	const handleAccountsChanged = newAccount => {
		setAccountAddress(newAccount)
	}

	const connectWalletHandler = async () => {
		try {
			userAccounts = await window.ethereum.request({
				method: 'eth_requestAccounts'
			})

			if (userAccounts) {
				handleAccountsChanged(userAccounts[0])
				setConnectBtnText('Wallet Connected')
				getBalance()
				console.log(userAccounts)
			} else {
				swal('MetaMask not Detected', 'Please install MetaMask', 'error')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getBalance = async () => {
		try {
			let balance = await window.ethereum.request({
				method: 'eth_getBalance',
				//need to change from hard coded address
				params: ['0x3870782c0594f2436e2dcb6313877d2395e36afd', 'latest']
			})
			let convertedBalance = parseInt(balance)
			setAccountBalance(convertedBalance)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<h1>Simple Connect </h1>
			<button
				className={styles.btnClass}
				onClick={() => {
					connectWalletHandler()
				}}
			>
				{connectBtnText}
			</button>
			<h3>
				Account address
				<br /> <span style={{ color: 'green' }}>{accountAddress}</span>
			</h3>
			<h3>
				Account Balance
				<br /> <span style={{ color: 'green' }}>{accountBalance}</span>
			</h3>
		</div>
	)
}

export default SimpleConnect
