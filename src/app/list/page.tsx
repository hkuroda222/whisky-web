'use client';
import { useState, useEffect } from 'react';
import { LinkButton } from '@/components/elements/button';
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
    <>
      <div className="flex justify-end">
        <LinkButton href="/register" text="記録する" />
      </div>
      <ul className="mt-4 p-3 md:p-8 bg-white border-2 rounded">
        {listData.map((data, i) => (
          <ListItem data={data} index={i} key={`list-${i}`} />
        ))}
      </ul>
    </>
  );
};

export default ListPage;
