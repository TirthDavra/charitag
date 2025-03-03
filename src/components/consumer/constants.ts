import {
  IconAmericanExpress,
  IconMasterCard,
  IconPaymentVisa,
} from "../svgIcons";

export type PaymentMethodBrand = string;

export const paymentMethodIconMap: Record<
  PaymentMethodBrand,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  visa: IconPaymentVisa,
  "American Express": IconAmericanExpress,
  mastercard: IconMasterCard,
};

export const OrderStatus = [
  { value: "0", label: "" },
  { value: "1", label: "Completed" },
  { value: "2", label: "Processing" },
  { value: "3", label: "PendingPayment" },
  { value: "4", label: "On hold" },
  { value: "4", label: "Refunded" },
  { value: "4", label: "Failed" },
];

export const cardIcons: Record<string, string> = {
  visa: "/card_icons/1.png",
  mastercard: "/card_icons/2.png",
  mestro: "/card_icons/3.png",
  cirrus: "/card_icons/4.png",
  paypal: "/card_icons/5.png",
  westernunion: "/card_icons/6.png",
  visaelectron: "/card_icons/7.png",
  amazon: "/card_icons/8.png",
  worldpay: "/card_icons/9.png",
  diners: "/card_icons/10.png",
  jcb: "/card_icons/16.png",
  discover: "/card_icons/14.png",
};
