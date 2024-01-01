import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SideNavbar = () => {
  return (
    <div className="flex h-full flex-col px-3 md:px-2">
      <div className="fixed bottom-0 z-50 -ml-3 flex h-16 w-full flex-1 flex-row justify-evenly space-x-2 border-t bg-white p-2 md:relative md:ml-0 md:h-full md:flex-col md:justify-between md:space-x-0 md:space-y-2 md:border-none dark:bg-neutral-950">
        <Logo />
        <NavLinks />
      </div>
    </div>
  );
};

export default SideNavbar;
