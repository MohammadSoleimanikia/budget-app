export default function ProgressBar({progress}:{progress:number}) {
    // conditional coloring progress bar based on progress
    const color = progress < 50 ? 'bg-green-400' : progress < 70 ? 'bg-orange-400':'bg-red-400';
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
                className={`h-2.5 ${color} transition-all  duration-1000`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}
