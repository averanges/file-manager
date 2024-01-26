import { opacityColors } from "../../../../consts/colors";

interface ICategoryTypes {
    color: string,
    name: string
}

const categoryTypes: ICategoryTypes[] = [
    {color: "rgba(124,161,255,0.5)", name: "Documents"},
    {color: opacityColors.pinkOpacityColor, name: "Images"},
    {color: opacityColors.purpleOpacityColor, name: "Media & Music"},
    {color: opacityColors.orangeOpacityColor, name: "Other Files"},
]

export default categoryTypes