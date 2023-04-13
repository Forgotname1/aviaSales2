import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle, LinearProgress } from '@mui/material';

import TicketCard from '../ticketcard/ticketCard';
import { filterTickets } from '../../store/appSlice';

import styles from './main.module.scss';

function Main() {
  const dispatch = useDispatch();
  const arrayCountTransfer = useSelector((state) => state.arrayCountTransfer);
  const tickets = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.filters);
  const checkboxes = useSelector((state) => state.checkboxes);
  const status = useSelector((state) => state.status);
  const [countTickets, setCountTickets] = useState(5);

  const filterByCheckbox = (tickets, arrayCountTransfer) => {
    return tickets.filter(
      (ticket) =>
        arrayCountTransfer.includes(ticket.ticket.segments[0].stops.length) &&
        arrayCountTransfer.includes(ticket.ticket.segments[1].stops.length)
    );
  };
  const ticketsView = filterByCheckbox(tickets, arrayCountTransfer).slice(0, countTickets);

  return (
    <div className={styles.main}>
      <ul className={styles.main_buttons}>
        {filters.map((button) => {
          return (
            <li key={button.id}>
              <button
                className={classNames(styles.main_button, {
                  [styles.main_button_active]: button.clicked,
                  [styles.main_button_first]: button.id === 1,
                  [styles.main_button_last]: button.id === 3,
                })}
                onClick={() => dispatch(filterTickets(button.id))}
              >
                {button.text}
              </button>
            </li>
          );
        })}
      </ul>
      {status === 'loading' && <LinearProgress style={{ marginBottom: '20px' }} />}
      {checkboxes.filter((checkbox) => checkbox.checked).length ? (
        <ul>
          {ticketsView.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
        </ul>
      ) : (
        <Alert severity="info">
          <AlertTitle>
            <strong>БИЛЕТЫ НЕ НАЙДЕНЫ</strong>
          </AlertTitle>
          Выберите варианты пересадок
        </Alert>
      )}
      {!!checkboxes.filter((checkbox) => checkbox.checked).length && (
        <button className={styles.main_button_more} onClick={() => setCountTickets(countTickets + 5)}>
          Показать еще 5 билетов!
        </button>
      )}
    </div>
  );
}

export default Main;
