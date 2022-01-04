import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000 // toast 停留多久
})

export const ConfirmBox = Swal.mixin({
  showConfirmButton: true,
  showCancelButton: true
})
