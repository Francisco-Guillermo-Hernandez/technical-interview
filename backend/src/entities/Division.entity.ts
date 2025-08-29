import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('divisions')
export class Division {
  @ObjectIdColumn()
    _id: ObjectId;
  
  get id(): string {
    return this._id.toHexString();
  }

  @Column({ unique: true })
  @ApiProperty({ description: 'Nombre de la primer division' })
  firstLevelName: string;

  @Column()
  @ApiProperty({ description: 'Type of the first division' })
  firstLevelDivision: string;

  @Column('jsonb')
  @ApiProperty({ description: 'Entries of the first division' })
  firstLevelEntries: {
    secondLevelName: string;
    secondLevelDivision: string;
    secondLevelEntries: {
      thirdLevelName: string;
      thirdLevelDivision: string;
    }[];
  }[];

  constructor(partial?: Partial<Division>) {
    Object.assign(this, partial);
  }
}
