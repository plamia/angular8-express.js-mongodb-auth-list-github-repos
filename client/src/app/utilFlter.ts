import {ClrDatagridStringFilterInterface} from "@clr/angular";

export interface Field {
    node: object;
}

export class NameTypeFilter implements ClrDatagridStringFilterInterface<Field> {
    accepts(repo: Field, search: string):boolean {
        return "" + repo.node['name'] == search
         || repo.node['name'].toLowerCase().indexOf(search) >= 0;
        }
}
