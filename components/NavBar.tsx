import LocaleSwitcher from "./LocaleSwitcher";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center p-4">
      <nav></nav>
      <LocaleSwitcher />
    </div>
  );
}
