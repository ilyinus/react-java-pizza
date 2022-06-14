import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Categories, SortPopup, PizzaBlock, PizzaLoader, Pagination } from '../components/index'
import { fetchPizzas, fetchPizzaTypes, fetchPizzaSizes, changePage } from '../redux/actions/pizzas'
import { setSorting, setSortBy } from '../redux/actions/filters'
import { addToCart } from '../redux/actions/cart'

export default function Home() {
    const dispatch = useDispatch()

    const store = useSelector(({ pizzas, filters, cart }) => {
        return {
            pizzas: pizzas.items,
            pagination: pizzas.pagination,
            availableTypes: pizzas.availableTypes,
            availableSizes: pizzas.availableSizes,
            isPizzasLoaded: pizzas.isLoaded,
            category: filters.category,
            sorting: filters.sorting,
            sortBy: filters.sortBy,
            cartItemsCount: cart.itemsCount
        }
    })

    const getParams = () => {
        return '?order=' + store.sorting
            + '&' + store.sortBy
            + (store.category.id === 0 ? '' : '&category=' + store.category.id)
            + '&page=' + store.pagination.curPage
    }

    React.useEffect(() => {
        dispatch(fetchPizzas(getParams()))
        // eslint-disable-next-line
    }, [store.category, store.sorting, store.sortBy])

    React.useEffect(() => {
        dispatch(fetchPizzaTypes())
        dispatch(fetchPizzaSizes())
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

    const pageHandler = page => {
        dispatch(changePage(page))
        dispatch(fetchPizzas(getParams()))
    }

    const renderPizzas = () => {
        if (store.isPizzasLoaded) {
            return store.pizzas.map((item) => {
                return <PizzaBlock
                    key={item.id}
                    item={item}
                    availableTypes={store.availableTypes}
                    availableSizes={store.availableSizes}
                    addToCartHandler={addToCartHandler}
                    inCart={!store.cartItemsCount[item.id]
                        ? 0
                        : store.cartItemsCount[item.id].count
                    }
                />
            })
        } else {
            return Array(8).fill(0).map((_, index) => {
                return <PizzaLoader key={index} />
            })
        }
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <SortPopup
                    sorting={store.sorting}
                    handler={onSelectSorting}
                    sortBy={store.sortBy}
                    sortByHandler={onSelectSortBy}
                />
            </div>
            <h2 className="content__title">{store.category.name}</h2>
            <div className="content__items">
                {renderPizzas()}
            </div>
            {store.isPizzasLoaded && <Pagination pag={store.pagination} handler={pageHandler} />}
        </div>
    )
}