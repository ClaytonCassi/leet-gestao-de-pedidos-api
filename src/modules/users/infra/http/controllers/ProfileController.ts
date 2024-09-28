import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';


import UpdateProfileService from '../../../../../modules/users/services/UpdateProfileService';
import ShowProfileService from '../../../../../modules/users/services/ShowProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {

    if (!(request as any) || (!request as any).user.id) {
      return response.status(400).json({ message: 'User ID not provided' });
    }
    const { id: user_id } = (request as any).user;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.status(200).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {

    if ((!request as any).user || (!request as any).user.id) {
      return response.status(400).json({ message: 'User ID not provided' });
    }
    const { email, name, oldPassword, password } = request.body;
    const { id: user_id } = (request as any).user;
  
    const updateProfile = container.resolve(UpdateProfileService);
  
    const updatedUser = await updateProfile.execute({
      user_id,
      email,
      name,
      oldPassword,
      password,
    });
  
    if (updatedUser) {
      const { password: _, ...userWithoutPassword } = updatedUser;
      return response.status(200).json(classToClass(userWithoutPassword));
    }
  
    return response.status(404).json({ message: 'User not found' });
  }
}

export default ProfileController;
