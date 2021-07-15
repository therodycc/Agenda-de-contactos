const app = new Vue({
  el: "#app",

  data: {
    contacts: [],
    txtName: "",
    txtPhone: "",
    txtEmail: "",
    txtSearch: "",
  },
  methods: {
    clearInputs() {
      this.txtName = "";
      this.txtPhone = "";
      this.txtEmail = "";
    },

    addContact() {
      if (this.txtName === "" || this.txtPhone === "" || this.txtEmail === "") {
        Swal.fire({
          icon: "info",
          title: "Por favor",
          text: "Debe llenar todos los campos.",
          timer: 3000,
        });
      } else {
        let contact = {
          name: this.txtName,
          phone: this.txtPhone,
          email: this.txtEmail,
        };

        this.contacts.push(contact);

        localStorage.setItem("contacts-agenda", JSON.stringify(this.contacts));

        this.clearInputs();
        Swal.fire({
          icon: "success",
          title: "Guardado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },

    async editContact(index) {
      const { value: name } = await Swal.fire({
        icon: "question",
        title: "Nombre",
        input: "text",
        inputValue: this.contacts[index].name,
      });
      const { value: phone } = await Swal.fire({
        icon: "question",
        title: "Telefono",
        input: "text",
        inputValue: this.contacts[index].phone,
      });
      const { value: email } = await Swal.fire({
        icon: "question",
        title: "Correo electronico",
        input: "email",
        inputValue: this.contacts[index].email,
      });

      if (name && phone && email) {
        Swal.fire({
          icon: "success",
          title: "Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });

        this.contacts[index].name = name;
        this.contacts[index].phone = phone;
        this.contacts[index].email = email;
      }
      this.clearInputs();
      localStorage.setItem("contacts-agenda", JSON.stringify(this.contacts));
    },

    deleteContact(contact) {
      let index = this.contacts.indexOf(contact);

      Swal.fire({
        title: "¿Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1D976C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.contacts.splice(index, 1);
          localStorage.setItem(
            "contacts-agenda",
            JSON.stringify(this.contacts)
          );
          localStorage.setItem("contacts", JSON.stringify(this.contacts));
          Swal.fire({
            icon: "success",
            title: "Eliminado",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    },

    search() {
      this.contacts.forEach((contact) => {
        if (this.txtSearch == contact.name) {
          console.log(contact);
          this.contacts = [contact];
        } else {
          this.contacts = this.containerData[0];
        }
      });
    },
  },

  created() {
    let containerData = JSON.parse(localStorage.getItem("contacts-agenda"));

    if (containerData === null) {
      this.contacts = [];
    } else {
      this.contacts = containerData;
    }
  },
});
