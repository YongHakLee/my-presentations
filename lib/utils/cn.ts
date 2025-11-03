type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      if (Array.isArray(input)) {
        const inner = clsx(...input);
        if (inner) classes.push(inner);
      } else {
        for (const key in input) {
          if (input[key]) {
            classes.push(key);
          }
        }
      }
    }
  }
  
  return classes.join(' ');
}

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
