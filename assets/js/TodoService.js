import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.0.2/dist/dexie.mjs';

let db;

export default class TodoService {

  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie('todoDB');

    db.version(1).stores({
      tasks: '++id,description'
    });

    db.on('populate', async () => {
      console.log('It runs only once!');
      await db.tasks.bulkPut([
        { description: 'DM120', done: true },
        { description: 'DM121', done: false },
        { description: 'DM122', done: false },
        { description: 'DM123', done: true }
      ]);
    });
  }

  getAll() {
    return db.tasks.toArray();
  }

  get(id) {
    return db.tasks.get(id);
  }

  save(task) {
    return db.tasks.put(task);
  }

  delete(id) {
    return db.tasks.delete(id);
  }
}
