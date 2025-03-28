export default function SelectAlgorithm({algorithm, setAlgorithm, timeQuantum, setTimeQuantum}){
return(
<div className="flex flex-row m-4">

    <div className={`flex flex-row justify-end items-center transition-all duration-300 ${algorithm !== "rr" ? "opacity-0" : "opacity-100"}`}>
    <label>Time Quantum :</label>
        <input
            disabled={algorithm !== "rr"} 
            type="number"
            min="1"
            className="p-2 m-2 focus:outline-none border-b focus:border-blue-500 border-transparent w-44"
            value={timeQuantum}
            onChange={(e) => setTimeQuantum(e.target.value)}
            placeholder="Time Quantum"
        />
    </div>


    <div className="flex flex-row items-center ml-auto">
                <label className="font-medium">Algorithm :</label>
                <select
                    className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                >
                    <option value="fcfs" className="bg-black">First Come First Serve</option>
                    <option value="sjf" className="bg-black">Shortest Job First</option>
                    <option value="priority" className="bg-black">Priority</option>
                    <option value="rr" className="bg-black">Round Robin</option>
                </select>
                
    </div>
    
</div>
)
}
