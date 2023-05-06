import { useEffect, useState } from "react";

export const FormItemsView = ({handler}) => {
  const [formItemsState, setFormItemsState] = useState({
    product: "",
    price: "",
    quantity: "",
  });

  const { product, price, quantity } = formItemsState;

  useEffect(() => {
    //console.log("el precio cambio");
  }, [price]);

  useEffect(() => {
    //console.log("el formulario cambio");
  }, [formItemsState]);

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

    handler(formItemsState);

    setFormItemsState({
      product: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <>
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
    </>
  );
};
