import LS from 'wyp-ls';

const ls = new LS({
  type: 'localStorage',
  expries: 3000, // 秒
  prefix: 'wyp-',
  isEncrypt: true,
});

ls.setItem('name', 'wyp');
console.log(ls.getItem('name'));
