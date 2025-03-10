import Link from "next/link";

export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Link href="/">
          <a>STALUMO</a>
        </Link>
      </div>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link href="/">
              <a>Strona Główna</a>
            </Link>
          </li>
          <li style={liStyle}>
            <Link href="/o-nas">
              <a>O Nas</a>
            </Link>
          </li>
          <li style={liStyle}>
            <Link href="/projekty">
              <a>Projekty</a>
            </Link>
          </li>
          <li style={liStyle}>
            <Link href="/galeria">
              <a>Galeria</a>
            </Link>
          </li>
          <li style={liStyle}>
            <Link href="/kontakt">
              <a>Kontakt</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div style={languageStyle}>
        <span>PL</span> | <span>DE</span> | <span>EN</span>
      </div>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "#fff",
};

const logoStyle = {
  fontSize: "1.5em",
  fontWeight: "bold",
};

const navStyle = {
  flexGrow: 1,
  textAlign: "center",
};

const ulStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  justifyContent: "center",
};

const liStyle = {
  margin: "0 15px",
};

const languageStyle = {
  fontSize: "0.9em",
};
