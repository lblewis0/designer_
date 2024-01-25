export interface ComponentDTO {
    id: number;
    name: string;
    creationDate: string;
    lastUpdateDate: string;
    projectId: number;
    parentFolderId: number;
    isEditable: Boolean;
    isSelected: Boolean;
    isExpanded: Boolean;
}