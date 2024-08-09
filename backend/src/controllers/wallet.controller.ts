import httpStatus from 'http-status';
import logger from '../config/logger';
import ApiError from '../util/ApiError';
import { type NextFunction, type Request, type Response } from 'express';
import { HDNode } from '@ethersproject/hdnode';

const createWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('[Controllers: createWallet] - Controller initiated');

  try {
    const { mnemonic } = req.body;

    if (!mnemonic) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Mnemonic is required');
    }

    logger.debug('[Controllers: createWallet] - Generating wallets with mnemonic:', mnemonic);

    const newWallets: { blockchain: string; publicKey: string }[] = [];

    for (let i = 0; i < 4; i++) {
      const ethPath = `m/44'/60'/${i}'/0/0`;
      const hdNode = HDNode.fromMnemonic(mnemonic).derivePath(ethPath);

      newWallets.push({
        blockchain: 'Ethereum',
        publicKey: hdNode.address,
      });

    }

    logger.info('[Controllers: createWallet] - Wallets generated successfully');
    
    res.status(httpStatus.OK).json(newWallets);
  } catch (error) {
    logger.error(`[Controllers: createWallet] - Error occurred: ${error?.message}`);
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error?.message));
  }
};

export default createWallet;
