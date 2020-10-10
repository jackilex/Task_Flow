import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import Dashboard from "./frames/Dashboard";
import TeamOverview from "./pages/TeamOverview";
import Admin from "./pages/Admin";
import CreateNew from "./pages/CreateNew"
import ProjectInfo from "./pages/ProjectInfo";
import Error from "./pages/Error";
import EmployeeOverview from "./pages/EmployeeOverview";
import "./App.css";
import { Grid, ThemeProvider, useMediaQuery, createMuiTheme } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PasswordRecovery from "./pages/PasswordRecovery";
import ForgotPassword from "./pages/ForgotPassword";
import ScopeCard from './pages/ScopeCard';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

function App() {
	const [user, setUser] = useState({});
	const [projects, setProjects] = useState([]);

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const darkTheme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	const classes = useStyles();

	const getToken = () => {
		return localStorage.getItem("token");
	};

	const decodeToken = () => {
		//try catch to prevent app from crashing if there is not token saved
		try {
			const jwt = localStorage.getItem("token");
			setUser(jwtDecode(jwt));
			getProjects();
		} catch (error) {
			//if error reroute to login page
			//could use the same practice:
			window.location = "/login";
			// return null
		}
	};

	const getProjects = () => {
			Axios.get("/api/project")
				.then((response) => {
					//console.log(response.data);
					setProjects(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
	}

	useEffect(() => {
		// Get current user token from localstorage
		Axios.defaults.headers.common["x-auth-token"] = getToken();

		// Get user  (decode token)
<<<<<<< HEAD
		
		if (window.location.pathname == "/login" || window.location.pathname == "/forgotpassword"|| window.location.pathname == "/register") {
			console.log('nothing')
		} 
		else {
=======
		if (window.location.pathname == "/login" || window.location.pathname == "/forgotpassword" || window.location.pathname == "/passwordrecovery/") {
			console.log('nothing')
		} else {
>>>>>>> 39864b2e3a620f9d8b4dc6d0ac448de8a100c4ba
			decodeToken();
		}
		// eslint-disable-next-line
	}, []);

	if (user && projects) {
		return (
			<BrowserRouter>
				<Route exact path="/login" render={(props) => <SignIn {...props} />} />
				<Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} />} />
				<Route exact path="/passwordrecovery/:token" render={(props) => <PasswordRecovery {...props} />} />
				<Route exact path="/">
					{user.isManager && (
						<div>
							<Dashboard user={user} />
							<TeamOverview projects={projects} />
						</div>
					)}
					{!user.isManager && (
						<div>
							<Dashboard user={user} />
							<EmployeeOverview projects={projects} user={user} />
						</div>
					)}
				</Route>
				<Route exact path="/admin">
					{user.isManager && (
						<div>
							<Dashboard user={user} />
							<Admin user={user} projects={projects} />
						</div>
					)}
					{!user.isManager && (
						<div>
							<Dashboard user={user} />
							<Error />
						</div>
					)}
				</Route>
				<Route exact path="/admin/new">
					{user.isManager && (
						<div>
							<Dashboard user={user} />
							<CreateNew />
						</div>
					)}
					{!user.isManager && (
						<div>
							<Dashboard user={user} />
							<Error />
						</div>
					)}
				</Route>
				<Route exact path="/create">
					<Dashboard user={user} />
					<CreateNew />
				</Route>
				<Route exact path="/project/:id">
					<Dashboard user={user} />
					<ProjectInfo projects={projects} />
				</Route>
				<Route exact path="/scope/:id">
					<Dashboard user={user} />
					<ScopeCard projects={projects} />
				</Route>
			</BrowserRouter>
		);
	} else {
		return (
			<ThemeProvider theme={darkTheme}>
				<div className={classes.root}>
					<Grid container spacing={0} direction="column"
						alignItems="center"
						justify="center"
						style={{ minHeight: '100vh' }}>
						<CircularProgress />
					</Grid>
				</div>
			</ThemeProvider>
		);
	}

<<<<<<< HEAD
	return (
		<BrowserRouter>
			<Route exact path="/login" render={(props) => <SignIn {...props} />} />
			<Route exact path="/register">
				<Registration/>
			</Route>
			<Route exact path="/">
				<Dashboard user={user} />
				<TeamOverview projects={projects} />
			</Route>
			<Route exact path="/admin">
				<Dashboard user={user} />
				<Admin projects={projectsArray} />
			</Route>
			<Route exact path="/create">
				<Dashboard user={user}/>
				<CreateNew/>
			</Route>
			<Route exact path="/project/:id">
				<Dashboard user={user} />
				<ProjectInfo />
			</Route>
		</BrowserRouter>
	);
=======

>>>>>>> 39864b2e3a620f9d8b4dc6d0ac448de8a100c4ba

}

export default App;
