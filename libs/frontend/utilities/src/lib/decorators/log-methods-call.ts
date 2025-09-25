export function LogMethodCall(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Called: ${propertyKey} with args:`, args);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

// Example of use:
// class DemoComponent {
//   @LogMethodCall
//   doSomething(data: string) {
//     console.log('Doing something with', data);
//   }
// }
