"use client";

import { userAtom } from "@/atoms/user";
import { useRecoilValue } from "recoil";

export const useUser = () => {
  const value = useRecoilValue(userAtom);
  return value;
};
