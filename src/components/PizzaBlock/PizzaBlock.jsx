import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const PizzaBlock = React.memo(props => {
    const { id, name, imageUrl, types, sizes, price } = props.item
    const { addToCartHandler, inCart, availableTypes, availableSizes } = props
    const [curType, setCurType] = React.useState(types[0])
    const [curSize, setCurSize] = React.useState(sizes[0])

    const renderTypes = () => {
        return availableTypes.map((type, index) => {
            return (
                <li
                    key={index}
                    className={!types.includes(type.id) ? 'disable' : ''}
                    onClick={() => setCurType(type.id)}
                >
                    {type.name.split(' ')[0].toLowerCase()}
                </li>
            )
        })
    }

    const renderSizes = () => {
        return availableSizes.map((size, index) => {
            return <li
                key={index}
                className={!sizes.includes(size.id) ? 'disable' : ''}
                onClick={() => setCurSize(size.id)}
            >
                {size.size} см.
            </li>
        })
    }

    const addToCart = () => {
        addToCartHandler({
            id,
            name,
            imageUrl,
            type: availableTypes.find(type => type.id === curType),
            size: availableSizes.find(size => size.id === curSize),
            price,
            count: 1
        })
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    <div
                        id={`pizza-type-selector-${id}`}
                        className="pizza-type-selector"
                        style={{ transform: `translateX(${100 * (curType - 1)}%)` }}
                    >
                    </div>
                    {renderTypes()}
                </ul>
                <ul>
                    <div
                        id={`pizza-size-selector-${id}`}
                        className="pizza-size-selector"
                        style={
                            {
                                transform:
                                    `translateX(${100 * (curSize - 1)}%)`
                            }
                        }
                    >
                    </div>
                    {renderSizes()}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{price} ₽</div>
                <Button
                    className="button--outline button--add"
                    onClick={addToCart}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {!!inCart && <i>{inCart}</i>}
                </Button>
            </div>
        </div>
    )
})

PizzaBlock.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.number),
    sizes: PropTypes.arrayOf(PropTypes.number),
    price: PropTypes.number,
    addToCartHandle: PropTypes.func,
    inCart: PropTypes.number
}

PizzaBlock.defaultProps = {
    name: '',
    imageUrl: '',
    types: [],
    sizes: [],
    price: 0,
    inCart: 0
}

export default PizzaBlock