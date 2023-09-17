import Swal from "sweetalert2";
export const utilsAlert = () => {
  const success = (title, text) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
    });
  };
  const warning = (title, text) => {
    Swal.fire({
      icon: "warning",
      title: title,
      text: text,
    });
  };
  const confirm = (title, text) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((res) => {
      if (res.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success"
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe :)",
          "error"
        );
      }
    });
  };
  return { success, warning, confirm };
};
