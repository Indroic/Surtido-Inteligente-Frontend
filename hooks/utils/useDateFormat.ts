import { useCallback } from "react";
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

export default function useDateFormat() {
  const formatter = useDateFormatter({
    calendar: "gregory",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formatYYMMDD = useCallback(
    (value?: DateValue | CalendarDate | null) => {
      if (!value) return "";
      const parts = formatter.formatToParts(value.toDate(getLocalTimeZone()));
      const year = parts.find((p) => p.type === "year")?.value ?? "";
      const month = parts.find((p) => p.type === "month")?.value ?? "";
      const day = parts.find((p) => p.type === "day")?.value ?? "";

      return `${year}-${month}-${day}`; // → 25-02-05 para 2025-02-05
    },
    [formatter],
  );

  return { formatYYMMDD };
}
