State = ({ getStore, getActions, setStore }) => {
	const url = "https://opulent-parakeet-7r6p6qgrrwp2wwwx-3001.app.github.dev/";
  
	return {
	  store: {
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
  
		token: localStorage.getItem("token") ?? null,
		informationUser: {},
	  },
	  actions: {
		// Use getActions to call a function within a fuction
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		getMessage: async () => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		changeColor: (index, color) => {
		  //get the store
		  const store = getStore();
  
		  //we have to loop the entire demo array to look for the respective index
		  //and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  //reset the global store
		  setStore({ demo: demo });
		},
  
		/* Se crea un usuario siempre y cuando no exista  */
  
		CreateUser: async (event, email, password) => {
		  event.preventDefault();
  
		  try {
			const response = await fetch(url + "api/singup", {
			  method: "POST",
			  body: JSON.stringify({
				email: email,
				password: password,
			  }),
			  headers: {
				"content-type": "Application/json",
			  },
			});
  
			if (response.ok) {
			  return await response.json();
			} else {
			  return console.log("Usuario ya existe");
			}
		  } catch (error) {
			console.log(error);
		  }
		},
  
		/* Creamos un token a partir de los datos del usaurio */
  
		LoginUser: async (event, email, password) => {
		  const store = getStore();
		  event.preventDefault();
  
		  try {
			const response = await fetch(url + "api/login", {
			  method: "POST",
			  body: JSON.stringify({
				email: email,
				password: password,
			  }),
			  headers: {
				"content-type": "Application/json",
			  },
			});
  
			if (response.ok) {
			  const body = await response.json();
			  setStore({ token: body.token });
			  localStorage.setItem("token", body.token);
			  return true;
			}
		  } catch (error) {
			console.log(error);
		  }
		},
  
		/* Damos acceso a la ruta privada  */
  
		PrivateRute: async () => {
		  const store = getStore();
  
		  try {
			const response = await fetch(url + "api/private", {
			  method: "GET",
			  headers: {
				Authorization: ` Bearer ${store.token}`,
			  },
			});
  
			if (response.ok) {
			  const body = await response.json();
			  setStore({ informationUser: body });
			  return true;
			}
		  } catch (error) {
			console.log(error);
		  }
		},
  
		SetToken: (token) => {
		  setStore({ token });
		},
  
		LogOut: () => {
		  localStorage.removeItem("token");
		  setStore({ token: null });
		},
	  },
	};
  };
  
  export default getState;