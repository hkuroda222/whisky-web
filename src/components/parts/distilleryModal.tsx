'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/elements/button';
import { Modal } from '@/components/parts/modal';
import { SCOTCH } from '@/libs/data/distillery';

type DistilleryModalProps = {
  closeModal: () => void;
  onSubmit: (data: { distillery: string }) => void;
  setDistilleryName: (distilleryName: string) => void;
};

// memo: 現状は、蒸留所名・ブランドを文字列で入力させるため、使用していない
//       以下項目を検討する
//        ・1つの蒸留所で複数のブランドがある場合の選択方式
//        ・ブレンデットウイスキーの扱い
//        ・シークレット名義のボトルの扱い
export const DistilleryModal: React.FC<DistilleryModalProps> = (props) => {
  const { closeModal, onSubmit, setDistilleryName } = props;

  const { handleSubmit, register, setValue } = useForm<{
    distillery: string;
  }>({ defaultValues: { distillery: '' } });

  return (
    <Modal modalTiele="蒸溜所を選択してください" onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span className="block font-bold">スペイサイド</span>
          <div className="flex gap-x-3 mt-1">
            {SCOTCH.filter(
              (elm) => elm.region === 'スペイサイド'
              // todo: 型定義
            ).map((distilleryData: any, i) => {
              return (
                <div key={`distillery-${i}`} className="mt-2">
                  <input
                    id={distilleryData.id}
                    type="radio"
                    value={distilleryData.id}
                    {...register('distillery')}
                    onChange={(e) => {
                      setValue('distillery', e.target.value);
                      setDistilleryName(distilleryData.name);
                    }}
                    hidden
                    className="peer"
                  />
                  <label
                    htmlFor={distilleryData.id}
                    className="px-2 py-1 border-solid border-2 border-gray-400 rounded peer-checked:bg-gray-300"
                  >
                    {distilleryData.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" text="決定" />
        </div>
      </form>
    </Modal>
  );
};
