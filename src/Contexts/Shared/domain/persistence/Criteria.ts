export type CriteriaOrder<Fields extends string> = {
    field: Fields;
    order: 'asc'|'desc';
}
