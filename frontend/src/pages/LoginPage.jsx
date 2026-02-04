import LoginForm from "../components/LoginForm"
import styles from "./LoginPage.module.scss"

export const LoginPage = () => {
  return (
    <main>
      <div className={styles.form}>
        <LoginForm />
      </div>
    </main>
  )
}
export default LoginPage