class Service {
  BASE_URL = 'https://aviasales-test-api.kata.academy/';
  ID = '';
  getTickets = async () => {
    const urlId = `${this.BASE_URL}search`;
    if (!this.ID) {
      await fetch(urlId)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Запрос id отклонен, ошибка сервера', res.status);
        })
        .then((res) => (this.ID = res.searchId));
    }
    const urlSearch = `${this.BASE_URL}tickets?searchId=${this.ID}`;
    return await fetch(urlSearch).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Билеты не получены', res.status);
    });
  };
}
const service = new Service();
export default service;
