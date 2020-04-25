function akLogin(options) {
  Swal.fire({
    title: "Sweet!",
    text: "Enter your e-mail address.",
    imageUrl: "https://unsplash.it/400/200",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Look up",
    showLoaderOnConfirm: true,
    preConfirm: (email) => {
      return $.ajax({
        url: "https://authknight.com/api/verify-email?email=" + email,
        dataType: "jsonp",
      })
        .then((response) => {
          if (response.status === "success") {
            return email;
          }

          throw new Error(response.message);
        })
        .catch((error) => {
          console.log(error);
          Swal.showValidationMessage(error);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((response) => {
    akVerify(response.value);
  });
}

function akVerify(email) {
  Swal.fire({
    title: "Sweet!",
    text: "Enter your verification code.",
    imageUrl: "https://unsplash.it/400/200",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Look up",
    showLoaderOnConfirm: true,
    preConfirm: (code) => {
      return $.ajax({
        url:
          "https://authknight.com/api/verify-code?code=" +
          code +
          "&email=" +
          email,
        dataType: "jsonp",
      })
        .then((response) => {
          if (response.status === "success") {
            if (email === response.data.email) {
              return "Login successful";
            }
            throw new Error("E-mail mismach");
          }
          throw new Error(response.message);
        })
        .catch((error) => {
          console.log(error);
          Swal.showValidationMessage(error);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    Swal.fire({
      title: "Success",
      text: result.value,
    });
  });
}
