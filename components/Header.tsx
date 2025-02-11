import React from "react";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header: React.FC = () => {
    return (
        <header className="bg-[#023472] text-white p-4 flex justify-between items-center">

            <nav className="flex space-x-4 ">

                <Link href="/tela" className="hover:underline flex items-center space-x-1">
                    <i className="fa-solid fa-house"></i>
                    <span>Início</span>
                </Link>

                <Link href="/solicitar-ferias" className="hover:underline flex items-center space-x-1">
                    <i className="fa-solid fa-square-plus"></i>
                    <span>Solicitar</span>
                </Link>

                <Link href="/alterar" className="hover:underline flex items-center space-x-1">
                    <i className="fas fa-pen"></i>
                    <span>Alterar</span>
                </Link>

                <Link href="/consulta-funcionario" className="hover:underline flex items-center space-x-1">
                    <i className="fas fa-search"></i>
                    <span>Consultar</span>
                </Link>

                <Link href="/gerencia" className="hover:underline flex items-center space-x-1">
                    <i className="fas fa-sitemap"></i>
                    <span>Gerência</span>
                </Link>
                
                <Link href="/cadastro-funcionario" className="hover:underline flex items-center space-x-1">
                    <i className="fas fa-plus"></i>
                    <span>Cadastrar</span>
                </Link>
                
            </nav>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <i className="fas fa-user"></i>
                    <span>Usuário</span>
                </div>
                <Link href="/login" className="flex items-center space-x-2 hover:text-gray-300">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sair</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
