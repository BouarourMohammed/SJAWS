import { useAppSelector } from "..";

interface useProfileHook {
  user: undefined | null;
}
export const useProfile = (): useProfileHook => {
  const user = useAppSelector((state: any) => state?.profileSlice?.user);
  return {
    user,
  };
};
