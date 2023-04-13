import SideBar from '../sidebar/sidebar';
import Main from '../main/main';

import styles from './content.module.scss';

function Content() {
  return (
    <section className={styles.content}>
      <SideBar />
      <Main />
    </section>
  );
}
export default Content;
