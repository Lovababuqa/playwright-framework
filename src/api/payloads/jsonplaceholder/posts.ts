import { Utils } from '../../../utils/Utils';
import { PostPayload } from '../../models/jsonplaceholder/post.model';

export class PostPayloads {
  static getRandomResource(userId: number): PostPayload {
    return {
      id: Utils.getRandomNumber(2),
      title: `Title - ${Utils.generateRandomString(5)}`,
      body: `Body - ${Utils.generateRandomString(10)}`,
      userId,
    };
  }
}
