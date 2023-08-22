import { classNames } from "@/lib/utils";

export function Prose({ children, className }) {
  return (
    <div className={classNames(className, "prose dark:prose-invert")}>
      {children}
    </div>
  );
}
