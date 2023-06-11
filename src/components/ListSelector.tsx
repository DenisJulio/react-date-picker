import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "../css/MonthSelector.sass";
import {
  autoUpdate,
  flip,
  useClick,
  useFloating,
  useInteractions,
  useListNavigation,
  useTypeahead,
  useDismiss,
  useRole,
  FloatingFocusManager,
  FloatingList,
  useListItem,
  offset,
} from "@floating-ui/react";

interface ListSelectorProps {
  value: string;
  onItemSelected: (label: string, index?: number) => void;
  labels: Array<string>;
  tw?: string
}

interface ListSelectorContextValue {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

const ListSelectorContext = createContext<ListSelectorContextValue>(
  {} as ListSelectorContextValue
);

export default function ListSelector({
  value,
  onItemSelected,
  labels,
  tw
}: ListSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(value);

  useEffect(() => {
    setSelectedIndex(labels.indexOf(value));
    setSelectedLabel(value.toString());
  }, [value, labels]);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [flip(), offset(8)],
  });

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const handleSelect = useCallback(
    (index: number | null) => {
      setSelectedIndex(index);
      setIsOpen(false);
      if (index !== null) {
        setSelectedLabel(labelsRef.current[index]);
        onItemSelected(labelsRef.current[index] as string, index);
      }
    },
    [onItemSelected]
  );

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });

  function handleTypeaheadMatch(index: number | null) {
    if (isOpen) setActiveIndex(index);
    else handleSelect(index);
  }

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNav, typeahead, click, dismiss, role]
  );

  const selectContext = useMemo(
    () => ({
      activeIndex,
      selectedIndex,
      getItemProps,
      handleSelect,
    }),
    [activeIndex, selectedIndex, getItemProps, handleSelect]
  );

  return (
    <>
      <div
        className={`cursor-pointer px-3 py-1 min-w-fit ${tw ?? "w-[8rem]"} rounded-full text-center text-button ${
          isOpen ? "bg-gray-200" : ""
        }`}
        ref={refs.setReference}
        tabIndex={0}
        {...getReferenceProps()}
      >
        {selectedLabel}
      </div>
      <ListSelectorContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <div className={`outer rounded-2xl min-w-fit ${tw ?? "w-[8rem]"} shadow-lg bg-white border-gray-500 border-[1px] pop`}>
                <div className="inner min-h-fit max-h-[8rem] flex flex-col">
                  <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    {labels.map((label) => (
                      <ListOption label={label} key={label} />
                    ))}
                  </FloatingList>
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        )}
      </ListSelectorContext.Provider>
    </>
  );
}

function ListOption({ label }: { label: string }) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } =
    useContext(ListSelectorContext);

  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      style={{
        fontWeight: isSelected ? "bold" : "",
        color: isSelected ? "#0ea5e9" : ""
      }}
      className="px-3 text-center py-1 h-[2rem] "
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      {label}
    </button>
  );
}
