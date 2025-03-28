import { motion } from "framer-motion";

export default function GanttChart({ ganttData = [], totalRunningTime = 0 }) {
    
    const normalizedData = ganttData.map((segment) => ({
        ...segment,
        arrivalTime: Number(segment.arrivalTime),
        burstTime: Number(segment.burstTime),
        startTime: Number(segment.startTime),
        endTime: Number(segment.endTime),
      }));
    
      // Recalculate total running time
      const recalculatedTotalRunningTime = Math.max(
        ...normalizedData.map((segment) => segment.endTime)
      );

    // Calculate the width percentage for each segment based on its duration
    const calculateWidthPercentage = (startTime, endTime) => {
        return ((endTime - startTime) / recalculatedTotalRunningTime) * 100;
    };

    return (
        <motion.div
            className="w-full relative border border-gray-800 flex flex-row mb-6"
            variants={{
                hidden: { width: 0 },
                visible: { width: "100%" },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
            role="region"
            aria-label="Gantt Chart"
        >
            {/* Start time label */}
            <span className="absolute top-full text-white left-0">0</span>

            {normalizedData.map((segment, index) => {
                const widthPercentage = calculateWidthPercentage(segment.startTime, segment.endTime);

                return (
                    <div
                        key={index}
                        className="flex items-center justify-center text-black py-4 border-x h-full border-black relative"
                        style={{
                            backgroundColor: segment.color || "#444",
                            width: `${widthPercentage}%`,
                        }}
                        role="listitem"
                        aria-label={`Task ${segment.name} from ${segment.startTime} to ${segment.endTime}`}
                    >
                        {segment.name}
                        {/* End time label */}
                        <span className="absolute bottom-0 right-0 text-white translate-y-full">
                            {segment.endTime}
                        </span>
                    </div>
                );
            })}
        </motion.div>
    );
}
