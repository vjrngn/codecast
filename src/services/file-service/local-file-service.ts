import Logger from "../../logging/logger";
import { Result } from "../../result";
import { FileService, UploadDTO, UploadedFile } from "./file-service";
import { DiskStorage } from "./storage/disk-storage";

interface FileServiceOptions {
  destination: string;
}

export default class LocalFileService implements FileService {
  private logger = Logger(LocalFileService.name);
  private readonly storage: DiskStorage;

  constructor(options: FileServiceOptions) {
    this.storage = new DiskStorage({ destination: options.destination });
  }

  async upload(data: UploadDTO): Promise<Result<UploadedFile | null>> {
    try {
      this.logger.debug('Attempting to upload file');
      const storedFileResult = await this.storage.handleFile(data.name, data.blob);

      if (storedFileResult.error) {
        this.logger.error('Error uploading file', storedFileResult.error);
        return new Result(null, storedFileResult.error);
      }

      const storedFile = storedFileResult.data!;
      const uploadedFile = {
        url: storedFile.path,
        name: data.name,
        mimetype: data.mimetype
      }

      return new Result(uploadedFile, null);
    } catch (e: any) {
      return new Result(null, {
        message: e.message,
      });
    }
  }
}
