import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('videos')
export class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'published_at', type: 'timestamp' })
  publishedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
