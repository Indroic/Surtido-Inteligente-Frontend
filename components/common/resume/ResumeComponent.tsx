import React, { Component } from "react";

import ResumeItem from "@/components/common/resume/ResumeItem";

type Props = {
  children: React.ReactElement<ResumeItem> | React.ReactElement<ResumeItem>[];
};

export default class ResumeComponent extends Component<Props> {
  render() {
    return (
      <ul className="hidden md:visible md:flex md:flex-row w-full shadow dark:bg-content1 rounded-lg border-1 border-divider">
        {React.Children.map(this.props.children, (child, index) =>
          React.cloneElement(child, {
            ...child.props,
            key: index,
            indice: index,
          } as any)
        )}
      </ul>
    );
  }
}
