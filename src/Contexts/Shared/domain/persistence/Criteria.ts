export type CriteriaFilter = {
    field: string;
    value: string|number;
}

export type CriteriaOrder = {
    field: string;
    order: 'asc'|'desc';
}

export class Criteria {
    constructor(
        public readonly filters: CriteriaFilter[],
        public readonly orders: CriteriaOrder[],
    ) {
    }
}
