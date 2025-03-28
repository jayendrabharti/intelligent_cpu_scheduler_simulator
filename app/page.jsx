"use client";

import { useState } from "react";
import ProcessTable from "@/components/ProcessTable";
import Simulation from "@/components/Simulation";
import { simulateFCFS, simulateSJF, simulateRoundRobin, simulatePriority } from "@/utils/algorithms";
import SelectAlgorithm from "@/components/SelectAlgorithm";

export default function Home(){
  
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState("fcfs");
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [simData,setSimeData] = useState(null);

  async function getSimData(){
    switch (algorithm) {
      case "fcfs":
      return simulateFCFS(processes);
    case "sjf":
      return simulateSJF(processes);
    case "rr":
      return simulateRoundRobin(processes,timeQuantum);
    case "priority":
      return simulatePriority(processes);
    default:
      alert("Invalid Algorithm");
      return {};
    }
  }
  async function simulate(){
    
    if (processes.length === 0){
      alert("Please add processes to simulate");
      return;
    };
    
    const newSimData = await getSimData();
    await setSimeData(newSimData);
    
  }
  function reset(){
    setProcesses([]);
    setSimeData(null);
  }
  function update(){
    setSimeData(null)
  }

return (
  <div className="w-full h-screen flex flex-col">
    <h1 className="text-center mt-4 text-3xl font-bold">CPU Scheduler Simulator</h1>

    
    {simData
      ?
      <Simulation
        simData={simData}
        reset={reset}
        update={update}
        processes={processes}
        timeQuantum={timeQuantum}
        algorithm={algorithm}
      />
      :
      <>
      <SelectAlgorithm
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        timeQuantum={timeQuantum}
        setTimeQuantum={setTimeQuantum}
      />
      <ProcessTable
        processes={processes}
        setProcesses={setProcesses}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        timeQuantum={timeQuantum}
        setTimeQuantum={setTimeQuantum}
        simulate={simulate}
      />
      </>
    }

  </div>
);
};
