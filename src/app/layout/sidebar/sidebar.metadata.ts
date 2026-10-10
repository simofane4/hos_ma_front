// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  moduleName: string;
  iconType: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  badge: string;
  badgeClass: string;
  role: string[];
  submenu: RouteInfo[];
  /**
   * The section is part of the navigation but its screen does not exist yet.
   * It is rendered greyed out and does not navigate, so a role never lands on
   * a 404 while the feature is still being built.
   */
  disabled?: boolean;
}
