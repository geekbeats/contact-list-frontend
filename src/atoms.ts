import { atom } from 'jotai';

export const tokenAtom = atom<string>(localStorage.getItem('token') || '');
export const isLoggedInAtom = atom<boolean>((get) => !!get(tokenAtom));
export const selectedContactAtom = atom<Contact | null>(null);

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
}
