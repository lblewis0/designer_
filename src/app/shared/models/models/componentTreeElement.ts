export interface ComponentTreeElement {
    id: number;
    name: string;
    creationDate: string;
    lastUpdateDate: string;
    projectId: number;
    parentFolderId: number;
    isEditable: Boolean;
    isSelected: Boolean;
    isExpanded: Boolean;
    indent: number;
    type: string;
    children: ComponentTreeElement[];
}