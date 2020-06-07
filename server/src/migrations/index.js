import m202006607 from './m20200607';

const migrations = [m202006607];

const up = () => {
  migrations.forEach((m) => {
    console.info(`UP: ${m.title}`);
    m.up();
  });
};

const down = () => {
  migrations.forEach((m) => {
    console.info(`DOWN: ${m.title}`);
    m.down();
  });
};

export default {
  up,
  down,
};
