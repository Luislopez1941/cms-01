import React, { useState } from 'react'
import './Sidebar.css'
import astra from '../../assets/astra.svg'
import { Link } from 'react-router-dom'
import { PrivateRoutes } from '../../models/routes'
import { useDispatch } from 'react-redux'
import { resetUser } from '../../redux/state/user';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState<boolean>(false)

    const sidebar = () => {
        setCollapsed(!collapsed)
    }

    const handleLogout = () => {
        dispatch(resetUser());

      };
      

    

    return (
        <nav className={`sidebar ${collapsed? 'collapsed' : ''}`}>
            <div className="sidebar-top-wrapper">
                <div className="sidebar-top">
                    <a href="#" className="logo__wrapper">
                        <img src={astra} alt="Logo" className="logo-small" />
                        <span className="hide">
                            Astra
                        </span>
                    </a>
                </div>
                <div className="expand-btn" onClick={sidebar}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
                            stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="sidebar-links">
                <h2>Main</h2>
                <ul>
                    <li>
                        <a href="#dashboard" title="Dashboard" className="tooltip">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M560-600q-17 0-28.5-11.5T520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560ZM160-440q-17 0-28.5-11.5T120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160Zm400 320q-17 0-28.5-11.5T520-160v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560Zm-400 0q-17 0-28.5-11.5T120-160v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160Z"/></svg>
                            <span className="link hide">Dashboard</span>
                            <span className="tooltip__content">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <Link to={PrivateRoutes.ADMINISTRATOR} title="Payments" className="tooltip">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Z"/></svg>
                            <span className="link hide">Administradores</span>
                            <span className="tooltip__content">Administradores</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#analytics" title="Analytics" className="tooltip">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M40-272q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240v-32Zm698 112q11-18 16.5-38.5T760-240v-40q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v40q0 33-23.5 56.5T840-160H738ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Z"/></svg>
                            <span className="link hide">Clientes</span>
                            <span className="tooltip__content">Clientes</span>
                        </a>
                    </li>
                    <li>
                        <Link to={PrivateRoutes.PRODUCTS} title="Products" className="tooltip">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M440-91v-366L120-642v321q0 22 10.5 40t29.5 29L440-91Zm80 0 280-161q19-11 29.5-29t10.5-40v-321L520-457v366Zm159-550 118-69-277-159q-19-11-40-11t-40 11l-79 45 318 183ZM480-526l119-68-317-184-120 69 318 183Z"/></svg>
                            <span className="link hide">Products</span>
                            <span className="tooltip__content">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={PrivateRoutes.CATEGORIES} title="Reports" className="tooltip">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="m297-581 149-243q6-10 15-14.5t19-4.5q10 0 19 4.5t15 14.5l149 243q6 10 6 21t-5 20q-5 9-14 14.5t-21 5.5H331q-12 0-21-5.5T296-540q-5-9-5-20t6-21ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-60v-240q0-17 11.5-28.5T160-420h240q17 0 28.5 11.5T440-380v240q0 17-11.5 28.5T400-100H160q-17 0-28.5-11.5T120-140Z"/></svg>
                            <span className="link hide">Categorias</span>
                            <span className="tooltip__content">Categorias</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#users" title="Users" className="tooltip">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M480-520q150 0 255-47t105-113q0-66-105-113t-255-47q-150 0-255 47T120-680q0 66 105 113t255 47Zm0 100q41 0 102.5-8.5T701-456q57-19 98-49.5t41-74.5v100q0 44-41 74.5T701-356q-57 19-118.5 27.5T480-320q-41 0-102.5-8.5T259-356q-57-19-98-49.5T120-480v-100q0 44 41 74.5t98 49.5q57 19 118.5 27.5T480-420Zm0 200q41 0 102.5-8.5T701-256q57-19 98-49.5t41-74.5v100q0 44-41 74.5T701-156q-57 19-118.5 27.5T480-120q-41 0-102.5-8.5T259-156q-57-19-98-49.5T120-280v-100q0 44 41 74.5t98 49.5q57 19 118.5 27.5T480-220Z"/></svg>
                            <span className="link hide">Ingresos</span>
                            <span className="tooltip__content">Customers</span>
                        </a>
                    </li>
                </ul>

                <div className="sidebar-links bottom-links">
                    <h2>Settings</h2>
                    <ul>
                        <li>
                            <a href="#settings" title="Settings" className="tooltip">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm49-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>
                                <span className="link hide">Settings</span>
                                <span className="tooltip__content">Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="divider"></div>
                <div className="sidebar__profile">
                    <div className="avatar__wrapper">
                        <img className="avatar" src="assets/profile.png" alt="Joe Doe Picture" />
                        <div className="online__status"></div>
                    </div>
                    <section className="avatar__name hide">
                        <div className="user-name">Joe Doe</div>
                        <div className="email">joe.doe@atheros.ai</div>
                    </section>
                    <a href="#logout" className="logout" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="24" height="24"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M9 12h12l-3 -3"></path>
                            <path d="M18 15l3 -3"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
