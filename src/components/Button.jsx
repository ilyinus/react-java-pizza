export default function Button({ children, className, onClick }) {

    const arr = ['button']

    if (className) {
        arr.push(className)
    }

    return (
        <button className={arr.join(' ')} onClick={onClick}>
            {children}
        </button>
    )
}