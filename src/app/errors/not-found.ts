export class NoteNotFoundError extends Error {
  constructor(id: string) {
    super(`Note with id=${id} not found.`);
  }
}
