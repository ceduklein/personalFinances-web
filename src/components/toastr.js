import toastr from 'toastr';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function showToastr(title, msg, type) {
  toastr[type](msg, title);
}

export function alertSuccess(msg) {
  showToastr('Sucesso', msg, 'success');
}

export function alertWarning(msg) {
  showToastr('Alerta', msg, 'warning');
}

export function alertError(msg) {
  showToastr('Erro', msg, 'error');
}

export function alertInfo(msg) {
  showToastr('', msg, 'info');
}