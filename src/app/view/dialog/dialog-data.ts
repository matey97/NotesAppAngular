export abstract class DialogData {
  protected constructor(
    public dialogTitle: string,
    public dialogCompleteButton: string,
    public noteTitle: string,
    public noteDescription: string
  ) {
  }
}

export class CreateNoteDialogData extends DialogData {
  constructor() {
    super(
      "Añadir nota",
      "Crear nota",
      "",
      ""
    );
  }
}

export class UpdateNoteDialogData extends DialogData {
  constructor(
    noteTitle: string, noteDescription: string
  ) {
    super(
      "Editar nota",
      "Actualizar nota",
      noteTitle,
      noteDescription
    );
  }
}
