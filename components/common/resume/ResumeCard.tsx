import { Card, CardBody, CardHeader } from "@heroui/react";

import ResumeCardItem from "./ResumeCardItem";

type Props = {
  children?:
    | React.ReactElement<typeof ResumeCardItem>
    | React.ReactElement<typeof ResumeCardItem>[];
  title: string;
};

export default function ResumeCard({ children, title }: Props) {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl capitalize font-semibold">{title}</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-3 px-5">{children}</CardBody>
    </Card>
  );
}
