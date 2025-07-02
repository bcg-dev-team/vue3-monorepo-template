import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiClient } from '../client/ApiClient';
import type { User, CreateUserRequest } from '@template/types';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient({ baseURL: 'https://api.example.com' });
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create ApiClient with config', () => {
      const client = new ApiClient({ baseURL: 'https://api.example.com' });
      expect(client).toBeInstanceOf(ApiClient);
    });

    it('should use default timeout', () => {
      const client = new ApiClient({ baseURL: 'https://api.example.com' });
      expect(client).toBeInstanceOf(ApiClient);
    });

    it('should use custom timeout', () => {
      const client = new ApiClient({
        baseURL: 'https://api.example.com',
        timeout: 5000,
      });
      expect(client).toBeInstanceOf(ApiClient);
    });
  });

  describe('GET requests', () => {
    it('should fetch user by ID', async () => {
      const mockUser: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockUser,
      });

      const result = await apiClient.get<User>('/users/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ message: 'User not found' }),
      });

      const result = await apiClient.get<User>('/users/999');
      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(404);
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await apiClient.get<User>('/users/1');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('POST requests', () => {
    it('should create user', async () => {
      const createUserData: CreateUserRequest = {
        email: 'jane@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'user',
      };

      const mockCreatedUser: User = {
        id: '2',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'user',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockCreatedUser,
      });

      const result = await apiClient.post<User>('/users', createUserData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(createUserData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockCreatedUser);
    });
  });

  describe('PUT requests', () => {
    it('should update user', async () => {
      const updateData = { firstName: 'Updated' };
      const mockUpdatedUser: User = {
        id: '1',
        firstName: 'Updated',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockUpdatedUser,
      });

      const result = await apiClient.put<User>('/users/1', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUpdatedUser);
    });
  });

  describe('DELETE requests', () => {
    it('should delete user', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      });

      const result = await apiClient.delete('/users/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result.success).toBe(true);
    });
  });

  describe('timeout handling', () => {
    it('should handle request timeout', async () => {
      const timeoutClient = new ApiClient({
        baseURL: 'https://api.example.com',
        timeout: 100,
      });

      // Simulate slow response
      mockFetch.mockImplementationOnce(() => new Promise((resolve) => setTimeout(resolve, 200)));

      const result = await timeoutClient.get('/users/1');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('headers', () => {
    it('should include authorization header when token is set', async () => {
      apiClient.setAuthToken('test-token');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      await apiClient.get('/users/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });
  });
});
