import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
  
    if (!request.file) {
      throw new Error('File not found');
    }

    if ((!request as any).user) {
      throw new Error('User not authenticated');
    }

    
    const user = await updateUserAvatar.execute({
      user_id: (request as any).user.id,
      avatarFilename: request.file.filename,
    });
  
    const { password, ...userWithoutPassword } = user;
    
    return response.status(200).json(classToClass(userWithoutPassword));
  }
}

export default UserAvatarController;
