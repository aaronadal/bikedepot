import { Customer } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/Customer";
import { CustomerId } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerId";
import { CustomerRepository } from "../../../../../../../src/Contexts/Shop/Customer/domain/persistence/CustomerRepository";

export class CustomerRepositoryMocker {
    readonly mock: CustomerRepository;

    constructor() {
        this.mock = {
            save: jest.fn().mockResolvedValue(Promise.resolve(undefined)),
            search: jest.fn(),
            matching: jest.fn(),
            delete: jest.fn().mockResolvedValue(Promise.resolve(undefined)),
        };
    }

    found(customer: Customer): void {
        (this.mock.search as jest.Mock).mockResolvedValueOnce(Promise.resolve(customer))
    }

    notFound(): void {
        (this.mock.search as jest.Mock).mockResolvedValueOnce(null)
    }

    assertSaved(customer: Customer): void {
        const calls = (this.mock.save as jest.Mock).mock.calls;

        expect(calls.length).toBe(1)

        const args = calls[0]

        const expected = this.getData(customer)
        const actual = this.getData(args[0])

        expect(actual).toMatchObject(expected)
    }

    assertDeleted(id: CustomerId): void {
        const calls = (this.mock.delete as jest.Mock).mock.calls;

        expect(calls.length).toBe(1)

        const args = calls[0]

        expect(args[0]).toMatchObject(id)
    }

    private getData(entity: Customer): any {
        const { id, name, email, address, credit } = entity;

        return { id, name, email, address, credit }
    }
}
