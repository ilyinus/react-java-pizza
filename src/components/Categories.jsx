import React from 'react'

export default React.memo(({ categories, active, handler }) => {
    const renderItems = () => {
        return categories.map((item, index) => {
            return (
                <li
                    key={`${item}_${index}`}
                    className={index === active ? 'active' : ''}
                    onClick={() => handler(index)}
                >
                    {item}
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