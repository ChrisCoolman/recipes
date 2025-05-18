import { FaYoutube } from "react-icons/fa6";

type InstructionsProps = {
    title: string,
    instructions: string,
    link: string,
    onClose: () => void
}


function Instructions({title, instructions, link} : InstructionsProps) {
  return (
    <div className="bg-white text-center flex-col justify-center items-center">
        <h3 className="text-orange font-bold text-center text-3xl">{title}</h3>
        <p className="text-dark-green p-4">{instructions}</p>
            <div className="self-center">
                <a href={link} className="text-center text-red-500 flex items-center justify-begin text-2xl"><FaYoutube /><p className="pl-2">Video Instructions</p></a>
            </div>
        </div>
  );
}

export default Instructions;