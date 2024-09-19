import NodeCache from 'node-cache';
import ICacheProvider from '../models/ICacheProvider';
import ICacheProviderDTO from '../dtos/ICacheProviderDTO';

class NodeCacheProvider implements ICacheProvider {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  public async save({ key, value }: ICacheProviderDTO): Promise<void> {
    this.cache.set(key, value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const value = this.cache.get<T>(key);

    if (!value) {
      return null;
    }

    return value;
  }

  public async invalidate(key: string): Promise<void> {
    this.cache.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = this.cache.keys().filter((key) => key.startsWith(prefix));

    keys.forEach((key) => {
      this.cache.del(key);
    });
  }
}

export default NodeCacheProvider;
