import { FunctionComponent, ReactNode } from "react";
import { BsGrid as TemplateIcon, BsUpload as UploadIcon, BsImages as ImagesIcon} from "react-icons/bs";
import { IoShapesOutline as ShapesIcon, } from "react-icons/io5";
import { RiText as TextsIcon, } from "react-icons/ri";
export interface Menu{
    title:string,
    icon:FunctionComponent<string>,
    route:string
}

export const listMenu:Array<Menu>=[
    {
        title:"Templates",
        route:"templates",
        icon:(style)=><TemplateIcon className={style}/>
    },
    {
        title:"Shapes",
        route:"shapes",
        icon:(style)=><ShapesIcon className={style}/>
    },
    {
        title:"Images",
        route:"images",
        icon:(style)=><ImagesIcon className={style}/>
    },
    {
        title:"Texts",
        route:"texts",
        icon:(style)=><TextsIcon className={style}/>
    },
    {
        title:"Uploads",
        route:"uploads",
        icon:(style)=><UploadIcon className={style}/>
    }
]