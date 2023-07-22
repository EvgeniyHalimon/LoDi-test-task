import { RadioGroup } from "@headlessui/react";
import { getIconComponentByName } from "./getIconComponentByName";
import { ReactComponent as OtherIcon } from "../assets/questionnaire/other.svg";

export const RadioGroupOption = ({title, subtitle, setAnswerRadio, icon}) => {
    const Icon = getIconComponentByName(icon)
    return (
        <RadioGroup.Option
            className={`p-4 flex flex-col items-center justify-center gap-4 rounded-md bg-app-bg-gray ui-checked:outline-[2px] ui-checked:[outline-style:solid] ui-checked:outline-app-green transition-all duration-300`}
            value={title}
            onClick={() => setAnswerRadio(title)}
        >
            {!Icon ? <OtherIcon /> : <Icon />}
            <span className="text-base text-white">
                {title}
            </span>
            <span className="w-11/12 text-sm text-modal-description">
                {subtitle}
            </span>
        </RadioGroup.Option>
    )
}
