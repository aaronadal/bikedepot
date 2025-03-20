import { InvalidArgumentError } from "./error/InvalidArgumentError";

export class PrimitiveExtractor {
    static for(data: unknown) {
        return new PrimitiveExtractor(data)
    }

    private constructor(
        private readonly data: unknown,
    ) {
    }

    nonEmptyString(keys: string|string[]): string {
        const [keyPath, value] = this.resolve(keys)
        
        if (typeof value !== 'string') {
            throw new InvalidArgumentError(`Value at <${keyPath}> is not a string`);
        }
        
        if (value.trim() === '') {
            throw new InvalidArgumentError(`Value at <${keyPath}> is empty`);
        }
        
        return value;
    }

    private resolve(keys: string|string[]): [string, unknown] {
        const keysArray = Array.isArray(keys) ? keys : [keys];
        if (keysArray.length === 0) {
            throw new InvalidArgumentError('At least one key is required');
        }
        
        let value: any = this.data;
        const keyPath: string[] = [];
        
        for (const key of keysArray) {
            keyPath.push(key);
            
            if (value === undefined || value === null) {
                throw new InvalidArgumentError(`Property at ${keyPath.join('.')} does not exist`);
            }
            
            value = value[key];
        }

        return [keyPath.join('.'), value]
    }
}
