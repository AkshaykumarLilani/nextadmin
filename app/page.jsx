import Link from "next/link"

const Homepage = () => {
  return (
    <div>
      <Link href={'/login'}>
        Please Login
      </Link>
    </div>
  )
}

export default Homepage