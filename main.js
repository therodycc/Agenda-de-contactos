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

    editContact(index) {
      if (this.txtName === "" || this.txtPhone === "" || this.txtEmail === "") {
        Swal.fire({
          icon: "info",
          title: "Por favor",
          text: "Debe llenar todos los campos. para actualizar",
          timer: 3000,
        });

      } else {

        this.contacts[index].name = this.txtName;
        this.contacts[index].phone = this.txtPhone;
        this.contacts[index].email = this.txtEmail;
        
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

    sweetAlertAdded() {
      // const { emailSweet: email } = await Swal.fire({
      //   title: 'Nombre',
      //   input: 'email',
      //   inputLabel: 'Your email address',
      //   inputPlaceholder: 'Enter your email address'
      // })
      
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
