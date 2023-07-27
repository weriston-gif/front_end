import Formulario from "../componets/form";
import Header from "../componets/header";
import Listagem from "../componets/listing";

export default function List() {
    return (
        <>
            <Header />
            <div className="content-container w-100">
               <Listagem />
            </div>

        </>
    );
}