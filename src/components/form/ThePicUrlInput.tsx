import { X } from "lucide-react";
import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface ThePicUrlInputProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  img_url: string;
  editing?: boolean;
  setInputImage?: (img_url: string | null) => void;
  container_classname?: string;
}

export function ThePicUrlInput({
  img_url,
  editing,
  setInputImage,
  container_classname,
  ...props
}: ThePicUrlInputProps) {
  const [pic, setPic] = useState(img_url);
  const ref = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputImage && setInputImage(e.target.value);
    setPic(e.target.value);
  }
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center w-full rounded-lg gap-4",
        container_classname,
      )}
    >
      {typeof pic === "string" && pic.length > 0 ? (
        <div
          className=""
          onClick={() => ref.current?.className.replace("hidden", "")}
        >
          <div className=" h-fit">
            <img
              // className="aspect-square h-[200px] w-auto  object-cover md:h-auto md:w-[250px]"
              // className='border-6 h-[100px]'
              src={pic}
              height={200}
              {...props}
            />
          </div>
        </div>
      ) : null}

      {editing && (
        <div className="  flex w-full items-center justify-center">
          <input
            type="url"
            title="add your image url"
            placeholder="add image url"
            ref={ref}
            value={pic}
            className="input input-bordered border-accent input-sm w-full"
            onChange={(e) => handleChange(e)}
          />
          <X onClick={() => setPic("")} className="h-7 w-7" />
        </div>
      )}
    </div>
  );
}
