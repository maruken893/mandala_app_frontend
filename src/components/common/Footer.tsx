const lis = [
  { href: '#', content: 'home' },
  { href: '#', content: 'about' },
  { href: '#', content: 'contact' },
];

const Footer = () => {
  return (
    <footer className="bg-orange-400 text-slate-50 relative">
      <div className="container flex items-center mx-auto px-5 py-4">
        <div>
          <small className="text-xs">&copy;2022 maruchan893</small>
        </div>
        <nav className="ml-auto">
          <ul className="flex">
            {lis.map((el) => (
              <li key={el.content} className="ml-2 sm:ml-6 text-xs sm:text-sm">
                <a href={el.href}>{el.content}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
