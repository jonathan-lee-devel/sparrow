import {makeSendMail} from '../send-mail';

describe('Send Mail Util Unit Tests', () => {
  it('When make send mail Then defined function', async () => {
    const sendMail = makeSendMail(
        // @ts-ignore
        {},
        {},
        () => undefined,
        {},
    );

    expect(sendMail).toBeDefined();
    expect(sendMail).toBeInstanceOf(Function);
  });
});
