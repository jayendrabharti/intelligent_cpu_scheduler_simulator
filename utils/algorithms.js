// First-Come, First-Served (FCFS) Algorithm
export function simulateFCFS(processes) {
  // Sort processes by their arrival time (earliest first)
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0; // Tracks the current simulation time
  let totalTurnAroundTime = 0;
  let totalWaitingTime = 0;
  let totalIdleTime = 0;
  let totalRunningTime = 0;
  let ganttData = []; // Stores the Gantt chart data

  // Iterate through each process in the sorted order
  for (let process of processes) {
    // Determine the start time based on the current time and process arrival time
    let startTime = Math.max(currentTime, process.arrivalTime);

    // Calculate idle time if the CPU is not busy
    let idleTime = startTime - currentTime;

    // Accumulate total idle time
    totalIdleTime += idleTime;

    // Calculate end time and exit time for the process
    let endTime = startTime + process.burstTime;
    let exitTime = endTime;

    // Calculate turnaround time and waiting time
    let turnAroundTime = exitTime - process.arrivalTime;
    let waitingTime = turnAroundTime - process.burstTime;

    // Update totals for turnaround time, waiting time, and running time
    totalTurnAroundTime += turnAroundTime;
    totalWaitingTime += waitingTime;
    totalRunningTime += process.burstTime;

    // Add the process details to the Gantt chart data
    ganttData.push({
      ...process,
      idle: false, // Indicates this is not an idle interval
      startTime,
      endTime,
      exitTime,
      waitingTime,
      turnAroundTime,
    });

    // Update the current time to the end time of the current process
    currentTime = endTime;
  }

  // Calculate averages for turnaround time and waiting time
  let avgTurnAroundTime = totalTurnAroundTime / processes.length;
  let avgWaitingTime = totalWaitingTime / processes.length;

  // Insert idle intervals into the Gantt chart if there are gaps between processes
  let newGanttData = [];
  for (let i = 0; i < ganttData.length - 1; i++) {
    newGanttData.push(ganttData[i]);

    // Check if there is idle time between the current process and the next
    if (ganttData[i].endTime < ganttData[i + 1].startTime) {
      newGanttData.push({
        name: "Idle", // Indicates an idle interval
        idle: true,
        startTime: ganttData[i].endTime,
        endTime: ganttData[i + 1].startTime,
      });
    }
  }

  // Add the last process to the updated Gantt chart
  newGanttData.push(ganttData[ganttData.length - 1]);
  ganttData = newGanttData;

  // Return the results as an object
  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}
// Shortest Job First (SJF) Algorithm
export function simulateSJF(processes){
  let currentTime = 0;
  let totalTurnAroundTime = 0;
  let totalWaitingTime = 0;
  let totalIdleTime = 0;
  let totalRunningTime = 0;
  let ganttData = [];
  let remainingProcesses = [...processes];

  while (remainingProcesses.length > 0) {
    // Filter processes that have arrived
    let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    
    if (availableProcesses.length === 0) {
      // If no process has arrived yet, move to the next arrival time
      currentTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    }

    // Select process with shortest burst time
    availableProcesses.sort((a, b) => a.burstTime - b.burstTime);
    let process = availableProcesses[0];
    
    let startTime = Math.max(currentTime, process.arrivalTime);
    let idleTime = startTime - currentTime;
    totalIdleTime += idleTime > 0 ? idleTime : 0;

    let endTime = startTime + process.burstTime;
    let exitTime = endTime;
    let turnAroundTime = exitTime - process.arrivalTime;
    let waitingTime = turnAroundTime - process.burstTime;

    totalTurnAroundTime += turnAroundTime;
    totalWaitingTime += waitingTime;
    totalRunningTime += process.burstTime;

    ganttData.push({
      ...process,
      idle: false,
      startTime,
      endTime,
      exitTime,
      waitingTime,
      turnAroundTime,
    });

    currentTime = endTime;
    remainingProcesses = remainingProcesses.filter(p => p.id !== process.id);
  }

  let avgTurnAroundTime = totalTurnAroundTime / processes.length;
  let avgWaitingTime = totalWaitingTime / processes.length;

  
  let newGD = [];
  for(let i=0; i < ganttData.length-1;i++){
    newGD.push(ganttData[i]);
    if(ganttData[i].endTime != ganttData[i+1].startTime){
      newGD.push({
        idle: true,
        name: "idle",
        startTime: ganttData[i].endTime,
        endTime: ganttData[i+1].startTime
      })
    };
  };
  newGD.push(ganttData[ganttData.length -1]);
  ganttData = newGD;

  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}

