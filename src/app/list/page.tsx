'use client';
import { useState, useEffect, useCallback } from 'react';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { FloatingButton } from '@/components/elements/button';
import { ListItem } from '@/components/parts/listItem';
import { Loading } from '@/components/parts/loading';
import { useAuth } from '@/libs/hooks/useAuth';
import { getNoteList, getNextList } from '@/libs/firebase/api/note';
import { NoteType } from '@/type/note';

const LIST_LIMIT = 10;

const ListPage = () => {
  const [listData, setListData] = useState<NoteType[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const signInUser = useAuth();

  const getListData = async () => {
    setIsLoading(true);
    const { data, lastVisible } = await getNoteList(signInUser.uid, LIST_LIMIT);
    setListData(data);
    setLastVisible(lastVisible);
    setIsLoading(false);
    setHasMore(data.length === LIST_LIMIT);
    setIsLoading(false);
  };

  const getNextListData = async () => {
    if (!lastVisible || !hasMore) return;
    const { data, nextLastVisible } = await getNextList(
      signInUser.uid,
      lastVisible,
      LIST_LIMIT
    );
    setListData((prevData) => [...prevData, ...data]);
    setLastVisible(nextLastVisible);
    setIsLoading(false);
    setHasMore(data.length === LIST_LIMIT);
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getNextListData();
  }, [isLoading, lastVisible, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    (async () => {
      if (signInUser.uid) {
        await getListData();
      }
    })();
  }, [signInUser.uid]);

  return (
    <>
      {isLoading && <Loading />}
      <ul className="mt-4 p-3 md:p-8 bg-white border-2 rounded">
        {listData.map((data, i) => (
          <ListItem data={data} index={i} key={`list-${i}`} />
        ))}
      </ul>
      <FloatingButton href="/register">
        <span className="text-2xl sm:text-3xl text-slate-600">+</span>
      </FloatingButton>
    </>
  );
};

export default ListPage;
