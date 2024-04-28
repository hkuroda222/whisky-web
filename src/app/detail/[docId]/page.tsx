import Image from 'next/image';
import { LinkButton, DeleteButton } from '@/components/elements/button';
import { Rating } from '@/components/parts/rating';
import { getNote } from '@/libs/firebase/api/note';

const DetailPage = async ({ params }: { params: { docId: string } }) => {
  const docId = params.docId;
  const noteData = await getNote(docId);

  return (
    <div className="flex justify-center h-screen md:h-[calc(100vh_-_88px)] pt-8 pb-20 px-3">
      <div className="p-8 w-full lg:w-3/5 bg-white">
        <div className="flex">
          <Image
            src={noteData.image_path ? noteData.image_path : ''}
            alt="ボトル画像"
            width={288}
            height={288}
            priority
            className="block shrink-0 object-contain w-40 h-40 sm:w-72 sm:h-72 bg-neutral-200"
          />
          <div className="ml-4">
            <h1 className="font-bold text-lg">
              {noteData.distillery_name}
              {noteData.aging}年
            </h1>
            <div className="mt-2">
              <Rating
                rating={noteData.rating ? noteData.rating : 0}
                readOnly
                withLabel
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-4">
          <div className="w-full sm:w-2/4">
            <h2 className="font-bold text-lg">ボトル情報</h2>
            <table className="mt-4 w-full">
              <tbody>
                <tr className="h-8">
                  <td className="w-1/4 font-bold">蒸溜所</td>
                  <td className="w-3/4">{noteData.distillery_name}</td>
                </tr>
                <tr className="h-8">
                  <td className="w-1/4 font-bold">地域</td>
                  <td>{noteData.region}</td>
                </tr>
                <tr className="h-8">
                  <td className="w-1/4 font-bold">ボトラー</td>
                  <td>
                    {noteData.bottler ? noteData.bottler : 'オフィシャル'}
                  </td>
                </tr>
                <tr className="h-8">
                  <td className="w-1/4 font-bold">蒸溜</td>
                  <td>{noteData.vintage ? `${noteData.vintage}年` : '-'}</td>
                </tr>
                <tr className="h-8">
                  <td className="w-1/4 font-bold">瓶詰め</td>
                  <td>{noteData.bottled ? `${noteData.bottled}年` : '-'}</td>
                </tr>
                <tr className="h-8">
                  <td className="w-1/4 font-bold">熟成年数</td>
                  <td>{noteData.aging ? `${noteData.aging}年` : '-'}</td>
                </tr>
                <tr className="h-8">
                  <td className="w-1/4 font-bold">度数</td>
                  <td>{noteData.alc ? noteData.alc : '-'}</td>
                </tr>
                <tr className="h-8">
                  <td className="w-1/4 font-bold">樽の種類</td>
                  <td>{noteData.type ? noteData.type : '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 sm:mt-0 w-full sm:w-2/4">
            <h2 className="block font-bold text-lg">テイスティングノート</h2>
            <dl className="mt-4">
              <dt className="font-bold">香り</dt>
              <dd className="w-full">{noteData.nose}</dd>
              <dt className="mt-3 font-bold">味</dt>
              <dd>{noteData.taste}</dd>
              <dt className="mt-3 font-bold">余韻</dt>
              <dd>{noteData.finish}</dd>
              <dt className="mt-3 font-bold">総評</dt>
              <dd>{noteData.comment}</dd>
            </dl>
          </div>
        </div>
        <div className="flex justify-center mt-8 pt-8 w-full border-t">
          <DeleteButton />
          {/* todo: リンクの変更 */}
          <LinkButton href={`/register`} text="編集する" />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
