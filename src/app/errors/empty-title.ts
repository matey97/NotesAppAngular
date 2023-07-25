export class EmptyTitleError extends Error {
  constructor() {
    super("Note title can not be empty");
  }
}
