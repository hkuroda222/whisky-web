import { Timestamp } from 'firebase/firestore';

export type NoteType = {
  aging: number;
  bottled: number;
  bottler: number;
  comment: string;
  date: Timestamp;
  distillery_name: string;
  finish: string;
  image_path: string;
  nose: string;
  tating: number;
  rating: number;
  region: string;
  taste: string;
  uid: string;
  vintage: number;
};
