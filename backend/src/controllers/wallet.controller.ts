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
    const { mnemonic, walletIndex = 0 } = req.body;

    if (!mnemonic) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Mnemonic is required');
    }

    if (typeof walletIndex !== 'number' || walletIndex < 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid wallet index');
    }

    logger.debug(`[Controllers: createWallet] - Generating wallet at index ${walletIndex} with mnemonic:`, mnemonic);

    const ethPath = `m/44'/60'/${walletIndex}'/0/0`;
    const hdNode = HDNode.fromMnemonic(mnemonic).derivePath(ethPath);

    const newWallet = {
      blockchain: 'Ethereum',
      publicKey: hdNode.address,
    };

    logger.info('[Controllers: createWallet] - Wallet generated successfully');

    res.status(httpStatus.OK).json(newWallet);
  } catch (error) {
    logger.error(`[Controllers: createWallet] - Error occurred: ${error?.message}`);
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error?.message));
  }
};

export default createWallet;
