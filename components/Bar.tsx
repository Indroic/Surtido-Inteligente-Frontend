import Image from "next/image";
import User from "./User";

export default function HeaderBar() {
  return (
    <header className="flex flex-row items-center justify-between w-full p-3 border-b-divider border-b-1">
      <Image alt="logo" src={"/logo.webp"} width={120} height={80} />
      <User />
    </header>
  );
}
