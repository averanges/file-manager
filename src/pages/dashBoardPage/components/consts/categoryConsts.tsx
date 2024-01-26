import { opacityColors } from "../../../../consts/colors";

interface ICategoryTypes {
    color: string,
    name: string
}

const categoryTypes: ICategoryTypes[] = [
    {color: opacityColors.blueOpacityColor, name: "Documents"},
    {color: opacityColors.pinkOpacityColor, name: "Images"},
    {color: opacityColors.purpleOpacityColor, name: "Media & Music"},
    {color: opacityColors.orangeOpacityColor, name: "Other Files"},
]

export default categoryTypes
