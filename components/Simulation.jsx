import { Circle, CirclePlus, PencilIcon } from "lucide-react";
import GanttChart from "./GanttChart";

export default function Simulation({simData,reset,update,processes,timeQuantum,algorithm}) {

    const algorithms = {
        "fcfs": "First Come First Serve",
        "sjf": "Shortest Job First",
        "rr": "Round Robin",
        "priority": "Priority"
    }

    console.log(simData);

return (
<div>

    <div className="flex flex-row p-3 m-4 rounded gap-2">
        <span className="text-2xl font-bold">{algorithms[algorithm]}</span>
        <button
            className="flex flex-row bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-max ml-auto"
            onClick={reset}
        ><CirclePlus className="mr-2"/>New Simulation</button>
        <button
            className="flex flex-row bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-max"
            onClick={update}
        ><PencilIcon className="mr-2"/>Update Processes</button>
    </div>

    <div className="flex flex-col p-3 border border-gray-600 m-4 rounded">
        <h2 className="text-2xl font-bold mb-2">Gantt Chart</h2>

        <GanttChart 
            ganttData={simData.ganttData}
            totalRunningTime={simData.totalRunningTime}
        />

    </div>

    <div className="flex flex-col p-3 border border-gray-600 m-4 rounded">
        <h2 className="text-2xl font-bold mb-2">Performance Metrics</h2>
        <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col justify-between text-center border border-gray-600 rounded-md py-4 bg-[#111]">
                <span className="text-3xl">{simData.avgWaitingTime.toFixed(2)}</span>
                <span className="font-medium text-xs">Average Waiting Time</span>
            </div>
            <div className="flex flex-col justify-between text-center border border-gray-600 rounded-md py-4 bg-[#111]">
                <span className="text-3xl">{simData.avgTurnAroundTime.toFixed(2)}</span>
                <span className="font-medium text-xs">Average Turnaround Time</span>
            </div>
            {algorithm === "rr" && (
            <div className="flex flex-col justify-between text-center border border-gray-600 rounded-md py-4 bg-[#111]">
                <span className="text-3xl">{timeQuantum}</span>
                <span className="font-medium text-xs">Time Quantum</span>
            </div>
            )}
        </div>
    </div>

    <div className="m-4">
    <table className="min-w-full border-collapse">
            <thead>
                <tr  className="border-b border-gray-600 bg-[#111] text-left">
                    <th className="py-2 px-4">Process Name</th>
                    <th className="py-2 px-4">Arrival Time</th>
                    <th className="py-2 px-4">Burst Time</th>
                    <th className="py-2 px-4">Priority</th>
                    <th className="py-2 px-4">Exit Time</th>
                    <th className="py-2 px-4">Turn Around Time</th>
                    <th className="py-2 px-4">Waiting Time</th>
                </tr>
            </thead>
            <tbody id="table-body">
            {simData.ganttData.filter(i=>!i.idle).map((process, index) => (

                <tr 
                    className="border-b border-gray-600" 
                    key={index}
                >
                    <td className="py-2 px-4">
                        <Circle className="inline mr-2" style={{fill: process.color,stroke: process.color}}/>
                        {process.name}
                    </td>
                    <td className="py-2 px-4">{process.arrivalTime}</td>
                    <td className="py-2 px-4">{process.burstTime}</td>
                    <td className="py-2 px-4">{process.priority}</td>
                    <td className="py-2 px-4">{process.exitTime}</td>
                    <td className="py-2 px-4">{process.turnAroundTime}</td>
                    <td className="py-2 px-4">{process.waitingTime}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>

</div>
);
}
