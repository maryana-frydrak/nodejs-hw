import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/userz';

export const updateUserAvatar = async (req, res) => {
  const avatarFile = req.file;

  if (!avatarFile) {
    throw createHttpError(400, 'No file');
  }

  const user = req.user;

  const result = saveFileToCloudinary(avatarFile.buffer, user._id);

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { avatar: result.secure_url },
    { returnDocument: 'after' },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({ url: updatedUser.avatar });
};
