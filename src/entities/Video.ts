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

  @Column({ name: 'publish_at' })
  publishAt?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
}
