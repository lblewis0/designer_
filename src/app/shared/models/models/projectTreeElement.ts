export interface ProjectTreeElement {
   id: number;
   name: string;
   isSelected: Boolean;
   isExpanded?: Boolean;
   iconPath: string;
   indent: number;
   type: string;
   childs?: ProjectTreeElement[];
}