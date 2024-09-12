export type NoteType = {
  aging?: number | null;
  alc?: number | null;
  bottled?: number | null;
  bottler?: string;
  caskNum?: number | null;
  comment?: string;
  createdAt?: number;
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
  updatedAt?: any;
  vintage?: number | null;
};

// 登録・編集画面のフォームの初期値の型
export type InitialInputType = {
  aging: string;
  alc: string;
  bottled: string;
  bottler: string;
  caskNum: string;
  comment: string;
  createdAt?: number;
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
