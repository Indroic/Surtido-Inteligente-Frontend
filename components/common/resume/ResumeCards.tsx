import { Button } from "@heroui/button";
import { VariantProps } from "@heroui/theme";

import ResumeCardItem from "./ResumeCardItem";
import ResumeCard from "./ResumeCard";

export type dataCardProps = {
  content: any;
  color: VariantProps<typeof Button>["color"];
};

export type resumeCardProps = {
  title: string;
  data: {
    [key: string]: string | dataCardProps;
  };
};

type Props = {
  resumeCards?: resumeCardProps[];
};

function ResumeCards({ resumeCards }: Props) {
  return (
    <>
      {resumeCards
        ? resumeCards.map((value, index) => (
            <ResumeCard key={index} title={value.title}>
              {Object.entries(value.data).map(([key, content], index) => {
                if (typeof content === "string") {
                  return (
                    <ResumeCardItem key={index} content={content} title={key} />
                  );
                }

                return (
                  <ResumeCardItem
                    key={index}
                    color={content.color}
                    content={content.content}
                    title={key}
                  />
                );
              })}
            </ResumeCard>
          ))
        : undefined}
    </>
  );
}

export default ResumeCards;
