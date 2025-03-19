import { faker } from '@faker-js/faker';

export class IntegerMother {
    static random(): number {
        return faker.number.int({ min: 0, max: 9999 });
      }
}
