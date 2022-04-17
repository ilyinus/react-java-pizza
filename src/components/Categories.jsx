import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../redux/actions/categories'
import { changePage } from '../redux/actions/pizzas'
import { setCategory } from '../redux/actions/filters'

export default React.memo(() => {
    const categories = useSelector(({ categories, filters }) => {
        return {
            items: categories.items,
            active: filters.category,
            isLoaded: categories.isLoaded
        }
    })
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchCategories())
        // eslint-disable-next-line
    }, [])

    const renderItems = () => {
        return categories.items.map((item, index) => {
            return (
                <li
                    key={`${item}_${index}`}
                    className={index === categories.active.id ? 'active' : ''}
                    onClick={() => {
                        dispatch(changePage(1))
                        dispatch(setCategory(item))
                    }}
                >
                    {item.name}
                </li>
            )
        })
    }

    return (
        <div className="categories" >
            <ul>
                {renderItems()}
            </ul>
        </div>
    )
})