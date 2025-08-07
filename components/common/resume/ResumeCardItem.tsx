import { Skeleton } from "@heroui/skeleton";
import { VariantProps, Button } from "@heroui/react";

type Props = {
  title: string;
  content: string | number;
  loading?: boolean;
  color?: VariantProps<typeof Button>["color"];
};

export default function ResumeCardItem({
  title,
  content,
  loading = false,
  color = "default",
}: Props) {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <p className="text-md font-bold capitalize">{title}:</p>
      <div
        className={`p-2 ${color === "default" ? "bg-default-100" : `bg-${color}-50`} text-${color}-500 rounded-xl capitalize text-sm font-medium`}
      >
        <Skeleton isLoaded={!loading}>{content}</Skeleton>
      </div>
    </div>
  );
}
