'use client';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Input, InputItem } from '@/components/elements/input';
import { Button, ButtonWithFileInput } from '@/components/elements/button';
import { DatePickerInput } from '@/components/elements/datePicker';
import { Rating } from '@/components/parts/rating';
import { Loading } from '@/components/parts/loading';
import { addNote, uploadImage } from '@/libs/firebase/api/note';
import { useAuth } from '@/libs/hooks/useAuth';
import { useModal } from '@/libs/hooks/useModal';
import { DistilleryModal } from '@/components/parts/distilleryModal';

type InitialInputType = {
  aging: string;
  alc: string;
  bottled: string;
  bottler: string;
  brand: string;
  comment: string;
  date: Date;
  distillery: number | null;
  distilleryName: string;
  finish: string;
  imageFiles: Array<File>;
  nose: string;
  rating: number;
  taste: string;
  type: string;
  vintage: string;
};

const Register = () => {
  const signInUser = useAuth();
  const { isOpen, openModal, closeModal } = useModal();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [inputDistilleryName, setInputDistilleryName] = useState<string>('');
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<InitialInputType>({
    defaultValues: {
      aging: '',
      alc: '',
      bottled: '',
      bottler: '',
      brand: '',
      comment: '',
      date: new Date(),
      distillery: null,
      distilleryName: '',
      finish: '',
      imageFiles: [],
      nose: '',
      rating: 0,
      taste: '',
      type: '',
      vintage: '',
    },
  });

  const onSubmit: SubmitHandler<InitialInputType> = async (data) => {
    const validateData = {
      aging: data.aging ? Number(data.aging) : null,
      alc: data.alc ? Number(data.alc) : null,
      bottled: data.bottled ? Number(data.bottled) : null,
      bottler: data.bottler,
      comment: data.comment,
      createdAt: new Date(),
      date: data.date,
      distillery: data.distillery,
      finish: data.finish,
      nose: data.nose,
      rating: data.rating,
      taste: data.taste,
      type: data.type,
      uid: signInUser.uid,
      vintage: data.vintage ? Number(data.vintage) : null,
    };
    if (data.imageFiles.length > 0) {
      const imageUrl = await uploadImage(data.imageFiles[0]);
      await addNote({ ...validateData, images: [imageUrl] });
    } else {
      await addNote({ ...validateData, images: [] });
    }
  };

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('imageFiles', [selectedFile]);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      {isSubmitting && <Loading />}
      <div className="flex justify-center min-h-[calc(100vh_-_88px)] pt-8 pb-20 px-3">
        <div className="p-8 w-full lg:w-3/5 bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-bold text-xl">ボトルの情報</h2>
            <div className="mt-8">
              <span className="block font-bold">・写真を追加する</span>
              <div>
                <div className="mt-4 max-w-48">
                  <ButtonWithFileInput
                    onChange={handleImageSelect}
                    text="画像を選択"
                  />
                </div>
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="ボトル画像"
                    width={192}
                    height={192}
                    className="block mt-4 w-48 h-48 object-contain border-solid border-2 border-gray-400"
                  />
                ) : (
                  <div className="mt-4 w-48 h-48 border-solid border-2 border-gray-400 rounded" />
                )}
              </div>
              <div className="mt-4">
                <Input
                  type="text"
                  value={inputDistilleryName}
                  onChange={(e) => {
                    setInputDistilleryName(e.target.value);
                  }}
                  label="・蒸溜所名"
                  placeholder="蒸溜所名を選択してください"
                  onClick={openModal}
                  readOnly
                  isBold
                />
              </div>
              <div className="mt-4">
                <InputItem
                  type="input"
                  name="brand"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 30,
                      message: '文字数は30文字以内です。',
                    },
                  }}
                  label="・ブランド"
                  placeholder="ブランドを入力してください"
                  isBold
                />
              </div>
              <div className="mt-4">
                <InputItem
                  type="input"
                  name="bottler"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 30,
                      message: '文字数は30文字以内です。',
                    },
                  }}
                  label="・ボトラー"
                  placeholder="ボトラー名を入力してください"
                  isBold
                />
              </div>
              <div className="mt-4 max-w-48">
                <InputItem
                  type="input"
                  name="vintage"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 4,
                      message: '文字数は4文字以内です。',
                    },
                  }}
                  label="・蒸溜年"
                  placeholder=""
                  inputMode="numeric"
                  isBold
                  unit="年"
                />
              </div>
              <div className="mt-4 max-w-48">
                <InputItem
                  type="input"
                  name="bottled"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 4,
                      message: '文字数は4文字以内です。',
                    },
                  }}
                  label="・瓶詰め"
                  placeholder=""
                  inputMode="numeric"
                  isBold
                  unit="年"
                />
              </div>
              <div className="mt-4 max-w-48">
                <InputItem
                  type="input"
                  name="aging"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 2,
                      message: '文字数は2文字以内です。',
                    },
                  }}
                  label="・熟成年数"
                  placeholder=""
                  inputMode="numeric"
                  isBold
                  unit="年"
                />
              </div>
              <div className="mt-4 max-w-48">
                <InputItem
                  type="input"
                  name="alc"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 5,
                      message: '文字数は5文字以内です。',
                    },
                  }}
                  label="・アルコール度数"
                  placeholder=""
                  inputMode="numeric"
                  isBold
                  unit="%"
                />
              </div>
              <div className="mt-4">
                <InputItem
                  type="input"
                  name="type"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 30,
                      message: '文字数は30文字以内です。',
                    },
                  }}
                  label="・樽の種類"
                  placeholder="樽の種類を入力してください"
                  isBold
                />
              </div>
            </div>
            <h2 className="mt-8 pt-8 border-solid border-t-2 border-gray-300 font-bold text-xl">
              テイスティングノート
            </h2>
            <div>
              <span className="block mt-4 font-bold">・評価</span>
              <Rating
                rating={getValues('rating')}
                onClick={(value) => {
                  setValue('rating', value);
                }}
                size={28}
                withLabel
              />
            </div>
            <div className="mt-4">
              <InputItem
                type="textarea"
                label="・香り"
                name="nose"
                control={control}
                rules={{
                  maxLength: {
                    value: 500,
                    message: '文字数は500文字以内です。',
                  },
                }}
                placeholder="香りを入力してください"
                isBold
              />
            </div>
            <div className="mt-4">
              <InputItem
                type="textarea"
                label="・味"
                name="taste"
                control={control}
                rules={{
                  maxLength: {
                    value: 500,
                    message: '文字数は500文字以内です。',
                  },
                }}
                placeholder="味を入力してください"
                isBold
              />
            </div>
            <div className="mt-4">
              <InputItem
                type="textarea"
                label="・余韻"
                name="finish"
                control={control}
                rules={{
                  maxLength: {
                    value: 500,
                    message: '文字数は500文字以内です。',
                  },
                }}
                placeholder="余韻を入力してください"
                isBold
              />
            </div>
            <div className="mt-4">
              <InputItem
                type="textarea"
                label="・総評"
                name="comment"
                control={control}
                rules={{
                  maxLength: {
                    value: 500,
                    message: '文字数は500文字以内です。',
                  },
                }}
                placeholder="総評を入力してください"
                isBold
              />
            </div>
            <div className="mt-4">
              <span className="block font-bold">・飲んだ日付</span>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <DatePickerInput onChange={onChange} selected={value} />
                  )}
                />
              </div>
            </div>
            <div className="mt-4">
              <Button type="submit" text="登録する" />
            </div>
          </form>
          {isOpen && (
            <DistilleryModal
              closeModal={closeModal}
              onSubmit={(data: { distillery: string }) => {
                setValue('distillery', Number(data.distillery));
                closeModal();
              }}
              setDistilleryName={(distilleryName: string) => {
                setInputDistilleryName(distilleryName);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
