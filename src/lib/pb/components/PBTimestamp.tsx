import { dateToString } from "@/utils/helpers/others";

interface PbTimesProps {
  label?: React.ReactNode;
  timestamp: Date | string;
}

export function PBTimeStamp({ timestamp, label }: PbTimesProps) {
  return (
    <div className=" flex items-center justify-between  text-sm gap-2">
      {label && label}
      <h3>{dateToString(timestamp)}</h3>
    </div>
  );
}
