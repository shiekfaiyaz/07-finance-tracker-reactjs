import {
  UtensilsCrossed,
  Car,
  Zap,
  ShoppingBag,
  Film,
  Wallet,
  LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  Food: UtensilsCrossed,
  Travel: Car,
  Bills: Zap,
  Shopping: ShoppingBag,
  Entertainment: Film,
  Income: Wallet,
  Other: ShoppingBag,
};