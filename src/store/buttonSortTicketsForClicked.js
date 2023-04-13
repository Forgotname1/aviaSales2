export const buttonSortTicketsForClicked = (state) => {
  state.filters.forEach((button) => {
    if (button.text === 'самый дешевый' && button.clicked) {
      state.tickets.sort((a, b) => a.ticket.price - b.ticket.price);
    }
    if (button.text === 'самый быстрый' && button.clicked) {
      state.tickets.sort(
        (a, b) =>
          a.ticket.segments[0].duration +
          a.ticket.segments[1].duration -
          (b.ticket.segments[0].duration + b.ticket.segments[0].duration)
      );
    }
    if (button.text === 'оптимальный' && button.clicked) {
      state.tickets.sort((a, b) => {
        return (
          a.ticket.price - b.ticket.price ||
          a.ticket.segments[0].duration +
            a.ticket.segments[1].duration -
            (b.ticket.segments[0].duration + b.ticket.segments[0].duration)
        );
      });
    }
  });
};
