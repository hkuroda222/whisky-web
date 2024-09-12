export type NoteType = {
  aging?: number | null;
  alc?: number | null;
  bottled?: number | null;
  bottler?: string;
  caskNum?: number | null;
  comment?: string;
  date: number;
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
  // todo: 型付け
  updatedAt?: any;
  vintage?: number | null;
};

// 登録・編集画面のフォームの初期値の型
export type InitialInputType = {
  aging: string;
  alc: string;
  bottled: string;
  bottler: string;
  brand?: string;
  caskNum: string;
  comment: string;
  date: Date;
  distilleryName: string;
  finish: string;
  imageFiles?: Array<File>;
  images: Array<string>;
  nose: string;
  rating: number;
  region: string;
  taste: string;
  type: string;
  vintage: string;
};
