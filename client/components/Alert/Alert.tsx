import { truncateString } from "@/utils/truncateString/truncateString";
import { FC, ReactNode } from "react";

type AlertProps = {
  type: AlertType;
  content?: string;
  onClose?: () => void;
  isVisible: boolean;
  icon?: ReactNode;
  title?: string;
  className?: string;
};

export enum AlertType {
  Danger = "red",
  Info = "blue",
  Success = "green",
  Warning = "yellow",
}

export const Alert: FC<AlertProps> = ({
  type,
  content,
  onClose,
  isVisible,
  icon,
  title,
  className,
}) => {
  const alertColors: { [key in AlertType]: string } = {
    [AlertType.Success]: "bg-green-100 border border-green-400 text-green-700",
    [AlertType.Danger]: "bg-red-100 border border-red-400 text-red-700",
    [AlertType.Warning]:
      "bg-yellow-100 border border-yellow-800 text-yellow-900",
    [AlertType.Info]: "bg-blue-100 border border-blue-400 text-blue-700",
  };

  const colorClasses = alertColors[type] || "";

  return (
    <>
      {isVisible && (
        <div
          className={`${colorClasses} px-4 py-3 rounded relative mt-2 flex w-full justify-between items-center ${className}`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <p className="text-xs truncate w-[200px] font-semibold">
                {title}
              </p>
              {content && (
                <span className="text-xs">{truncateString(content, 30)}</span>
              )}
            </div>
          </div>
          {onClose && (
            <span onClick={onClose}>
              <svg
                className={`fill-current h-6 w-6 ${colorClasses.split(" ")[0]}`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          )}
        </div>
      )}
    </>
  );
};
