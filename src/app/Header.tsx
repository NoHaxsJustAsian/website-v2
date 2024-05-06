import { TypeAnimation } from "react-type-animation";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-bold pb-4">Win Tongtawee</h1>
        <h1 className="mb-4 text-3xl font-semibold text-white">
          <span>Hi, I am </span>
          <span className="text-[#64ffda]">
            <TypeAnimation
              sequence={[
                "Win",
                2000,
                " a developer",
                1000,
                " a student @ Northeastern",
                1000,
                " a gamer",
                1000,
                " searching for Fall 2024 Positions",
                1000,
              ]}
              wrapper="span"
              speed={27}
              style={{ fontSize: "1em", display: "inline-block" }}
              repeat={Infinity}
            />{" "}
            <br />
          </span>
          <span className="text-white/60 text-2xl">
            Passionate about building things.
          </span>
        </h1>
        <nav>
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <a className="group flex items-center py-3 active" href="#about">
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                  About
                </span>
              </a>
            </li>
            <li>
              <a
                className="group flex items-center py-3 active"
                href="#projects"
              >
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                  Projects
                </span>
              </a>
            </li>
            <li>
              <a className="group flex items-center py-3 active" href="#experience">
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                  Experience
                </span>
              </a>
            </li>
            <li>
              <a className="group flex items-center py-3 active" href="#more">
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                  Outside of coding
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <p>Additional Sidebar Content</p>
      </div>
    </header>
  );
}
