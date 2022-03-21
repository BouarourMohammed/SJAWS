import { useAppSelector } from "..";

interface NavigationHook {
  nav: boolean | null;
}
export const useNavState = (): NavigationHook => {
  const nav = useAppSelector((state: any) => state?.alertSlice?.navigation);
  return {
    nav,
  };
};
