export default function ProgressBar({progress}:{progress:number}) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
                className={`h-2.5 bg-blue-500 transition-all duration-300`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}
