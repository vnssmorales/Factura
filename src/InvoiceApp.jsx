import { useEffect, useState } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice";
import { ClientView } from "./components/ClienteView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListTableItemsView } from "./components/ListTableItemsView";
import { TotalView } from "./components/TotalView";

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

  const [total, setTotal] = useState(0);
  const [counter, setCounter] = useState(4); //inicializamos en 4 porque ya hay 3 items, cuando empezemos a agregar productos sera desde el 4
  const [invoice, setInvoice] = useState(invoiceInitial); //siempre se necesita un estado inicial
  const [items, setItems] = useState([]);

  const [formItemsState, setFormItemsState] = useState({
    product: "",
    price: "",
    quantity: "",
  });

  const { id, name, client, company } = invoice;

  const { product, price, quantity } = formItemsState;

  useEffect(() => {
    const data = getInvoice();
    console.log(data);
    setInvoice(data);
    setItems(data.items); //para que cargue el contenido de items al inicar la app, los pasamos al estado
  }, []); //evento del ciclo de vida que se ejecuta solo 1 vez cuando se crea el componente

  useEffect(() => {
      console.log('el precio cambio');
  }, [price])

  useEffect(() => {
    console.log('el formulario cambio');
  }, [formItemsState])

  useEffect(() => {
    console.log('el contador cambio');
  }, [counter])

  useEffect(() => {
    setTotal(calculateTotal(items))
    console.log('el total cambio');
  }, [items])


  const onInputChange = ({ target: { name, value } }) => {
    console.log(value);
    setFormItemsState({
      ...formItemsState,
      [name]: value,
    });
  };

  const onInvoiceItemsSubmit = (event) => {
    event.preventDefault();
    //validación para el formulario
    if (product.trim().length <= 1) return;
    if (price.trim().length <= 1) return;
    if (isNaN(price.trim())) {
      alert("Error, el precio no es un número");
      return;
    }
    if (quantity.trim().length < 1) return;
    if (isNaN(quantity.trim())) {
      alert("Error, la cantidad no es un número");
      return;
    }

    setItems([
      ...items,
      {
        id: counter,
        product: product.trim(), //trim quita los espacios
        price: +price.trim(), //operador unario para convertir el string que viene del formulario a number
        quantity: parseInt(quantity.trim(), 10), //convertir a entero y el segundo argumento radio base 10
      },
    ]);
    setFormItemsState({
      product: "",
      price: "",
      quantity: "",
    });
    setCounter(counter + 1);
  };

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
              items={items}
            />
            <TotalView total={total} />
            <form className="w-50" onSubmit={onInvoiceItemsSubmit}>
              <input
                type="text"
                name="product"
                value={product} //se asigna el value para poder limpiar el imput al agregar un producto nuevo
                placeholder="Producto"
                className="form-control m-3"
                onChange={(event) => onInputChange(event)}
              />
              <input
                type="text"
                name="price"
                value={price}
                placeholder="Precio"
                className="form-control m-3"
                onChange={onInputChange} //lo mismo que en product pero simplificado
              />
              <input
                type="text"
                name="quantity"
                value={quantity}
                placeholder="Cantidad"
                className="form-control m-3"
                onChange={onInputChange}
              />

              <button type="submit" className="btn btn-primary m-3">
                Nuevo item
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
