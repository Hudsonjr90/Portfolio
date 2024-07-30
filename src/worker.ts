// worker.ts
self.onmessage = function(event: MessageEvent) {
    const { task, data } = event.data;
  
    if (task === 'processData') {
      const result = processData(data);
      self.postMessage(result);
    }
  };
  
  function processData(data: number[]): number {
    // Simula uma tarefa intensiva
    let result = 0;
    for (let i = 0; i < data.length; i++) {
      result += data[i];
    }
    return result;
  }
  