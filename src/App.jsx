import Books from "./components/Books"
import BooksByAuthor from "./components/BooksByAuthor"

export default function App(){
  return (
    <main>
      <Books/>
      <BooksByAuthor author={'Sheryl Sandberg'}/>
      <BooksByAuthor author={'Phil Knight'}/>
    </main>
  )
}