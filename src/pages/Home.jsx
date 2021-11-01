import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Categories, SortPopup, PizzaBlock, PizzaLoader } from '../components/index'
import { fetchPizzas } from '../redux/actions/pizzas'
import { setCategory, setSorting, setSortBy } from '../redux/actions/filters'
import { addToCart } from '../redux/actions/cart'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const sortOptions = [
    { option: 'raiting', alias: 'популярность' },
    { option: 'price', alias: 'цена' },
    { option: 'name', alias: 'наименование' },
]

export default function Home() {
    const dispatch = useDispatch()

    const store = useSelector(({ pizzas, filters, cart }) => {
        return {
            items: pizzas.items,
            isLoaded: pizzas.isLoaded,
            category: filters.category,
            sorting: filters.sorting,
            sortBy: filters.sortBy,
            cartItems: cart.items,
            cartItemsCount: cart.itemsCount
        }
    })

    React.useEffect(() => {
        const params = '?_sort='
            + store.sorting + '&_order=' + store.sortBy
            + (store.category === 0 ? '' : '&category=' + store.category)

        dispatch(fetchPizzas(params))
        // eslint-disable-next-line 
    }, [store.category, store.sorting, store.sortBy])

    const onSelectCategory = React.useCallback(index => {
        dispatch(setCategory(index))
        // eslint-disable-next-line 
    }, [])

    const onSelectSorting = React.useCallback(sorting => {
        dispatch(setSorting(sorting))
        // eslint-disable-next-line
    }, [])

    const onSelectSortBy = React.useCallback(() => {
        dispatch(setSortBy(
            store.sortBy = store.sortBy === 'asc' ? 'desc' : 'asc'
        ))
        // eslint-disable-next-line
    }, [])

    const addToCartHandler = React.useCallback(item => {
        dispatch(addToCart(item))
        // eslint-disable-next-line
    }, [])

    const renderItems = () => {
        if (store.isLoaded) {
            return store.items.map((item) => {
                return <PizzaBlock
                    key={item.id}
                    item={item}
                    addToCartHandler={addToCartHandler}
                    inCart={!store.cartItemsCount[item.id]
                        ? 0
                        : store.cartItemsCount[item.id].count
                    }
                />
            })
        } else {
            return Array(10).fill(0).map((_, index) => {
                return <PizzaLoader key={index} />
            })
        }
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categories={categories}
                    active={store.category}
                    handler={onSelectCategory}
                />
                <SortPopup
                    sortOptions={sortOptions}
                    sorting={store.sorting}
                    handler={onSelectSorting}
                    sortBy={store.sortBy}
                    sortByHandler={onSelectSortBy}
                />
            </div>
            <h2 className="content__title">{categories[store.category]}</h2>
            <div className="content__items">
                {renderItems()}
            </div>
        </div>
    )
}