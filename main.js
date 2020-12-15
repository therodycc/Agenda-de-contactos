const app = new Vue({
    el: '#app',

    data: {
        contactos:[],
		txtnombre:'',
		txttelefono:'',
        txtcorreo:'',
        txtbuscar: '',
      
    },
    methods:{
        LimpiarCampos(){
            this.txtnombre = '';
			this.txttelefono = '';
			this.txtcorreo = '';
        },
        Agregar(){

            if (this.txtnombre === '' || this.txttelefono === '' || this.txtcorreo === '') {
                alert("Por favor llene todos los campos")
            }else{
                this.contactos.push
                ({
                    nombre: this.txtnombre,
                    telefono: this.txttelefono,
                    correo: this.txtcorreo,
                })	
                this.LimpiarCampos()
                localStorage.setItem('Contactos-agenda',JSON.stringify(this.contactos));
                }
            },

        Editar(index){
            if (this.txtnombre === '' || this.txttelefono === '' || this.txtcorreo === '') {
                alert("Digite todos los campos. para actualizar")
            }else{
                this.contactos[index].nombre = this.txtnombre;
                this.contactos[index].telefono = this.txttelefono;
                this.contactos[index].correo = this.txtcorreo;
              
            }
                this.LimpiarCampos();
                localStorage.setItem('Contactos-agenda',JSON.stringify(this.contactos));
            },
        Eliminar(contacto){
                let index = this.contactos.indexOf(contacto)
                this.contactos.splice(index,1)
                localStorage.setItem('Contactos-agenda',JSON.stringify(this.contactos));localStorage.setItem('Contactos', JSON.stringify(this.contactos));
        },
      
    
    },


    created() {
		let Contenderdatos = JSON.parse(localStorage.getItem('Contactos-agenda'));
		console.log(Contenderdatos);

		if (Contenderdatos === null) {
			this.contactos = [];
		} else {
			this.contactos = Contenderdatos;
		}
	},
})

