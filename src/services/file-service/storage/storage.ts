import { Result } from "../../../result";

export interface StoredFile {
  path: string;
  size: number;
}

export interface Storage {
  /**
   * Stores a file at the implmented backend.
   *
   * @param {string} name Name of the file
   * @param {Buffer} data Binary data of the file
   * @returns {(Promise<Result<StoredFile | null>>)}
   * @memberof Storage
   */
  handleFile(name: string, data: Buffer): Promise<Result<StoredFile | null>>;

  /**
   * Deletes a file at the given path.
   *
   * @param {string} Path of the stored file
   * @returns {(Promise<Result<StoredFile | null>>)} Delted file or null if file not found
   * @memberof Storage
   */
  removeFile(path: string): Promise<Result<StoredFile | null>>;
}
