type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  const color =
    progress < 50
      ? "bg-green-500"
      : progress < 80
      ? "bg-orange-400"
      : "bg-red-500";

  return (
    <div dir="ltr"
      className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200"
      role="progressbar"
      aria-valuenow={Math.round(normalizedProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className={`h-full ${color} transition-all duration-700 `}
        style={{ width: `${normalizedProgress}%` }}
      />
    </div>
  );
}