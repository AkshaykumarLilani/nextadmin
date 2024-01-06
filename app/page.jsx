import Link from "next/link"

const Homepage = () => {
  return (
    <div className="login-button-container">
      <Link href={'/login'}>
        Please Login
      </Link>
      <div className="demo-account">
        <h5>Demo Account</h5>
        <table>
          <tr>
            <td>Username:</td>
            <td>username</td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>password</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Homepage