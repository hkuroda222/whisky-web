'use client';
import { useState, useEffect } from 'react';
import { ListItem } from '@/components/parts/listItem';
import { useAuth } from '@/libs/hooks/useAuth';
import { getNoteList } from '@/libs/firebase/api/note';
import { NoteType } from '@/type/note';

const ListPage = () => {
  const [listData, setListData] = useState<NoteType[]>([]);
  const signInUser = useAuth();

  useEffect(() => {
    (async () => {
      const data = await getNoteList(signInUser.uid);
      setListData(data);
    })();
  }, [signInUser.uid]);

  return (
    <div className="flex justify-center items-center mt-8 mb-20 px-3">
      <ul className="px-8 py-8 w-full lg:w-3/5 bg-white border-2 rounded">
        {listData.map((data, i) => (
          <ListItem data={data} index={i} key={`list-${i}`} />
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
