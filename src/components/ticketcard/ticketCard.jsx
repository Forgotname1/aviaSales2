import { format } from 'date-fns';

import styles from './ticketCard.module.scss';

function TicketCard({ ticket }) {
  const { price, carrier, segments } = ticket;
  const transfer = (arrayStops) => {
    if (!arrayStops.length) {
      return 'пересадки';
    } else if (arrayStops.length === 1) {
      return `${arrayStops.length} пересадка`;
    } else if (arrayStops.length < 3) {
      return `${arrayStops.length} пересадки`;
    }
  };
  return (
    <li className={styles.ticket}>
      <header className={styles.ticket_header}>
        <span className={styles.ticket_price}>{price.toLocaleString()} Р</span>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="логотип компании" />
      </header>
      <table className={styles.ticket_table}>
        <thead>
          <tr>
            <th>
              {segments[0].origin} - {segments[0].destination}
            </th>
            <th>В пути</th>
            <th>{transfer(segments[0].stops)}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {format(Date.parse(segments[0].date), 'HH:mm')} -
              {format(new Date(Date.parse(segments[0].date) + segments[0].duration * 60000), 'HH:mm')}
            </td>
            <td>{`${Math.floor(segments[0].duration / 60)}ч ${segments[0].duration % 60}м`}</td>
            <td>{segments[0].stops.length ? segments[0].stops.map((item) => item).join(', ') : 'Без пересадок'}</td>
          </tr>
        </tbody>
      </table>
      <table className={styles.ticket_table}>
        <thead>
          <tr>
            <th>
              {segments[1].origin} - {segments[1].destination}
            </th>
            <th>В пути</th>
            <th>{transfer(segments[1].stops)}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {format(Date.parse(segments[1].date), 'HH:mm')} -
              {format(new Date(Date.parse(segments[1].date) + segments[1].duration * 60000), 'HH:mm')}
            </td>
            <td>{`${Math.floor(segments[1].duration / 60)}ч ${segments[1].duration % 60}м`}</td>
            <td>{segments[1].stops.length ? segments[1].stops.map((item) => item).join(', ') : 'Без пересадок'}</td>
          </tr>
        </tbody>
      </table>
    </li>
  );
}

export default TicketCard;
