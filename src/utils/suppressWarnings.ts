/**
 * Suppress known deprecation warnings from third-party libraries
 * This only runs in development mode
 */

if (import.meta.env.DEV) {
  const originalWarn = console.warn;
  
  console.warn = (...args: any[]) => {
    // Suppress THREE.Clock deprecation warning from React Three Fiber
    // This is a known issue in @react-three/fiber that will be fixed in future versions
    const message = args[0];
    if (
      typeof message === 'string' && 
      message.includes('THREE.Clock') && 
      message.includes('deprecated')
    ) {
      return;
    }
    
    // Call original warn for all other warnings
    originalWarn.apply(console, args);
  };
}
