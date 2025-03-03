import { SelectItemProps } from "@radix-ui/react-select";

declare module "@radix-ui/react-select" {
  interface SelectItemProps<T> {
    // Add your custom properties here
    value: string | undefined;
  }
}
