import { ChangeEvent, useState } from "react";

export default function useCheckedHook<T>(initialData: T[]) {
  const [checkItems, setCheckItems] = useState<string[]>([]);

  const onChecked = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (checkItems.includes(target.id)) {
      setCheckItems(checkItems.filter((item) => item !== target.id));
      return;
    }
    console.log(checkItems);
    setCheckItems([...checkItems, target.id]);
  };

  const onSelectAllChecked = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      setCheckItems([...initialData.map((item, num) => "id" + String(Object.values(initialData[num] as JSX.Element)[0]))]);
    } else {
      setCheckItems([]);
    }
  };
  console.log(checkItems);

  return { onChecked, onSelectAllChecked, checkItems };
}
