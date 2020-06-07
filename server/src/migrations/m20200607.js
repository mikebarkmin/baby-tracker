import modules from '../modules';

function up() {
  modules.nursing.Model.find({ breastLeft: { $exists: true } }).then((docs) => {
    docs.forEach(function (doc) {
      if (doc.breastLeft === true) {
        doc.breast = 'left';
      } else if (doc.breastLeft === false) {
        doc.breast = 'right';
      }
      delete doc.breastLeft;
      doc.save();
    });
  });
}

function down() {
  modules.nursing.Model.find({ breast: { $exists: false } }).then((docs) => {
    docs.forEach(function (doc) {
      if (doc.breast === 'left') {
        doc.breastLeft = true;
      } else {
        doc.breastLeft = false;
      }
      delete doc.breast;
      doc.save();
    });
  });
}

export default {
  up,
  down,
};
