import { Document } from "mongoose";

export interface ICrudService<T extends Document> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>, ownerId?: string): Promise<T>;
  delete(id: string, ownerId?: string): Promise<void>;
}
