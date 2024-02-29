
import { openDB } from 'idb';

const dbPromise = openDB('calorie-manager', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('items')) {
      db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
    }
  },
});

const idb = {
  async getItems() {
    const db = await dbPromise;
    return db.getAll('items');
  },

  async addItem(item) {
    const db = await dbPromise;
    return db.add('items', item);
  },

  async deleteItem(id) {
    const db = await dbPromise;
    return db.delete('items', id);
  },
};

export default idb;
