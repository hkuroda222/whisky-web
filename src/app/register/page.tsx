'use client';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import { Input, TextArea } from '@/components/elements/input';
import { Button, ButtonWithFileInput } from '@/components/elements/button';
import { SelectDate } from '@/components/elements/datePicker';
import { Modal } from '@/components/parts/modal';
import { Rating } from '@/components/parts/rating';
import { addNote, uploadImage } from '@/libs/firebase/api/note';
import { useAuth } from '@/libs/hooks/useAuth';
import { useModal } from '@/libs/hooks/useModal';
import { SCOTCH } from '@/libs/data/distillery';

type InitialStateType = {
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
  images: Array<File>;
  nose: string;
  rating: number;
  taste: string;
  type: string;
  vintage: string;
};

const Register = () => {
  const signInUser = useAuth();
  const { isOpen, openModal, closeModal } = useModal();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [noteData, setNoteData] = useState<InitialStateType>({
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
    images: [],
    nose: '',
    rating: 0,
    taste: '',
    type: '',
    vintage: '',
  });

  //todo: 型付け
  const onChangeValue =
    (key: any) =>
    (
      e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
    ) => {
      setNoteData({ ...noteData, [key]: e.target.value });
    };

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(selectedFile);
        setNoteData({
          ...noteData,
          images: [selectedFile],
        });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    const validateData = {
      aging: Number(noteData.aging),
      alc: Number(noteData.alc),
      bottled: Number(noteData.bottled),
      bottler: noteData.bottler,
      comment: noteData.comment,
      createdAt: new Date(),
      date: noteData.date,
      distillery: noteData.distillery,
      finish: noteData.finish,
      images: noteData.images,
      nose: noteData.nose,
      rating: noteData.rating,
      taste: noteData.taste,
      type: noteData.type,
      uid: signInUser.uid,
      vintage: Number(noteData.vintage),
    };
    if (noteData.images.length > 0) {
      const imageUrl = await uploadImage(noteData.images[0]);
      await addNote({ ...validateData, images: [imageUrl] });
    } else {
      await addNote({ ...validateData, images: [] });
    }
  };

  return (
    <>
      <div className="flex justify-center min-h-[calc(100vh_-_88px)] pt-8 pb-20 px-3">
        <div className="p-8 w-full lg:w-3/5 bg-white">
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
                value={noteData.distilleryName ? noteData.distilleryName : ''}
                onChange={onChangeValue('distillery')}
                label="・蒸溜所名"
                placeholder="蒸溜所名を選択してください"
                onClick={openModal}
                readOnly
                isBold
              />
              {isOpen && (
                <Modal
                  modalTiele="蒸溜所を選択してください"
                  onClose={closeModal}
                >
                  <div>
                    <span className="block font-bold">スペイサイド</span>
                    <div className="flex gap-x-3 mt-1">
                      {SCOTCH.filter(
                        (elm) => elm.region === 'スペイサイド'
                        // todo: 型定義
                      ).map((distilleryData: any, i) => {
                        const isSeledted =
                          distilleryData.id === noteData.distillery;
                        return (
                          <div
                            onClick={() => {
                              setNoteData({
                                ...noteData,
                                distillery: distilleryData.id,
                                distilleryName: distilleryData.name,
                              });
                              closeModal();
                            }}
                            className={`p-2 border-solid border-2 border-gray-200 rounded cursor-pointer ${
                              isSeledted ? 'bg-gray-200' : 'bg-white'
                            }`}
                            key={`distillery-${i}`}
                          >
                            {distilleryData.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Modal>
              )}
            </div>
            <div className="mt-4">
              <Input
                type="text"
                value={noteData.brand}
                onChange={onChangeValue('brand')}
                label="・ブランド"
                placeholder="ブランドを入力してください"
                isBold
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                value={noteData.bottler}
                onChange={onChangeValue('bottler')}
                label="・ボトラー"
                placeholder="ボトラー名を入力してください"
                isBold
              />
            </div>
            <div className="mt-4 max-w-48">
              <Input
                type="text"
                value={noteData.vintage}
                onChange={onChangeValue('vintage')}
                label="・蒸溜年"
                placeholder=""
                inputMode="numeric"
                isBold
                unit="年"
              />
            </div>
            <div className="mt-4 max-w-48">
              <Input
                type="text"
                value={noteData.bottled}
                onChange={onChangeValue('bottled')}
                label="・瓶詰め"
                placeholder=""
                inputMode="numeric"
                isBold
                unit="年"
              />
            </div>
            <div className="mt-4 max-w-48">
              <Input
                type="text"
                value={noteData.aging}
                onChange={onChangeValue('aging')}
                label="・熟成年数"
                placeholder=""
                inputMode="numeric"
                isBold
                unit="年"
              />
            </div>
            <div className="mt-4 max-w-48">
              <Input
                type="text"
                value={noteData.alc}
                onChange={onChangeValue('alc')}
                label="・アルコール度数"
                placeholder=""
                inputMode="numeric"
                isBold
                unit="%"
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                value={noteData.type}
                onChange={onChangeValue('type')}
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
              rating={noteData.rating}
              onClick={(value) => {
                setNoteData({ ...noteData, rating: value });
              }}
              size={28}
              withLabel
            />
          </div>
          <div className="mt-4">
            <TextArea
              value={noteData.nose}
              onChange={onChangeValue('nose')}
              label="・香り"
              placeholder="香りを入力してください"
              isBold
            />
          </div>
          <div className="mt-4">
            <TextArea
              value={noteData.taste}
              onChange={onChangeValue('taste')}
              label="・味"
              placeholder="味を入力してください"
              isBold
            />
          </div>
          <div className="mt-4">
            <TextArea
              value={noteData.finish}
              onChange={onChangeValue('finish')}
              label="・余韻"
              placeholder="余韻を入力してください"
              isBold
            />
          </div>
          <div className="mt-4">
            <TextArea
              value={noteData.comment}
              onChange={onChangeValue('comment')}
              label="・総評"
              placeholder="総評を入力してください"
              isBold
            />
          </div>
          <div className="mt-4">
            <span className="block font-bold">・飲んだ日付</span>
            <div className="mt-1">
              <SelectDate
                startDate={noteData.date}
                onChange={(value) => {
                  setNoteData({ ...noteData, date: value });
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={() => handleSubmit()} text="登録する" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
