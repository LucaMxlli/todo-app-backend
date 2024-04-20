import multer from 'multer';
import { ProfileRepo } from '@/repository/profile.repository';
import { handleUpload, handleDelete } from './helper';
import { response } from './response.lib';
import { StatusCodes } from 'http-status-codes';
import { CoinRepo } from '@/repository/coin.repository';

const profileRepo = new ProfileRepo();
const coinRepo = new CoinRepo();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single('sample_file');

function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Helper function to extract the public ID from a Cloudinary URL
function extractPublicId(url: string) {
  const match = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
  return match ? match[1] : null;
}

async function processUpload(req: any, entity: any, entityType: any) {
  if (entity[entityType]) {
    const oldPublicId = extractPublicId(entity[entityType]);
    if (oldPublicId) {
      await handleDelete(oldPublicId);
    }
  }

  const b64 = Buffer.from(req.file.buffer).toString('base64');
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;
  return await handleUpload(dataURI);
}

const uploadHandler = async (req: any, res: any) => {
  console.log(req.url.includes('/banner') ? 'Banner' : 'Symbol');
  try {
    await runMiddleware(req, res, myUploadMiddleware);

    if (!req.file) throw new Error('No file uploaded');

    // Hier wird geprüft, ob der Pfad bestimmte Strings enthält
    if (req.url === '/picture') {
      const userId = req.user.id;
      const currentUser = await profileRepo.getUser(userId);

      const cldRes = await processUpload(req, currentUser, 'profilePicture');
      const updatedProfile = await profileRepo.updatePicture(userId, cldRes.url);

      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Profile picture updated successfully', updatedProfile));
    } else if (req.url.includes('/banner')) {
      // Annahme: coinId wird korrekt über URL-Parameter oder auf eine andere Weise ermittelt
      const coinId = req.params.id;
      const currentCoin = await coinRepo.getCoinById(Number(coinId));

      if (currentCoin.userId !== req.user.id) {
        throw new Error('Unauthorized');
      }

      if (currentCoin.currentState.name !== 'edit') {
        throw new Error('Coin is not in edit mode');
      }

      const cldRes = await processUpload(req, currentCoin, 'banner');
      const updatedCoin = await coinRepo.updateCoinBanner(Number(req.user.id), Number(coinId), cldRes.url);

      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Banner updated successfully', updatedCoin));
    } else if (req.url.includes('/symbol')) {
      const coinId = req.params.id;
      const currentCoin = await coinRepo.getCoinById(Number(coinId));

      if (currentCoin.userId !== req.user.id) {
        throw new Error('Unauthorized');
      }

      if (currentCoin.currentState.name !== 'edit') {
        throw new Error('Coin is not in edit mode');
      }

      const cldRes = await processUpload(req, currentCoin, 'symbol');
      const updatedCoin = await coinRepo.updateCoinSymbol(Number(req.user.id), Number(coinId), cldRes.url);

      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Symbol updated successfully', updatedCoin));
    } else {
      // Wenn kein gültiger Pfad gefunden wurde
      throw new Error('Invalid path');
    }
  } catch (error: any) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(response(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
  }
};

export default uploadHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};
