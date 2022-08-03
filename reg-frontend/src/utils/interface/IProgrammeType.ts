
import { IProgrammeMode } from "./IProgrammeMode";

export interface IProgrammeType{
    id: number,
    index:number,
    title: string,
    abbreviation: string,
    mode:IProgrammeMode,
}