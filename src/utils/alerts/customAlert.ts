import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const Toast = MySwal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export const Alert = MySwal.mixin({
    position: "center",
    showConfirmButton: false,
    showCloseButton: true
});

export const PopUp = MySwal.mixin({
    showConfirmButton: true,
    showCancelButton: true
});

export const Modal = MySwal.mixin({
    position: "center",
    showCloseButton: true,
    showConfirmButton: false
});