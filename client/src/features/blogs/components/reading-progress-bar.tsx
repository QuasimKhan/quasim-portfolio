import useReadingProgress from "@/features/blogs/hooks/use-reading-progress";

const ReadingProgressBar = () => {
    const completion = useReadingProgress();

    return (
        <div className="fixed left-0 top-0 z-[9999] h-[3px] w-full bg-white/5">
            <div
                className="h-full bg-white transition-all duration-150 ease-out"
                style={{
                    width: `${completion}%`,
                }}
            />
        </div>
    );
};

export default ReadingProgressBar;
