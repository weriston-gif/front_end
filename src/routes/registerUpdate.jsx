import Header from "../componets/header";
import FormularioEdicao from "../componets/form-update";

export default function Register() {
    return (
        <>
            <Header />
            <div className="content-container w-100">
                <FormularioEdicao />
            </div>

        </>
    );
}