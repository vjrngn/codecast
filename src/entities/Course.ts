import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('courses')
export class Course {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'listed_price' })
  listedPrice: number;

  @Column({ name: 'published_at', type: 'timestamp' })
  publishedAt: Date;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
