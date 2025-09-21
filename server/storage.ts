// No persistent storage needed for this stateless document processing service
// All document processing is done on-demand and results are returned immediately

export interface IStorage {
  // Placeholder for future storage needs if required
  healthCheck(): Promise<boolean>;
}

export class MemStorage implements IStorage {
  async healthCheck(): Promise<boolean> {
    return true;
  }
}

export const storage = new MemStorage();
