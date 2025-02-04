import { BigNumber } from 'ethers'
import { task } from 'hardhat/config'

import { getEidForNetworkName } from '@layerzerolabs/devtools-evm-hardhat'

import { SendParam } from './type-definitions'

// send tokens from a contract on one network to another
task('lz:nativeoftadapter:send', 'test oft adapter send with live contract')
    .addParam('adapter', 'oft adapter contract address on network A')
    .addParam('to', 'receiver address on network B')
    .addParam('destination', 'name of the network B')
    .addParam('amount', 'amount to transfer in eth')
    .setAction(async (taskArgs, { ethers }) => {
        const eidB = getEidForNetworkName(taskArgs.destination)
        const adapter = taskArgs.adapter
        const to = taskArgs.to

        const oftContractFactory = await ethers.getContractFactory('DEGENOFT')
        const oft = oftContractFactory.attach(adapter)

        const amount = ethers.utils.parseUnits(taskArgs.amount, 18)
        const sendParam: SendParam = {
            dstEid: eidB,
            to: ethers.utils.hexZeroPad(taskArgs.to, 32),
            amountLD: amount,
            minAmountLD: amount,
            extraOptions: ethers.utils.arrayify('0x'),
            composeMsg: ethers.utils.arrayify('0x'), // Assuming no composed message
            oftCmd: ethers.utils.arrayify('0x'), // Assuming no OFT command is needed
        }

        const existingBalance = await oft.balanceOf(to)
        console.log({ existingBalance })

        let amountToAdd = BigNumber.from(0)
        if (amount.gt(existingBalance)) {
            amountToAdd = amount.sub(existingBalance)
        } else {
            amountToAdd = BigNumber.from(0)
        }

        // Get the quote for the send operation
        const feeQuote = await oft.quoteSend(sendParam, false)
        const nativeFee = feeQuote.nativeFee
        // Get the signer
        const [signer] = await ethers.getSigners()
        const signerAddress = await signer.getAddress()

        console.log({ eidB, adapter, to, amount, nativeFee })
        console.log(`sending ${taskArgs.amount} token(s) to network ${taskArgs.destination}`)

        // Send the transaction
        const r = await oft.send(sendParam, { nativeFee: nativeFee, lzTokenFee: 0 }, signerAddress, {
            value: nativeFee.add(amountToAdd),
        })
        console.log(`Send tx initiated. See: https://layerzeroscan.com/tx/${r.hash}`)
    })
