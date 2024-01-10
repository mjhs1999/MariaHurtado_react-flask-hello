const navigate = useNavigate();

useEffect(() => {
  if (store.token == undefined) {
	navigate("/");
  }
}, []);

const handleLogOut = () => {
  actions.LogOut();
  navigate("/");
};

console.log(store.informationUser);

return (
  <React.Fragment>
	<div className="container mt-5">
	  <h1 className="text-center">
		<strong>You are logged</strong>
	  </h1>
	  <br />
	</div>
	<div className="close d-flex justify-content-center">
	  <button type="button" className="btn btn-danger" onClick={handleLogOut}>
		Log Out
	  </button>
	</div>
  </React.Fragment>
);
};