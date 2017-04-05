import { Ng2GameforcePage } from './app.po';

describe('ng2-gameforce App', function() {
  let page: Ng2GameforcePage;

  beforeEach(() => {
    page = new Ng2GameforcePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
