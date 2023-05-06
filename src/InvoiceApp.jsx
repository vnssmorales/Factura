import { useEffect, useState } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice";
import { ClientView } from "./components/ClienteView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListTableItemsView } from "./components/ListTableItemsView";
import { TotalView } from "./components/TotalView";
import { FormItemsView } from "./components/FormItemsView";

const invoiceInitial = {
  id: 1,
  name: "",
  client: {
    name: "",
    lastName: "",
    adress: {
      country: "",
      city: "",
      street: "",
      number: 0,
    },
  },
  company: {
    name: "",
    fiscalNumber: 0,
  },
  items: [],
};
export const InvoiceApp = () => {

  const [activeForm, setActiveForm] = useState(false);
  const [total, setTotal] = useState(0);
  const [counter, setCounter] = useState(4); //inicializamos en 4 porque ya hay 3 items, cuando empezemos a agregar productos sera desde el 4
  const [invoice, setInvoice] = useState(invoiceInitial); //siempre se necesita un estado inicial
  const [items, setItems] = useState([]);

  const { id, name, client, company } = invoice;

  useEffect(() => {
    const data = getInvoice();
    console.log(data);
    setInvoice(data);
    setItems(data.items); //para que cargue el contenido de items al inicar la app, los pasamos al estado
  }, []); //evento del ciclo de vida que se ejecuta solo 1 vez cuando se crea el componente

  useEffect(() => {
    //console.log('el contador cambio');
  }, [counter])

  useEffect(() => {
    setTotal(calculateTotal(items))
    //console.log('el total cambio');
  }, [items])

  const handlerAddItems = ({product, price, quantity}) => {

    setItems([
      ...items,
      {
        id: counter,
        product: product.trim(), //trim quita los espacios
        price: +price.trim(), //operador unario para convertir el string que viene del formulario a number
        quantity: parseInt(quantity.trim(), 10), //convertir a entero y el segundo argumento radio base 10
      },
    ]);
  
    setCounter(counter + 1);
  };

  const handlerDeleteItem = (id) => {
    setItems(items.filter( item => item.id !== id))
  }

  const onActiveForm = () => {
    setActiveForm(!activeForm); //para que haga lo contrario a lo que hay, ocultar o mostrar w
  }

  return (
    <>
      <div className="container">
        <div className="card my-3">
          <div className="card-header">Ejemplo factura</div>
          <div className="card-body">
            <InvoiceView id={id} name={name} />
            <div className="row my-3">
              <div className="col">
                <ClientView title={"Datos del Cliente"} client={client} />
              </div>
              <div className="col">
                <CompanyView title={"Datos de la Empresa"} company={company} />
              </div>
            </div>

            <ListTableItemsView
              title={"Productos de la factura"}
              items={items} handlerDeleteItem = {id => handlerDeleteItem(id)}
            />
            <TotalView total={total} />
            <button className="btn btn-secondary"
              onClick={onActiveForm}>{!activeForm ? 'Agregar Item' : 'Ocultar Form'}</button>
            {!activeForm ||  <FormItemsView handler={(newItems) => handlerAddItems(newItems) }/>}
           
          </div>
        </div>
      </div>
    </>
  );
};
