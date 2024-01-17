export interface ProjectDTO {
    id: number;
    name: string;
    creationDate: string;
    lastUpdateDate: string;
    userId: number | undefined;
    isEditable: Boolean;
}