import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { differenceInDays, subDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

const getLocalizedMonth = (date: Date, locale = es) => format(date, 'MMMM', { locale });

export type Filter = {
  range?: DateRange;
};

type ApplyFiltersCallBack = (filter: Filter) => void;
type DownloadOrdersCallback = () => void;
export type FiltersPageProps = {
  applyFiltersCallBack: ApplyFiltersCallBack;
  downloadOrdersCallback: DownloadOrdersCallback;
};

export default function FiltersPage({
  applyFiltersCallBack,
  downloadOrdersCallback,
}: Readonly<FiltersPageProps>) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const handleFilters = () => applyFiltersCallBack({ range: date });
  const handleDownload = () => downloadOrdersCallback();

  return (
    <div className="flex flex-row gap-3 mb-[20px]">
      <div className="flex flex-col gap-3">
        {/* <Label htmlFor="date" className="px-1">  </Label> */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal h-[40px] bg-white"
            >
              {date?.from && date?.to
                ? `${getLocalizedMonth(date.from)} - ${getLocalizedMonth(
                    date.to
                  )}`
                : 'Seleccione el rango de fecha'}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              required
              mode="range"
              captionLayout={'dropdown-months'}
              defaultMonth={date.from}
              numberOfMonths={2}
              selected={date}
              onSelect={(e) => {
                setDate(e);
                if (e.from && e.to) {
                  const daysDifference = differenceInDays(e.from, e.to);
                  console.log(daysDifference);
                  // setOpen(false);
                }
              }}
              timeZone="America/El_Salvador"
              locale={es}
              showOutsideDays={false}
              className="rounded-lg border shadow-sm"
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={handleFilters}>Buscar</Button>
      <Button
        onClick={handleDownload}
        variant={'outline'}
        className="bg-white h-[39px]"
      >
        Descargar órdenes
      </Button>
    </div>
  );
}
