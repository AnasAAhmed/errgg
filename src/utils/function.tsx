import toast from "react-hot-toast";
export const CopyText = ({ text, heading }: { text: any, heading?: string }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Text Copied")
            })
            .catch(err => {
                toast.success('Could not copy text: ', err);
            });
    }

    return (
        <abbr title="Copy" className="flex no-underline">
            <span className="text-black">{heading && heading} </span>
            <button className="hover:text-blue-600  text-blue-400" onClick={copyToClipboard}>
                {text}
            </button>
        </abbr>
    );
}


export const calculateTimeDifference = (reviewDate: number) => {
    const currentDate = new Date().getTime();
    const reviewDateTime = new Date(reviewDate).getTime();
    const difference = currentDate - reviewDateTime;

    // Calculate time difference in minutes
    const minutesDifference = Math.floor(difference / (1000 * 60));
    // If difference is less than 0 minutes, show in minutes
    if (minutesDifference === 0) {
        return `just now`;
    }
    // If difference is less than 60 minutes, show in minutes
    if (minutesDifference < 60) {
        return `${minutesDifference} min ago`;
    }

    // If difference is less than 24 hours, show in hours
    const hoursDifference = Math.floor(minutesDifference / 60);
    if (hoursDifference < 24) {
        return `${hoursDifference} hr ago`;
    }

    // Otherwise, show in days
    const daysDifference = Math.floor(hoursDifference / 24);
    if (daysDifference < 7) {
        return `${daysDifference}d ago`;
    }
    // Otherwise, show in weeks

    const weekDifference = Math.floor(daysDifference / 7);
    if (weekDifference < 4) {
        return `${weekDifference}w ago`;
    }

    const monthDifference = Math.floor(weekDifference / 4);
    return `${monthDifference} mth ago`;
}