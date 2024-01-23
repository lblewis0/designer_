export interface ComponentTreeElementDTO {
    id: number;
    name: string;
    creationDate: string;
    lastUpdateDate: string;
    projectId: number;
    parentFolderId: number;
    isSelected: Boolean;
    isExpanded: Boolean;
    indent: number;
    type: string;
    children: ComponentTreeElementDTO[];
}