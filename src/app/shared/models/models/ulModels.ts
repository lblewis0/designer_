export interface sidebarUlModel
{
    Buttons: liElement[];
}

export interface liElement
{
    value: string;
    route?: string;
    isSelected: boolean;
    isExpanding: boolean;
    isContracting: boolean;
    isExpanded?: boolean;
    iconPath?: string;
    indent: number;
    childs?: liElement[];
}