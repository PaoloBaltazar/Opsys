
function calculateWaitingTime(at, bt, n) {
  let wt = new Array(n);
  let finishTime = new Array(n);
  let turnaroundTime = new Array(n);

  wt[0] = 0;
  finishTime[0] = at[0] + bt[0];
  turnaroundTime[0] = finishTime[0] - at[0];

  let output = "Process | Arrival Time | Burst Time | Finish Time | Turnaround Time | Waiting Time\n";
  output += "--------|---------------|------------|-------------|------------------|--------------\n";
  output += `A       |      ${at[0]}       |      ${bt[0]}     |      ${finishTime[0]}      |         ${turnaroundTime[0]}          |      ${wt[0]}\n`;

  for (let i = 1; i < n; i++) {
      wt[i] = (at[i - 1] + bt[i - 1] + wt[i - 1]) - at[i];
      finishTime[i] = at[i] + bt[i] + wt[i];
      turnaroundTime[i] = finishTime[i] - at[i];

      output += `${String.fromCharCode(65 + i)}       |      ${at[i]}       |      ${bt[i]}     |      ${finishTime[i]}      |         ${turnaroundTime[i]}          |      ${wt[i]}\n`;
  }

  let averageWaitingTime;
  let averageTurnaroundTime;
  let sumWaitingTime = wt.reduce((sum, val) => sum + val, 0);
  let sumTurnaroundTime = turnaroundTime.reduce((sum, val) => sum + val, 0);

  averageWaitingTime = sumWaitingTime / n;
  averageTurnaroundTime = sumTurnaroundTime / n;

  output += `\nAverage waiting time = ${averageWaitingTime}\n`;
  output += `Average turnaround time = ${averageTurnaroundTime}\n`;

  document.querySelector('.result2-output').textContent = output;
}

function calculateRoundRobin(at, bt, n, quantum) {
  // JavaScript program for implementation of RR scheduling
  let wt = new Array(n).fill(0);
  let tat = new Array(n).fill(0);
  let total_wt = 0, total_tat = 0;

  // Function to find waiting time of all processes
  const findWaitingTime = (processes, n, bt, wt, quantum) => {
      // Make a copy of burst times bt[] to store remaining
      // burst times.
      let rem_bt = new Array(n).fill(0);
      for (let i = 0; i < n; i++)
          rem_bt[i] = bt[i];

      let t = 0; // Current time

      // Keep traversing processes in round robin manner
      // until all of them are not done.
      while (1) {
          let done = true;

          // Traverse all processes one by one repeatedly
          for (let i = 0; i < n; i++) {
              // If burst time of a process is greater than 0
              // then only need to process further
              if (rem_bt[i] > 0) {
                  done = false; // There is a pending process

                  if (rem_bt[i] > quantum) {
                      // Increase the value of t i.e. shows
                      // how much time a process has been processed
                      t += quantum;

                      // Decrease the burst_time of current process
                      // by quantum
                      rem_bt[i] -= quantum;
                  } else {
                      // Increase the value of t i.e. shows
                      // how much time a process has been processed
                      t = t + rem_bt[i];

                      // Waiting time is current time minus time
                      // used by this process
                      wt[i] = t - bt[i];

                      // As the process gets fully executed
                      // make its remaining burst time = 0
                      rem_bt[i] = 0;
                  }
              }
          }

          // If all processes are done
          if (done == true)
              break;
      }
  }

  // Function to calculate turn around time
  const findTurnAroundTime = (processes, n, bt, wt, tat) => {
      // calculating turnaround time by adding
      // bt[i] + wt[i]
      for (let i = 0; i < n; i++)
          tat[i] = bt[i] + wt[i];
  }

  // Function to calculate average time
  // Function to calculate average time
  // Function to calculate average time
  const findavgTime = (processes, n, bt, quantum) => {
      let wt = new Array(n).fill(0),
          tat = new Array(n).fill(0),
          finishTime = new Array(n).fill(0);

      // Function to find waiting time of all processes
      findWaitingTime(processes, n, bt, wt, quantum);

      // Function to find turn around time for all processes
      findTurnAroundTime(processes, n, bt, wt, tat);

      // Calculate finish time for each process
      for (let i = 0; i < n; i++) {
          finishTime[i] = tat[i] + processes[i];
      }

      // Display processes along with all details
      let output = "Job | Arrival Time | Burst Time | Finish Time | Turnaround Time | Waiting Time\n";
      output += "----|--------------|------------|--------------|------------------|--------------\n";

      for (let i = 0; i < n; i++) {
          output += `${String.fromCharCode(65 + i)}   |      ${processes[i]}       |      ${bt[i]}     |      ${finishTime[i]}      |         ${tat[i]}          |      ${wt[i]}\n`;
      }

      total_wt = wt.reduce((sum, val) => sum + val, 0);
      total_tat = tat.reduce((sum, val) => sum + val, 0);

      output += `\nAverage waiting time = ${total_wt / n}\n`;
      output += `Average turnaround time = ${total_tat / n}\n`;

      document.querySelector('.result2-output').textContent = output;
  }



  findavgTime(at, n, bt, quantum);
}

function toggleTimeQuantumInput() {
  let schedulingAlgorithm = document.getElementById('scheduling-algorithm').value;
  let timeQuantumInput = document.getElementById('time-quantum-input');

  if (schedulingAlgorithm === 'rr') {
      timeQuantumInput.style.display = 'block';
  } else {
      timeQuantumInput.style.display = 'none';
  }
}

function solveMemory() {
  let algorithm = document.getElementById('memory-algorithm').value;
  let arrivalTimeInput = document.getElementById('arrival-time-input').value;
  let burstTimeInput = document.getElementById('burst-time-input').value;

  let at = arrivalTimeInput.split(' ').map(Number);
  let bt = burstTimeInput.split(' ').map(Number);

  calculateWaitingTime(at, bt, at.length);
}

function solveScheduling() {
  let algorithm = document.getElementById('scheduling-algorithm').value;
  let arrivalTimeInput = document.getElementById('arrival-time-scheduling').value;
  let burstTimeInput = document.getElementById('burst-time-scheduling').value;

  let at = arrivalTimeInput.split(' ').map(Number);
  let bt = burstTimeInput.split(' ').map(Number);

  if (algorithm === 'fcfs') {
      calculateWaitingTime(at, bt, at.length);
  } else if (algorithm === 'rr') {
      // Get the time quantum
      let quantum = parseInt(document.getElementById('time-quantum').value);
      calculateRoundRobin(at, bt, at.length, quantum);
  }
}