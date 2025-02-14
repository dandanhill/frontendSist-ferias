import SolicitarFerias from "../../../components/solicitacao_ferias";
import Header from "../../../components/Header";

const SolicitarFeriasPage = () => {
    return (
        <div className="Ferias">
            <Header />
            <div className="p-6 bg-white">
                <SolicitarFerias /> {/* Chama o componente correto */}
            </div>
        </div>
    );
};

export default SolicitarFeriasPage;

