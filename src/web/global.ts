class ProcessedFilePaths {
  private _filePaths = new Set<string>();

  get filePaths() {
    return Array.from(this._filePaths);
  }
  add(v: string) {
    this._filePaths.add(v);
  }
  remove(v: string) {
    this._filePaths.delete(v);
  }
}

export const filePaths = new ProcessedFilePaths();
