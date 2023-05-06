import PropTypes from 'prop-types'

import { RowItemView } from "./RowItemView"

export const ListTableItemsView = ({title,items}) => {
    return (
        <>
          <h4>{title}</h4>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ product, price, quantity, id }) => (
                 <RowItemView key={id} product={product} price={price} quantity={quantity} />
                ))}
              </tbody>
            </table>
        </>
    )
}

ListTableItemsView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
}