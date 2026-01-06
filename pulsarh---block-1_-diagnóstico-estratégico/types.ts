import { LucideIcon } from "lucide-react";

export interface DataCardProps {
  number: string;
  title: string;
  source: string;
  description: string;
  delay: number;
}

export interface RiskCardProps {
  id: number;
  title: string;
  phrase: string;
  signs: string;
  kpis: string[];
  icon: LucideIcon;
  color: string;
}

export interface NavItem {
  id: number;
  label: string;
  active: boolean;
  locked: boolean;
}