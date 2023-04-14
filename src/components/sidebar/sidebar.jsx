import { useDispatch, useSelector } from 'react-redux';

import { changeCheckbox } from '../../store/appSlice';

import styles from './sidebar.module.scss';

function SideBar() {
  const checkboxes = useSelector((state) => state.checkboxes);
  const dispatch = useDispatch();

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebar_title}>Количество пересадок</h3>
      <ul>
        {checkboxes.map((checkbox) => {
          return (
            <li key={checkbox.id} className={styles.sidebar_item}>
              <input
                type="checkbox"
                className={styles.sidebar_checkbox}
                checked={checkbox.checked}
                onChange={() => dispatch(changeCheckbox(checkbox.id))}
              />
              {checkbox.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default SideBar;
