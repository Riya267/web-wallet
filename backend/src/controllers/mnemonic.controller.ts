import httpStatus from 'http-status';
import logger from '../config/logger';
import ApiError from '../util/ApiError';
import { type NextFunction, type Request, type Response } from 'express';
import { fetchmnemonic } from '../util/generateMnemonic';

const GenerateMnemonic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('[Controllers: GenerateMnemonic] - Controller initiated');

  try {
    logger.debug('[Controllers: GenerateMnemonic] - Request details:', {
      method: req.method,
      path: req.path,
    });

    const mnemonic = fetchmnemonic();
    
    logger.info('[Controllers: GenerateMnemonic] - Mnemonic generated successfully');

    res.status(httpStatus.OK).json({ mnemonic });
  } catch (error) {
    logger.error(`[Controllers: GenerateMnemonic] - Error occurred: ${error?.message}`);

    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error?.message));
  }
};

export default GenerateMnemonic;
