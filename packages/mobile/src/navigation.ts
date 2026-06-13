// Simple navigation module to avoid require cycles
let currentRoute = '/';
let routeListeners = [];

export function navigate(path: string) {
  currentRoute = path;
  routeListeners.forEach((fn) => fn(path));
}

export function getCurrentRoute() {
  return currentRoute;
}

export function addRouteListener(fn: (route: string) => void) {
  routeListeners.push(fn);
  return () => {
    routeListeners = routeListeners.filter((l) => l !== fn);
  };
}
