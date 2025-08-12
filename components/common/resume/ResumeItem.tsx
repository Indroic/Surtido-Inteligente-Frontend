import { Skeleton } from "@heroui/skeleton";
import { TablerIcon } from "@tabler/icons-react";
import { Component } from "react";

interface Props {
  title: string;
  Icon: TablerIcon;
  content: string;
  indice?: number;
  loading?: boolean;
}

class ResumeItem extends Component<Props> {
  render() {
    const { title, Icon, content, loading } = this.props;

    return (
      <li
        className={`flex flex-col justify-start items-start px-8 py-7 w-full min-w-max gap-1 ${this.border()}`}
      >
        <section className="flex-1 flex flex-row w-full justify-between items-center gap-8">
          <span className="text-lg font-semibold">{title}</span>
          {<Icon />}
        </section>
        <Skeleton
          className="flex w-full rounded-md font-bold text-xl flex-1 justify-start"
          isLoaded={!loading}
        >
          {content}
        </Skeleton>
      </li>
    );
  }

  private borderTop() {
    return this.props.indice ? (this.props.indice >> 1 ? true : false) : false;
  }

  private borderLeft() {
    return this.props.indice ? (this.props.indice >> 0 ? true : false) : false;
  }

  private imparIndex() {
    return this.props.indice ? (this.props.indice & 1 ? true : false) : false;
  }

  private border() {
    return (
      "border-divider md:border-t-0 " +
      (this.borderTop() ? "border-t-1 " : "") +
      (this.borderLeft() ? "md:border-l-1 " : "") +
      (this.imparIndex() ? "border-l-1" : "")
    );
  }
}

export default ResumeItem;
