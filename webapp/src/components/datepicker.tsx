import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "./ui/button";

import ReactDatePicker from "react-datepicker";

import { dateToUnixTimestamp } from "@/lib/utils";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  date?: Date;
  setDate: (date?: Date) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <>
      <ReactDatePicker
        selected={date}
        onChange={(newDate) => setDate(newDate!)}
        showTimeInput
        timeFormat="hh:mm"
        timeIntervals={5}
        timeCaption="time"
        dateFormat="MMMM d, yyyy hh:mm"
        customInput={
          <Button
            variant={"outline"}
            className={`w-full justify-start text-left font-normal ${
              !date && "text-muted-foreground"
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "MMMM d, yyyy hh:mm")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        }
      />
    </>
  );
}
