import { CreateAssetParams, CreateTransferAssetParams, IChainDriver, UniversalTxn } from 'blockin';
import { recoverPersonalSignature } from 'eth-sig-util';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';


/**
 * Ethereum implementation of the IChainDriver interface. This implementation is based off the Moralis API
 * and ethers.js library.
 * 
 * For documentation regarding what each function does, see the IChainDriver interface.
 * 
 * Note that the Blockin library also has many convenient, chain-generic functions that implement 
 * this logic for creating / verifying challenges. Before using,ou will have to setChainDriver(new EthDriver(.....)) first.
 */
export default class EthDriver implements IChainDriver {
    chain: "eth" | "bsc" | "polygon" | "avalanche" | "fantom" | "cronos"

    constructor(chain?: any) {
        this.chain = chain;
    }

    /** Boilerplates - Not Implemented Yet */
    async makeAssetTxn(assetParams: CreateAssetParams) {
        throw 'Not implemented';
        return this.createUniversalTxn({}, ``)
    }

    async makeAssetTransferTxn(assetParams: CreateTransferAssetParams) {
        throw 'Not implemented';
        return this.createUniversalTxn({}, ``)
    }

    async sendTxn(signedTxnResult: any, txnId: string): Promise<any> {
        throw 'Not implemented';
        return;
    }

    async parseChallengeStringFromBytesToSign(txnBytes: Uint8Array) {
        const txnString = new TextDecoder().decode(txnBytes);
        const txnString2 = Buffer.from(txnString.substring(2), "hex").toString();

        return txnString2;
    }

    async lookupTransactionById(txnId: string) {
        throw 'Not implemented';
    }

    async getAssetDetails(assetId: string | Number): Promise<any> {
        throw 'Not implemented';
    }

    async getAllAssetsForAddress(address: string): Promise<any> {
        throw 'Not implemented';
    }

    async getLastBlockIndex(): Promise<string> {
        throw 'Not implemented';
    }

    async getTimestampForBlock(blockIndexStr: string): Promise<string> {
        throw 'Not implemented';
    }

    isValidAddress(address: string): boolean {
        return ethers.utils.isAddress(address);
    }

    /**Not implemented */
    getPublicKeyFromAddress(address: string): Uint8Array {
        throw 'Not implemented';
        return new Uint8Array(0);
    }

    async verifySignature(originalChallengeToUint8Array: Uint8Array, signedChallenge: Uint8Array, originalAddress: string): Promise<void> {
        const original = new TextDecoder().decode(originalChallengeToUint8Array);
        const signed = new TextDecoder().decode(signedChallenge);

        const recoveredAddr = recoverPersonalSignature({
            data: original,
            sig: signed,
        });

        if (recoveredAddr.toLowerCase() !== originalAddress.toLowerCase()) {
            throw `Signature Invalid: Expected ${originalAddress} but got ${recoveredAddr}`
        }
    }

    async verifyOwnershipOfAssets(address: string, resources: string[], assetMinimumBalancesRequiredMap?: any, defaultMinimum?: number) {
        throw 'Not implemented';
    }

    /**
     * Currently just a boilerplate
     */
    private createUniversalTxn(txn: any, message: string): UniversalTxn {
        return {
            txn,
            message,
            txnId: txn.txnId,
            nativeTxn: txn
        }
    }
}
