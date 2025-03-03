export type SideNavItem = {
  title: string;
  path: string;
  pathName?:boolean;
  icon?: JSX.Element;
  submenu?: boolean;
  commonPath?: string;
  subMenuItems?: SideNavItem[];
};
