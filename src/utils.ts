// utils.ts
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout!);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
}

// utils.ts
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan = 0;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();
    if (!lastRan) {
      func.apply(context, args);
      lastRan = now;
    } else {
      clearTimeout(lastFunc!);
      lastFunc = setTimeout(function () {
        if (now - lastRan >= limit) {
          func.apply(context, args);
          lastRan = now;
        }
      }, limit - (now - lastRan));
    }
  } as T;
}
