import ConsultaFuncionario from "../../../components/consulta_funcionario";
import Header from "../../../components/Header";

const consultafuncionariopage = () => {
    return (
        <div className="Consultar ">
            <Header />
            <div className="p-6 bg-white">
                <ConsultaFuncionario /> {/* Chama o componente correto */}
            </div>
        </div>
    );
};

export default consultafuncionariopage;
