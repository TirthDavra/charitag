"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { useEffect, forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  fixed?: boolean;
  [key: string]: string | boolean | undefined;
}
interface GroupOption {
  [key: string]: Option[];
}

interface MultipleSelectorProps {
  value?: Option | null;
  defaultOptions?: Option[];
  options?: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  loadingIndicator?: React.ReactNode;
  emptyIndicator?: React.ReactNode;
  notShowEmpty?: boolean;
  delay?: number;
  triggerSearchOnFocus?: boolean;
  onSearch?: (value: string) => Promise<Option[]>;
  onChange?: (option: Option | null) => void;
  maxSelected?: number;
  onMaxSelected?: (maxLimit: number) => void;
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  selectFirstItem?: boolean;
  creatable?: boolean;
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >;
  classNameItem?: string;
  itemElement?: (item: Option, index: number) => JSX.Element;
}

export interface MultipleSelectorRef {
  selectedValue: Option | null;
  input: HTMLInputElement;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string): GroupOption {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return { "": options };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(
  groupOption: GroupOption,
  picked: Option | null,
): GroupOption {
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption;
  if (picked === null) return cloneOption;
  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter((val) => val.value !== picked.value);
  }
  return cloneOption;
}

const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CommandPrimitive.Empty>
>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);
  if (!render) return null;
  return (
    <div
      ref={forwardedRef}
      className={cn("py-6 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = "CommandEmpty";

const Combobox = React.forwardRef<MultipleSelectorRef, MultipleSelectorProps>(
  (
    {
      value = null,
      onChange,
      placeholder,
      searchPlaceholder,
      defaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
      classNameItem,
      itemElement,
      notShowEmpty = true,
    }: MultipleSelectorProps,
    ref: React.Ref<MultipleSelectorRef>,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const [selected, setSelected] = React.useState<Option | null>(value);
    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(defaultOptions, groupBy),
    );
    const [inputValue, setInputValue] = React.useState("");
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [isFirstTimeSearch, setIsFirstTimeSearch] = React.useState(true);
    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: selected,
        input: inputRef.current as HTMLInputElement,
      }),
      [selected],
    );

    const handleUnselect = React.useCallback(() => {
      setSelected(null);
      onChange?.(null);
    }, [onChange]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          // if (
          //   (e.key === "Delete" || e.key === "Backspace") &&
          //   input.value === ""
          // ) {
          //   handleUnselect();
          // }
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [handleUnselect],
    );

    useEffect(() => {
      setSelected(value);
    }, [value]);

    useEffect(() => {
      if (!arrayOptions) {
        return;
      }
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [arrayOptions, groupBy]);

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };

      if (onSearch && open && (triggerSearchOnFocus || debouncedSearchTerm)) {
        doSearch();
        if (isFirstTimeSearch) {
          setIsFirstTimeSearch(false);
        }
      }
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    const CreatableItem = () => {
      if (!creatable) return null;
      const Item = (
        <CommandItem
          value={inputValue}
          className={`cursor-pointer ${classNameItem}`}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value: string) => {
            setInputValue("");
            const newOption = { value, label: value };
            setSelected(newOption);
            onChange?.(newOption);
          }}
        >{`Create "${inputValue}"`}</CommandItem>
      );
      if (
        (!onSearch && inputValue.length > 0) ||
        (onSearch && debouncedSearchTerm.length > 0 && !isLoading)
      ) {
        return Item;
      }
      return null;
    };

    const EmptyItem = React.useCallback(() => {
      if (!emptyIndicator || (notShowEmpty && inputValue === "")) return null;
      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        );
      }
      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const selectables = React.useMemo<GroupOption>(
      () => removePickedOption(options, selected),
      [options, selected],
    );

    const commandFilter = React.useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }
      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
        };
      }
      return undefined;
    }, [creatable, commandProps?.filter]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger
          asChild
          className="focus-visible:ring-1 focus-visible:ring-offset-0"
          title={selected ? selected.label : placeholder}
        >
          <Button
            variant="outline"
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "hover:text-accent-[unset] w-full justify-between font-normal hover:bg-[unset] [&>span]:line-clamp-1",
              className,
              selected ? "" : "text-gray-400",
            )}
            ref={triggerRef}
            disabled={disabled}
          >
            <span>{selected ? selected.label : placeholder}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[99999]"
          style={{ minWidth: triggerRef.current?.offsetWidth }}
          ref={contentRef}
        >
          <Command
            {...commandProps}
            onKeyDown={(e) => {
              handleKeyDown(e);
              commandProps?.onKeyDown?.(e);
            }}
            className={cn(
              "w-full overflow-visible bg-transparent",
              commandProps?.className,
            )}
            shouldFilter={
              commandProps?.shouldFilter !== undefined
                ? commandProps.shouldFilter
                : !onSearch
            }
            filter={commandFilter()}
          >
            <div
              cmdk-input-wrapper=""
              className="flex rounded border-b-2 border-gray-100"
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="my-auto ml-[2px] h-3 w-3"
              />
              <CommandPrimitive.Input
                {...inputProps}
                ref={inputRef}
                value={inputValue}
                disabled={disabled}
                onValueChange={(value) => {
                  setInputValue(value);
                  inputProps?.onValueChange?.(value);
                }}
                onBlur={(event) => {
                  inputProps?.onBlur?.(event);
                }}
                onFocus={(event) => {
                  setOpen(true);
                  triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
                  inputProps?.onFocus?.(event);
                }}
                placeholder={
                  searchPlaceholder ? searchPlaceholder : "Search..."
                }
                className={cn(
                  `w-full flex-1 bg-transparent px-2 py-1 outline-none`,
                  inputProps?.className,
                )}
              />
              {isLoading && loadingIndicator}
            </div>
            <CommandList>
              {Object.entries(selectables).map(([key, value]) => (
                <CommandGroup key={key} heading={key}>
                  {value.map((option, index) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      className={`line-clamp-1 cursor-pointer ${classNameItem}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelected(option);
                        onChange?.(option);
                        setOpen(false);
                      }}
                    >
                      {itemElement ? (
                        itemElement(option, index)
                      ) : (
                        <span
                          className="line-clamp-1"
                          style={{ minWidth: triggerRef.current?.offsetWidth }}
                        >
                          {option.label}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CreatableItem />
              <EmptyItem />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

Combobox.displayName = "Combobox";
export default Combobox;
