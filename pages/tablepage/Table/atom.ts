import { atom } from "recoil";

export const tablePaginationAtom = atom<{
  offset: number;
  limit: number;
  count: number | undefined;
  pageCountServer: number | undefined;
}>({
  key: "tablePaginationAtom",
  default: { offset: 0, limit: 10, count: 0, pageCountServer: 0 },
});
