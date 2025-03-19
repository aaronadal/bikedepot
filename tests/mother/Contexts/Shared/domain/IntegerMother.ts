import { faker } from '@faker-js/faker';

export class IntegerMother {
    static random(): number {
        return IntegerMother.between(0, 9999);
    }
    
    static between(min: number, max: number): number {
      return faker.number.int({ min, max });
    }
}
