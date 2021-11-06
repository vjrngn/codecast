import fs, { createReadStream, createWriteStream } from 'fs';
import mkdirp from 'mkdirp';
import { join } from 'path';
import Logger from '../../logging/logger';
import { Result } from "../../result";
import { Storage, StoredFile } from "./storage";

export interface DiskStorageOptions {
  destination: string;
}

export class DiskStorage implements Storage {
  private readonly logger = Logger(DiskStorage.name);
  private readonly options: DiskStorageOptions;

  constructor(options: DiskStorageOptions) {
    this.options = options;

    mkdirp.sync(options.destination);
  }

  handleFile(name: string, data: any): Promise<Result<StoredFile | null>> {
    return new Promise((resolve, reject) => {
      this.logger.debug('Attempting to store file on disk', {
        destination: this.options.destination
      });

      const { destination } = this.options;
      // const inStream = createReadStream(data);
      const finalPath = join(destination, name);
      const outStream = createWriteStream(finalPath);

      fs.writeFile(finalPath, data, (error) => {
        if (error) {
          this.logger.error('Failed writing file to disk', error);
          return reject(new Result(null, {
            message: 'Failed storing file to disk',
            error
          }))
        }
        
        this.logger.debug('Wrote file to disk', {
          destination: this.options.destination
        });

        const storedFile = {
          path: finalPath,
          size: outStream.bytesWritten,
        };

        resolve(new Result(storedFile, null));
      });
    });
  }

  removeFile(path: string): Promise<Result<StoredFile | null>> {
    throw new Error("Method not implemented.");
  }
}