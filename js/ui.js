const ui = {

  openBottomSheet() {
    document
      .getElementById('sheetOverlay')
      .classList.add('active');

    document
      .getElementById('orderSheet')
      .classList.add('active');
  },

  closeBottomSheet() {
    document
      .getElementById('sheetOverlay')
      .classList.remove('active');

    document
      .getElementById('orderSheet')
      .classList.remove('active');
  }

};

window.ui = ui;

const overlay = document.getElementById('sheetOverlay');

if (overlay) {
  overlay.addEventListener('click', () => {
    ui.closeBottomSheet();
  });
}
