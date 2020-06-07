import modules from '../modules';

const title = 'convert breastLeft to breast';

function up() {
  modules.nursing.Model.find({ breastLeft: { $exists: true } }).then((docs) => {
    console.info(`> ${docs.length} affected`);
    docs.forEach(function (doc) {
      const breastLeft = doc.get('breastLeft', { strict: false });
      if (breastLeft === true) {
        doc.breast = 'left';
      } else if (breastLeft === false) {
        doc.breast = 'right';
      }
      doc.save();
    });
  });
}

function down() {
  modules.nursing.Model.find({ breast: { $exists: false } }).then((docs) => {
    console.info(`> ${docs.length} affected`);
    docs.forEach(function (doc) {
      const breast = doc.get('breast', { strict: false });
      if (breast === 'left') {
        doc.breastLeft = true;
      } else {
        doc.breastLeft = false;
      }
      doc.save();
    });
  });
}

export default {
  up,
  down,
  title,
};
