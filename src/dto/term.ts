import type { TERM_ENUM } from '@/configs/constants';
import type { ObjectId } from 'mongodb';

export interface TermDTO {
  _id: string | ObjectId;
  name: string;
  type: TERM_ENUM;
  ipa: string;
  meaning: string;
  example: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
