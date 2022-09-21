import { encrypt, decrypt } from './utils';

interface Confing {
  type: string;
  expries: number;
  prefix: string;
  isEncrypt: boolean;
}

class LS {
  private type: string;

  private expries: number;

  private prefix: string = 'data-ls-';

  private isEncrypt: boolean = false;

  constructor(confing: Confing) {
    this.type = confing.type;
    this.expries = confing.expries;
    this.prefix = confing.prefix;
    this.isEncrypt = confing.isEncrypt;
  }

  setItem(key: string, value: any, expires: number = this.expries) {
    if (typeof key !== 'string') new Error('key must be string');

    if (isNaN(expires) || expires < 0) new Error('expires must be number and greater than 0');

    if (value === null || value === undefined || value === '') {
      value = null;
    }

    let data = {
      value: this.isEncrypt ? encrypt(value) : value,
      expires,
      date: +new Date(),
    };

    key = this.prefix + key;
    console.log(this.type, key);

    window[this.type].setItem(key, JSON.stringify(data));
  }

  getItem(key: string) {
    key = this.prefix + key;

    let data = window[this.type].getItem(key);

    if (data === null) return null;

    data = JSON.parse(data);

    if (new Date().getTime() - data.date > data.expires) {
      this.remoteItem(key.slice(this.prefix.length));
      return null;
    }

    return this.isEncrypt ? decrypt(data.value) : data.value;
  }

  remoteItem(key: string) {
    key = this.prefix + key;
    window[this.type].removeItem(key);
  }

  clear() {
    window[this.type].clear();
  }
}

export default LS;

// useage
// const ls = new LS({
//   type: 'localStorage',
//   expries: 3000, // 秒
//   prefix: 'data-ls-',
//   isEncrypt: true,
// });

// ls.setItem('name', 'zhangsan');
// setTimeout(() => {
//   console.log(ls.getItem('name'));
// }, 2000);
