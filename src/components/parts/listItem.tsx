import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '@/components/parts/rating';
import { NoteType } from '@/type/note';

type ListItemProps = {
  data: NoteType;
  index: number;
};
export const ListItem = (props: ListItemProps) => {
  const { data, index } = props;
  const date = new Date(data.date.seconds * 1000);
  return (
    <li
      className="block [&:nth-child(n+2)]:mt-4"
      style={{
        borderTop: index > 0 ? '2px solid #e5e7eb' : 'none',
        paddingTop: index > 0 ? '1rem' : 'none',
      }}
    >
      <Link href={`/detail/${data.docId}`} className="block">
        <span className="block font-bold text-lg">{`${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日`}</span>
        <div className="flex mt-2">
          <Image
            src={data.image_path ? data.image_path : ''}
            alt="ボトル画像"
            width={200}
            height={200}
            priority
            className="block shrink-0 object-contain w-28 h-28 sm:w-52 sm:h-52 bg-neutral-200"
          />
          <div className="ml-4">
            <span className="block font-bold text-lg">
              {data.distillery_name}
              {data.aging}年
            </span>
            <span className="block font-medium">{data.bottler}</span>
            {data.vintage && data.vintage > 0 && (
              <span className="block font-medium">蒸溜: {data.vintage}年</span>
            )}
            {data.bottled && data.bottled > 0 && (
              <span className="block font-medium">
                瓶詰め: {data.bottled}年
              </span>
            )}
            <Rating rating={data.rating ? data.rating : 0} readOnly withLabel />
          </div>
        </div>
      </Link>
    </li>
  );
};
