import { BaseApiClient } from '../../base.api';

export class PostsClient extends BaseApiClient {
  async getPost(postId: number) {
    return await this.get(`/posts/${postId}`);
  }

  async createPost(payload: object) {
    return await this.post('/posts', payload);
  }

  async updatePost(payload: any) {
    return await this.put(`/posts/${payload.id}`, payload);
  }

  async deletePost(postId: number) {
    return await this.delete(`/posts/${postId}`);
  }
}