// Round Robin Algorithm
export function simulateRoundRobin(processes,timeQuantum){
  let queue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  let totalTurnAroundTime = 0;
  let totalWaitingTime = 0;
  let totalIdleTime = 0;
  let totalRunningTime = 0;
  let ganttData = [];
  let remainingTime = {};

  queue.forEach(p => (remainingTime[p.id] = p.burstTime));
  let processQueue = [];

  while (queue.length > 0 || processQueue.length > 0) {
    while (queue.length > 0 && queue[0].arrivalTime <= currentTime) {
      processQueue.push(queue.shift());
    }
    
    if (processQueue.length === 0) {
      totalIdleTime++;
      currentTime++;
      continue;
    }

    let process = processQueue.shift();
    let startTime = currentTime;
    let executionTime = Math.min(timeQuantum, remainingTime[process.id]);
    currentTime += executionTime;
    remainingTime[process.id] -= executionTime;
    let endTime = currentTime;

    while (queue.length > 0 && queue[0].arrivalTime <= currentTime) {
      processQueue.push(queue.shift());
    }

    if (remainingTime[process.id] > 0) {
      processQueue.push(process);
    } else {
      let exitTime = endTime;
      let turnAroundTime = exitTime - process.arrivalTime;
      let waitingTime = turnAroundTime - process.burstTime;
      totalTurnAroundTime += turnAroundTime;
      totalWaitingTime += waitingTime;
    }

    totalRunningTime += executionTime;
    ganttData.push({
      ...process,
      idle: false,
      startTime,
      endTime,
      exitTime: endTime,
      waitingTime: Math.max(0, startTime - process.arrivalTime),
      turnAroundTime: endTime - process.arrivalTime,
    });
  }

  let avgTurnAroundTime = totalTurnAroundTime / processes.length;
  let avgWaitingTime = totalWaitingTime / processes.length;

  
  let newGD = [];
  for(let i=0; i < ganttData.length-1;i++){
    newGD.push(ganttData[i]);
    if(ganttData[i].endTime != ganttData[i+1].startTime){
      newGD.push({
        idle: true,
        name: "idle",
        startTime: ganttData[i].endTime,
        endTime: ganttData[i+1].startTime
      })
    };
  };
  newGD.push(ganttData[ganttData.length -1]);
  ganttData = newGD;

  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}

// Priority Scheduling Algorithm
export function simulatePriority(processes){
  let currentTime = 0;
  let totalTurnAroundTime = 0;
  let totalWaitingTime = 0;
  let totalIdleTime = 0;
  let totalRunningTime = 0;
  let ganttData = [];
  let remainingProcesses = [...processes];

  while (remainingProcesses.length > 0) {
    let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    
    if (availableProcesses.length === 0) {
      currentTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    }

    availableProcesses.sort((a, b) => a.priority - b.priority);
    let process = availableProcesses[0];
    
    let startTime = Math.max(currentTime, process.arrivalTime);
    let idleTime = startTime - currentTime;
    totalIdleTime += idleTime > 0 ? idleTime : 0;

    let endTime = startTime + process.burstTime;
    let exitTime = endTime;
    let turnAroundTime = exitTime - process.arrivalTime;
    let waitingTime = turnAroundTime - process.burstTime;

    totalTurnAroundTime += turnAroundTime;
    totalWaitingTime += waitingTime;
    totalRunningTime += process.burstTime;

    ganttData.push({
      ...process,
      idle: false,
      startTime,
      endTime,
      exitTime,
      waitingTime,
      turnAroundTime,
    });

    currentTime = endTime;
    remainingProcesses = remainingProcesses.filter(p => p.id !== process.id);
  }

  let avgTurnAroundTime = totalTurnAroundTime / processes.length;
  let avgWaitingTime = totalWaitingTime / processes.length;

  let newGD = [];
  for(let i=0; i < ganttData.length-1;i++){
    newGD.push(ganttData[i]);
    if(ganttData[i].endTime != ganttData[i+1].startTime){
      newGD.push({
        idle: true,
        name: "idle",
        startTime: ganttData[i].endTime,
        endTime: ganttData[i+1].startTime
      })
    };
  };
  newGD.push(ganttData[ganttData.length -1])
  ganttData = newGD;



  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}