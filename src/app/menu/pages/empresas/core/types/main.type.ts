export type adminPopUpType = 'crear' | 'editar';
export type adminPopUp<T> = { tipo: adminPopUpType; campo?: T };
