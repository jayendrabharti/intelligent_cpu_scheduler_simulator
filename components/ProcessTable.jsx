import { CirclePlus, Play, RotateCcw, Trash2Icon } from "lucide-react";

export default function ProcessTable({ processes, setProcesses, simulate }) {
    
    const handleProcessChange = (index, field, value) => {
        const updatedProcesses = [...processes];
        updatedProcesses[index][field] = value;
        setProcesses(updatedProcesses);
    };
    const generateRandomColor = () => {
        const hue = Math.floor(Math.random() * 360)
        return `hsl(${hue}, 70%, 80%)`;
    };
    const addNewProcess = () => {

        let maxPriority = 0;
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].priority > maxPriority) {
                maxPriority = processes[i].priority;
            }
        }

        const newProcess = {
            id: processes.length + 1,
            name: `P${processes.length + 1}`,
            arrivalTime: 0,
            burstTime: 1,
            priority: maxPriority + 1,
            color: generateRandomColor()
        };
        setProcesses([...processes, newProcess]);
    };


return (
<div className="flex flex-col border border-gray-600 rounded-md p-4 m-4 shadow-md">
            <div className="flex flex-col mb-4">
                <span className="text-2xl font-bold">Process Table</span>
                <span className="text-sm">Add and configure processes for simulation</span>
            </div>
            
    <table className="w-full table-fixed border-collapse">
    <thead>
        <tr className="bg-[#111] border-b border-[#333]">
            <th className=" p-2 text-left">Process Name</th>
            <th className=" p-2 text-left">Arrival Time</th>
            <th className=" p-2 text-left">Burst Time</th>
            <th className=" p-2 text-left">Priority</th>
            <th className=" p-2 text-left"></th>
        </tr>
    </thead>
    <tbody>
        {processes.map((process, index) => (
            <tr className=" border-b border-[#333]" key={index}>
                
                <td className="p-2 flex items-center space-x-2">
                    <span className={`p-2 rounded-full`} style={{ backgroundColor: process.color }}></span> 
                    <input
                        type="text"
                        className="p-1 focus:outline-none border-b-2 border-transparent focus:border-blue-500 max-w-full"
                        value={process.name}
                        onChange={(e) => handleProcessChange(index, "name", e.target.value)}
                    />
                </td>
                <td className="p-2">
                    <input
                        type="number"
                        className="p-1 focus:outline-none border-b-2 border-transparent focus:border-blue-500 max-w-full"
                        value={process.arrivalTime}
                        onChange={(e) => handleProcessChange(index, "arrivalTime", e.target.value)}
                    />
                </td>
                <td className="p-2">
                    <input
                        type="number"
                        className="p-1 focus:outline-none border-b-2 border-transparent focus:border-blue-500 max-w-full"
                        value={process.burstTime}
                        onChange={(e) => handleProcessChange(index, "burstTime", e.target.value)}
                    />
                </td>
                <td className="p-2">
                    <input
                        type="number"
                        className="p-1 focus:outline-none border-b-2 border-transparent focus:border-blue-500 max-w-full"
                        value={process.priority}
                        onChange={(e) => handleProcessChange(index, "priority", e.target.value)}
                    />
                </td>
                <td className="p-2">
                    <Trash2Icon 
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                            const updatedProcesses = processes.filter((_, i) => i !== index);
                            setProcesses(updatedProcesses);
                        }}
                    />
                </td>
            </tr>
        ))}
    </tbody>
    </table>

    {processes.length === 0 && (
        <p className="w-full text-center text-[#666] text-xl p-2 border-b border-[#333]">No processes yet</p>
    )}


    <div className="flex flex-row space-x-4 mt-2">
        <button 
            className="flex flex-row bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={addNewProcess}
        ><CirclePlus className="mr-2"/> Process</button>

        <button 
            className="flex flex-row bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-auto"
            onClick={() => setProcesses([])}
        ><RotateCcw className="mr-2"/>Reset</button>
        
        <button 
            className="flex flex-row bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={simulate}
        ><Play className="mr-2"/>Run Simulation</button>
    </div>
    
</div>
);
                        }
