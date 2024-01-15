export interface Project {
    id: number | undefined;
    name: string;
    creationDate: string;
    lastUpdateDate: string;
    userId: number | undefined;
    isEditable: Boolean;
}