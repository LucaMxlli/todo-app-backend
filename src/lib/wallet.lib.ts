import { Connection, PublicKey } from '@solana/web3.js';

export const lamportsToSol = (lamports: number) => Number(lamports) / 1000000000;

const solanaConnection = new Connection(process.env.HELIUS_RPC_URL + '?api-key=' + process.env.HELIUS_API_KEY);

const MY_WALLET_ADDRESS = process.env.MY_WALLET_ADDRESS || '';

export const getBalance = async (wallet_address: string) => {
  try {
    const publicKey = new PublicKey(wallet_address);
    const balance = await solanaConnection.getBalance(publicKey);

    if (!balance) {
      throw new Error('Balance not found');
    }

    return lamportsToSol(balance);
  } catch (error) {
    throw error;
  }
};

export const checkWalletAddress = async (wallet_address: string) => {
  try {
    const publicKey = new PublicKey(wallet_address);
    const balance = await solanaConnection.getBalance(publicKey);

    if (isNaN(balance)) {
      throw new Error('Balance not found');
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const getTransactions = async () => {
  const transactions = await solanaConnection.getConfirmedSignaturesForAddress2(new PublicKey(MY_WALLET_ADDRESS), {
    limit: 10,
  });

  return transactions;
};

export const checkTransactionStatus = async (signature: string) => {
  try {
    const transaction = await solanaConnection.getSignatureStatus(signature, {
      searchTransactionHistory: true,
    });
    if (transaction.value?.confirmationStatus === 'finalized') {
      return true;
    }
  } catch (error: any) {
    if (error.toString().includes('Invalid param')) {
      return 'invalid';
    }
    return false;
  }
  return false;
};

export const getTransactionDetails = async (signature: string) => {
  const transactionDetails = await fetch(
    process.env.HELIUS_API_URL + '/v0/transactions?api-key=' + process.env.HELIUS_API_KEY,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactions: [signature],
      }),
    }
  );
  if (!transactionDetails) {
    return;
  }

  return await transactionDetails.json();
};
