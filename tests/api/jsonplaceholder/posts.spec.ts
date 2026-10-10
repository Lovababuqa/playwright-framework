import {
  test,
  expect,
} from '../../../src/api/fixtures/jsonplaceholder/api.fixture';
import { PostPayloads } from '../../../src/api/payloads/jsonplaceholder/posts';
import { Utils } from '../../../src/utils/Utils';

test.describe('Posts API', () => {
  test('Get post by id', async ({ postsClient }) => {
    const postId = 1;

    const response = await postsClient.getPost(postId);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(postId);
    expect(body.userId).toBeDefined();
    expect(body.title).toBeTruthy();
    expect(body.body).toBeTruthy();
  });

  test('Create new resource', async ({ postsClient }) => {
    const payload = PostPayloads.getRandomResource(Utils.getRandomNumber(2));

    const response = await postsClient.createPost(payload);

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
  });

  test('Perform CRUD operations on posts resource', async ({ postsClient }) => {
    const userId = Utils.getRandomNumber(2);

    // JSONPlaceholder does not persist newly created resources.
    // Using an existing ID avoids update/delete failures with fake resources.
    const existingPostId = 1;

    // CREATE
    let payload = PostPayloads.getRandomResource(userId);
    payload.id = existingPostId;

    const createResponse = await postsClient.createPost(payload);

    expect(createResponse.status()).toBe(201);

    const createdResource = await createResponse.json();

    expect(createdResource.title).toBe(payload.title);
    expect(createdResource.body).toBe(payload.body);
    expect(createdResource.userId).toBe(payload.userId);

    // UPDATE
    payload = PostPayloads.getRandomResource(userId);
    payload.id = existingPostId;

    const updateResponse = await postsClient.updatePost(payload);

    expect(updateResponse.status()).toBe(200);

    const updatedResource = await updateResponse.json();

    expect(updatedResource.title).toBe(payload.title);
    expect(updatedResource.body).toBe(payload.body);
    expect(updatedResource.userId).toBe(payload.userId);

    // DELETE
    const deleteResponse = await postsClient.deletePost(existingPostId);

    expect(deleteResponse.status()).toBe(200);
  });
});
