export interface SideMenuProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}
export interface SignalProvider {
  id: string;
  name: string;
  rank: number;
  subscribers: number;
  monthlyRevenue: number;
  active: boolean;
}
