"use client";
import Image from "next/image";
import { useState, useEffect, type ChangeEvent } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { Input, InputItem } from "@/components/elements/input";
import {
  Button,
  LinkButton,
  ButtonWithFileInput,
} from "@/components/elements/button";
import { DatePickerInput } from "@/components/elements/datePicker";
import { Rating } from "@/components/parts/rating";
import { Loading } from "@/components/parts/loading";
import { RegionModal } from "@/components/parts/regionModal";
import { Modal } from "@/components/parts/modal";
import type { NoteType, InitialInputType } from "@/type/note";
import {
  getNote,
  uploadImage,
  updateNote,
  deleteImage,
} from "@/libs/firebase/api/note";
import { useAuth } from "@/libs/hooks/useAuth";
import { useModal } from "@/libs/hooks/useModal";

const initialDataTemplate = {
  aging: "",
  alc: "",
  bottled: "",
  bottler: "",
  caskNum: "",
  comment: "",
  date: new Date(),
  distilleryName: "",
  finish: "",
  images: [],
  nose: "",
  rating: 0,
  region: "",
  taste: "",
  type: "",
  vintage: "",
};

export default function EditPage({ params }: { params: { docId: string } }) {
  const docId = params.docId;
  const signInUser = useAuth();
  const [initialData, setInitialData] =
    useState<InitialInputType>(initialDataTemplate);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [changedImage, setChangedImage] = useState<Array<File>>([]);
  const [doneSubmit, setDoneSubmit] = useState<boolean>(false);
  const { isOpen, openModal, closeModal } = useModal();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<InitialInputType>({
    defaultValues: initialDataTemplate,
  });

  useEffect(() => {
    (async () => {
      if (docId && signInUser.uid) {
        const noteData = await getNote(signInUser.uid, docId);
        setInitialData({
          aging: noteData.aging ? String(noteData.aging) : "",
          alc: noteData.alc ? String(noteData.alc) : "",
          bottled: noteData.bottled ? String(noteData.bottled) : "",
          bottler: noteData.bottler ? noteData.bottler : "",
          caskNum: noteData.caskNum ? String(noteData.caskNum) : "",
          comment: noteData.comment ? noteData.comment : "",
          date: new Date(noteData.date * 1000),
          distilleryName: noteData.distilleryName
            ? noteData.distilleryName
            : "",
          finish: noteData.finish ? noteData.finish : "",
          images: noteData.images,
          nose: noteData.nose ? noteData.nose : "",
          rating: noteData.rating ? noteData.rating : 0,
          region: noteData.region ? noteData.region : "",
          taste: noteData.taste ? noteData.taste : "",
          type: noteData.type ? noteData.type : "",
          vintage: noteData.vintage ? String(noteData.vintage) : "",
        });
        setImagePreview(noteData.images[0]);
      }
    })();
  }, [signInUser.uid, docId]);

  useEffect(() => {
    reset(initialData);
  }, [reset, initialData]);

  const onSubmit: SubmitHandler<InitialInputType> = async (data) => {
    const validateData: NoteType = {
      aging: data.aging ? Number(data.aging) : null,
      alc: data.alc ? Number(data.alc) : null,
      bottled: data.bottled ? Number(data.bottled) : null,
      bottler: data.bottler,
      caskNum: data.caskNum ? Number(data.caskNum) : null,
      comment: data.comment,
      date: data.date.getTime() / 1000,
      distilleryName: data.distilleryName,
      finish: data.finish,
      images: [],
      nose: data.nose,
      rating: data.rating,
      region: data.region,
      taste: data.taste,
      type: data.type,
      uid: signInUser.uid,
      updatedAt: new Date().getTime(),
      vintage: data.vintage ? Number(data.vintage) : null,
    };

    const isChangedImage = changedImage.length > 0;

    if (isChangedImage) {
      const imageUrl = await uploadImage(changedImage[0]);
      await updateNote({ ...validateData, images: new Array(imageUrl) }, docId);
      if (initialData.images.length > 0) {
        await deleteImage(initialData.images[0]);
      }
      setDoneSubmit(true);
    } else {
      await updateNote({ ...validateData }, docId);
      setDoneSubmit(true);
    }
  };

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChangedImage([selectedFile]);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      {isSubmitting && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold text-xl">ボトルの情報</h2>
        <div className="mt-8">
          <span className="block font-bold">・写真を変更する</span>
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
                priority
              />
            ) : (
              <div className="mt-4 w-48 h-48 border-solid border-2 border-gray-400 rounded" />
            )}
          </div>
          <div className="mt-4">
            <InputItem
              type="text"
              name="distilleryName"
              control={control}
              rules={{
                required: "蒸留所名 / ブランドは必須です",
                maxLength: {
                  value: 30,
                  message: "文字数は30文字以内です。",
                },
              }}
              label="・蒸留所名 / ブランド"
              placeholder="蒸留所名 / ブランドを入力してください"
              isBold
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              value={getValues("region")}
              onChange={(e) => {
                setValue("region", e.target.value);
              }}
              label="・地域"
              placeholder="地域を選択してください"
              onClick={openModal}
              readOnly
              isBold
            />
          </div>
          <div className="mt-4">
            <InputItem
              type="text"
              name="bottler"
              control={control}
              rules={{
                maxLength: {
                  value: 30,
                  message: "文字数は30文字以内です。",
                },
              }}
              label="・ボトラー"
              placeholder="ボトラー名を入力してください"
              isBold
            />
          </div>
          <div className="mt-4 max-w-48">
            <InputItem
              type="text"
              name="vintage"
              control={control}
              rules={{
                maxLength: {
                  value: 4,
                  message: "文字数は4文字以内です。",
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
              type="text"
              name="bottled"
              control={control}
              rules={{
                maxLength: {
                  value: 4,
                  message: "文字数は4文字以内です。",
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
              type="text"
              name="aging"
              control={control}
              rules={{
                maxLength: {
                  value: 2,
                  message: "文字数は2文字以内です。",
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
              type="text"
              name="alc"
              control={control}
              rules={{
                maxLength: {
                  value: 5,
                  message: "文字数は5文字以内です。",
                },
              }}
              label="・アルコール度数"
              placeholder=""
              inputMode="numeric"
              isBold
              unit="%"
            />
          </div>
          <div className="mt-4 max-w-48">
            <InputItem
              type="text"
              name="caskNum"
              control={control}
              rules={{
                maxLength: {
                  value: 10,
                  message: "文字数は10文字以内です。",
                },
              }}
              label="・カスクナンバー"
              placeholder=""
              inputMode="numeric"
              isBold
              unit="　"
            />
          </div>
          <div className="mt-4">
            <InputItem
              type="text"
              name="type"
              control={control}
              rules={{
                maxLength: {
                  value: 30,
                  message: "文字数は30文字以内です。",
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
            rating={getValues("rating")}
            onClick={(value) => {
              setValue("rating", value);
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
                message: "文字数は500文字以内です。",
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
                message: "文字数は500文字以内です。",
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
                message: "文字数は500文字以内です。",
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
                message: "文字数は500文字以内です。",
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
              render={({ field: { onChange, value } }) => {
                return <DatePickerInput onChange={onChange} selected={value} />;
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            color="white"
            text="登録する"
            // todo: 画像登録inputをreact hook formに置き換えた後に適用する
            // disabled={!isDirty && !isValid}
          />
        </div>
      </form>
      {isOpen && (
        <RegionModal
          closeModal={closeModal}
          onSubmit={(data: { region: string }) => {
            setValue("region", data.region);
            closeModal();
          }}
          resetValue={() => reset({ region: "" })}
          value={getValues("region")}
        />
      )}
      {doneSubmit && (
        <Modal>
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg font-bold">編集が完了しました</div>
            <div className="mt-2 w-60">
              <LinkButton href="/list/" text="一覧画面に戻る" />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
