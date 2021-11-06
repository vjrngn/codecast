import { Result } from "../../result";

export interface UploadedFile {
  url: string;
  name: string;
  mimetype?: string;
}

export interface UploadDTO {
  name: string;
  mimetype: string;
  blob: any;
}

export interface FileService {
  upload(data: UploadDTO): Promise<Result<UploadedFile | null>>;
}
