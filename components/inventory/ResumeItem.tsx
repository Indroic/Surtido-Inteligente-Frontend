import { TablerIcon } from "@tabler/icons-react";
import { Component } from "react";

interface Props {
  title: string;
  Icon: TablerIcon;
  content: string;
  indice?: number;
}

class ResumeItem extends Component<Props> {
  render() {
    const { title, Icon, content } = this.props;

    return (
      <li
        className={`flex flex-col justify-start items-start px-8 py-7 w-full min-w-max ${this.border()}`}
      >
        <section className="flex-1 flex flex-row w-full justify-between items-center">
          <span className="text-lg font-semibold">{title}</span>
          {<Icon />}
        </section>
        <section className="font-bold text-xl flex-1 justify-start">
          {content}
        </section>
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
