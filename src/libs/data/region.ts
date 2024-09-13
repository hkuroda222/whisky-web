export type RegionType = {
  id: number;
  regionName: string;
};

export type CountryType = {
  country: string;
  region: Array<RegionType>;
};

export const REGION: Array<CountryType> = [
  {
    country: "スコットランド",
    region: [
      { id: 1, regionName: "スペイサイド" },
      { id: 2, regionName: "北ハイランド" },
      { id: 3, regionName: "東ハイランド" },
      { id: 4, regionName: "西ハイランド" },
      { id: 5, regionName: "南ハイランド" },
      { id: 6, regionName: "ローランド" },
      { id: 7, regionName: "キャンベルタウン" },
      { id: 8, regionName: "アイラ" },
      { id: 9, regionName: "オークニー諸島" },
      { id: 10, regionName: "アラン島" },
      { id: 11, regionName: "ジュラ島" },
      { id: 12, regionName: "スカイ島" },
      { id: 13, regionName: "マル島" },
      { id: 14, regionName: "ルイス島" },
    ],
  },
  { country: "日本", region: [{ id: 15, regionName: "日本" }] },
  {
    country: "アイルランド",
    region: [{ id: 16, regionName: "アイルランド" }],
  },
  { country: "アメリカ", region: [{ id: 17, regionName: "アメリカ" }] },
  { country: "カナダ", region: [{ id: 18, regionName: "カナダ" }] },
  { country: "台湾", region: [{ id: 19, regionName: "台湾" }] },
  { country: "その他", region: [{ id: 20, regionName: "その他" }] },
];
