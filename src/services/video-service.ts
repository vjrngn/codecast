import { Repository } from "typeorm";
import { v4 } from 'uuid';
import { Video } from "../entities/Video";
import Logger from "../logging/logger";
import { Result } from "../result";
import { FileService } from "./file-service/file-service";

export interface VideoDTO {
  title: string;
  description?: string;
  publishAt: string;
  file: {
    name: string;
    mimetype: string;
    blob: any;
  }
}

export interface IVideoService {
  addVideo(data: VideoDTO): Promise<Result<Video | null>>;
  getVideos(): Promise<Result<Video[]>>;
}


export class VideoService implements IVideoService {
  private readonly logger = Logger(VideoService.name);

  private readonly videoRepository: Repository<Video>;
  private readonly fileService: FileService;

  constructor(
    videoRepository: Repository<Video>,
    fileService: FileService
  ) {
    this.videoRepository = videoRepository;
    this.fileService = fileService;
  }

  public async addVideo(data: VideoDTO): Promise<Result<Video | null>> {
    this.logger.debug('Adding video');

    try {
      const fileUploadResult = await this.fileService.upload({
        name: data.file.name,
        mimetype: data.file.mimetype,
        blob: data.file.blob
      });

      if (fileUploadResult.error) {
        this.logger.error('Error uploading file', fileUploadResult.error);
        return new Result(null, fileUploadResult.error);
      }

      const uploadedFile = fileUploadResult.data!;
      const video = await this.videoRepository.save({
        id: v4(),
        title: data.title,
        description: data.description,
        url: uploadedFile.url,
        publishAt: data.publishAt,
      });

      return new Result(video, null);
    } catch (e: any) {
      this.logger.error('Exception adding video', e);
      return new Result(null, {
        message: e.message
      });
    }
  }

  public async getVideos(): Promise<Result<Video[]>> {
    const results = await this.videoRepository.find();
    const videos = results.map(video => {
      return {
        ...video,
        url: encodeURI(video.url)
      }
    });
    return new Result(videos, null);
  }
}
