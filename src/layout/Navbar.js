import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import logo from '../assets/ludvigs-shop-logo.png';
import ShoppingCart from '../components/ShoppingCart';

export function Navbar() {
    return (
        <nav className="nav">
            <div className='logo-title'>
                <img src={logo} alt='Ludvigs Shop Logo' id='logo' />
                <Link to="/" className="site-name">Ludvigs Shop</Link>
            </div>
            <ul className="nav-links">
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/products">Products</CustomLink>
                <CustomLink to="/contact">Contact</CustomLink>

                <ShoppingCart className="shopping-cart-icon" />
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    );
}
