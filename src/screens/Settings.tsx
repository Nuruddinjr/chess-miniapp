import Link from "next/link";

export const Settings = () => {
  return (
    <div className="max-w-full mt-0">
      <h2 className="text-xl font-bold">Settings</h2>

      <div className="flex mt-8 gap-16">
        <div className="">
          <Link className="flex gap-2 items-center" href="themes">
            <img src="/theme.svg" className="w-8 h-8" alt="icon" />
            <span>Themes</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
