export type Dept = {
    id: string;
    name: string;
    label: string;
    children: Dept[]
}