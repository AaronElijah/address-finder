import "./Header.css";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="header">
      <h1 className="title">{title}</h1>
      <h3 className="subtitle">{subtitle}</h3>
      <div className="divider"></div>
    </header>
  );
};
