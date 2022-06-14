import { Link } from 'react-router-dom'
import emptyCart from '../../assets/img/empty-cart.png'
import { Button } from '../../components'

const EmptyCart = () => (
    <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
            Вероятней всего, вы не заказывали ещё пиццу.<br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyCart} alt="Empty cart" />

        <Link to="/">
            <Button className="button--black">
                <span>Вернуться назад</span>
            </Button>
        </Link>

    </div>
)

export default EmptyCart