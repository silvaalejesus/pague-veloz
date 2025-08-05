"use client";

import { allItemsAtom, selectedStatusesAtom } from "@/store/atoms";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { useMemo } from "react";

export const StatusFilter = () => {
  const [selectedStatuses, setSelectedStatuses] = useAtom(selectedStatusesAtom);
  const [allItems] = useAtom(allItemsAtom);

  const availableStatuses = useMemo(
    () =>
      [...new Set(allItems.map((item) => item.status).filter(Boolean))].sort(),
    [allItems]
  );

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        Filtrar por Status
      </Typography>
      <FormGroup>
        {availableStatuses.map((status) => (
          <FormControlLabel
            key={status}
            control={
              <Checkbox
                checked={selectedStatuses.includes(status)}
                onChange={() => toggleStatus(status)}
              />
            }
            label={status}
          />
        ))}
      </FormGroup>
    </div>
  );
};
