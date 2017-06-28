import { DateFormComponentProjectPage } from './app.po';

describe('date-form-component-project App', () => {
  let page: DateFormComponentProjectPage;

  beforeEach(() => {
    page = new DateFormComponentProjectPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
