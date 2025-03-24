import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.contentContainer}>
        <Header />
        <div className={styles.mainContainer}>
          <SideBar />
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
