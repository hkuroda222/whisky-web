export type NoteType = {
  aging?: number | null;
  alc?: number | null;
  bottled?: number | null;
  bottler?: string;
  caskNum?: number | null;
  comment?: string;
  // todo: 型付け
  date: any;
  distillery_name?: string;
  distilleryName?: string;
  docId?: string;
  finish?: string;
  images: Array<string>;
  nose?: string;
  rating?: number;
  region?: string;
  taste?: string;
  type?: string;
  uid: string;
  vintage?: number | null;
};
