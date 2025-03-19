import { IntegerMother } from "./IntegerMother";

export class MultipleMother {
    static random<T>(generator: () => T): T[] {
        return MultipleMother.between(generator, 0, 10)
    }

    static between<T>(generator: () => T, min: number, max: number): T[] {
        const quantity = IntegerMother.between(min, max);
        const items: T[] = []
        for(let i = 0; i < quantity; i++) {
          items.push(generator())
        }

        return items
    }
}
