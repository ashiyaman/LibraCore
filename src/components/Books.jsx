import useFetch from "../useFetch"

const Books = () => {
    const { data, loading, error } = useFetch('http://localhost:3000/books')
   
    return (
        <div>
            <h2>All Books</h2>
            <ul>
                {data?.map(book => (
                    <li>{book.title}</li>
                ))}
            </ul>
        </div>
    )
}


export default Books