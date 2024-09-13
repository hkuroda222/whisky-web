import { atom } from 'recoil';

export const signInUserAtom = atom<{ uid: string }>({
	key: 'signInUser',
	default: { uid: '' },
});
