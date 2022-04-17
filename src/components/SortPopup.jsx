import React from 'react'

const sortOptions = [
    { option: 'raiting', alias: 'популярность' },
    { option: 'price', alias: 'цена' },
    { option: 'name', alias: 'наименование' },
]

export default React.memo(({ sorting, handler, sortBy, sortByHandler }) => {
    const [popUp, setPopup] = React.useState(false)
    const ref = React.useRef()

    React.useEffect(() => {
        const listener = (event) => {
            if (!event.path.includes(ref.current)) {
                setPopup(false)
            }
        }
        document.addEventListener('click', listener)

        return () => document.removeEventListener('click', listener)

        // eslint-disable-next-line
    }, [])

    const togglePopup = () => {
        setPopup(!popUp)
    }

    const onSelectSort = option => {
        setPopup(false)
        handler(option)
    }

    const renderSortOptions = () => {
        return sortOptions.map((item, index) => {
            return <li
                key={`${item.option}_${index}`}
                className={item.option === sorting ? 'active' : ''}
                onClick={() => onSelectSort(item.option)}
            >
                {item.alias}
            </li>
        })
    }

    return (
        <div ref={ref} className="sort">
            <div className="sort__label">
                <svg
                    className={sortBy}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={sortByHandler}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={togglePopup}>
                    {sortOptions.find(item => item.option === sorting).alias}
                </span>
            </div>
            {popUp &&
                <div className="sort__popup">
                    <ul>
                        {renderSortOptions()}
                    </ul>
                </div>
            }
        </div>
    )

})